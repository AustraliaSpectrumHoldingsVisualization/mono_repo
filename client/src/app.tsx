import './style.css';

import * as React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

// import styled from 'styled-components';
import { Map } from './Map';
import { Circle } from './Circle';

import data from './data.json';
import { InfoWindow } from './InfoWindow';

/*const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`*/

/*interface SpectrumHolding {
  version: number,
  id: string,
  divisionDuplex: string,
  spectrum: string,
  value: number,
  location: string,
  owner: string,
  authorisationStart: number,
  authorisationEnd: number,
  lat: number,
  lng: number,
}*/

export interface AppProps {
  config: { apiKey: string },
  excludeSet: Set<string>,
  includeMap: Map<string, {lat: number, lng: number}>,
  ownersMap: Map<string, string>,
}

interface InfoWindowData {
  content: string,
  lat: number,
  lng: number,
}

const MemoMap = React.memo(Map);

// React.FC vs React.VFC
export const App: React.FC<AppProps> = ({
  config,
  excludeSet,
  includeMap,
  ownersMap,
  // ...rest,
}) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const [filter, setFilter] = React.useState('Telstra');

  const [isAboutOpen, setAboutOpen] = React.useState(true);

  // This is the best number that can be chosen without Google Maps
  // rendering half the map as grey squares
  const [zoom, setZoom] = React.useState(4.499);
  
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: -28.5102234,
    lng: 134.3038117,
  });
  
  const [infoWindow, setInfoWindow]
  = React.useState<InfoWindowData>();

  const addInfoWindow = (infoWindowData: InfoWindowData) => {
    console.log('add infowindow');
    setInfoWindow(infoWindowData);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log('on Idle')

    if(zoom !== m.getZoom()!) {
      setZoom(m.getZoom()!);
    }
    if (
      center.lat !== m.getCenter()!.lat()
      || center.lng !== m.getCenter()!.lng()
    ) {
      setCenter(m.getCenter()!.toJSON());
    }
    
  };

  console.log('I rendered!');
  console.log(isDropdownOpen);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#aadaff',
      }}
    >
      <Wrapper
        apiKey={config.apiKey}
      >
        <MemoMap
          center={center}
          onIdle={onIdle}
          zoom={zoom}
          style={{
            height: "100%",
          }}
          minZoom={4.499}
          disableDefaultUI
          restriction={{
            latLngBounds: {
              north: 0,
              south: -55,
              east: 160,
              west: 110,
            },
          }}
        >
          {data
          .filter((spectrumHolding) => {
            return (
              !(excludeSet.has(spectrumHolding.location))
              && spectrumHolding.owner === filter
            );
          })
          .map((spectrumHolding, i) => {

            const latLng = includeMap.get(spectrumHolding.location);

            const color = ownersMap.get(spectrumHolding.owner);

            return latLng && <Circle
              key={i}
              center={{
                lat: latLng!.lat,
                lng: latLng!.lng,
              }}
              radius={100000}
              strokeColor={color}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor={color}
              fillOpacity={0.035}
              onClick={() => {
                const contentString = 
                '<div id="content" style="width: 100%">' +
                '<h1 id="firstHeading" class="firstHeading">' +
                `${spectrumHolding.owner} - ${spectrumHolding.spectrum} ` +
                `${spectrumHolding.value} ${spectrumHolding.divisionDuplex}` +
                '</h1>' +
                `<p>${spectrumHolding.location}</p>` +
                `<p>Licenced from <b>XX/XX/XXXX - XX/XX/XXXX</b></p>` +
                "</div>";

                addInfoWindow({
                  content: contentString,
                  lat: latLng!.lat,
                  lng: latLng!.lng,
                });
              }}
            />
          })
          .concat(
            [infoWindow && <InfoWindow
              key={1000}
              content={infoWindow.content}
              position={{
                lat: infoWindow.lat,
                lng: infoWindow.lng,
              }}
              disableAutoPan
              onCloseClick={(e) => {
                console.log(e);
                setInfoWindow(undefined);
              }}
            ></InfoWindow>
            ]
          )}
        </MemoMap>
      </Wrapper>
      <div
        id='filter'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'fixed',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '800px',
          minHeight: '100px',
          height: '9%',
          maxHeight: '14%',
          backgroundColor: 'white',
          borderRadius: '25px',
          boxShadow: '5px 10px #888888',
        }}
      >
        <h1
          style={{
            marginTop: 35,
            textAlign: 'center',
          }}
        >
          Filter:
        </h1>
        <div
          onClick={(e) => {
            e.preventDefault();
            setDropdownOpen(!isDropdownOpen);
          }}
        >
          <h1
            style={{
              marginTop: 30,
              marginBottom: 15,
              border: '5px solid grey',
              width: '150px',
              textAlign: 'center',
              borderRadius: '10px',
            }}
          >
            {filter}
          </h1>
          {isDropdownOpen &&
            <div
              className='dropdown'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flexStart',
              }}
            >
              {
                Array.from(ownersMap.keys())
                .filter((owner) => {
                  return owner !== filter;
                })
                .map(owner => {
                  return <h1
                    style={{
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: 'white',
                      textAlign: 'center',
                    }}
                    onClick={() => {
                      setFilter(owner);
                      setDropdownOpen(false);
                    }}
                  >
                    {owner}
                  </h1>
                })
              }
            </div>
          }
        </div>
      </div>
      <div
        id='about'
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          maxHeight: '30%',
          overflowY: 'scroll',
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderTopLeftRadius: '25px',
          borderTopRightRadius: '25px',
        }}
      >
        <div
          id='about-head'
          style={{
            display: 'flex',
          }}
          onClick={() => {
            setAboutOpen(!isAboutOpen);
          }}
        >
          <svg
            style={{
              marginTop: 20,
              marginLeft: 10,
              height: 30,
              width: 30,
            }}
            viewBox="5 0 50 80" 
          >
            <polyline
              fill='none'
              stroke='#000000'
              strokeWidth='8'
              strokeLinecap='round'
              strokeLinejoin='round'
              points='0.375, 35.375 28.375, 0.375 58.67, 35.375'
            />
          </svg>
          <h1
            style={{
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            About
          </h1>
        </div>
        {isAboutOpen && <h3
          style={{
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          The Australian Radio Spectrum is consumed via licences from the
          Government to private companies based on Spectrum/Frequency, Modulation,
          Geographical Area, and duration of the licence.<br/><br/>
          This information is public data, but currently there is no visualization
          tool which displays who currently owns the licence for what part of the
          spectrum.<br/><br/>
          This is frustrating as a consumer, since consumers cannot easily
          find or use this spectrum information to help decide which
          Telecommunications Provider will be the best fit for their
          circumstances.<br/><br/>
          Additionally, this is frustrating as a Telecommunications Provider,
          because currently static, hard to distribute/share, internal tools such
          as spreadsheet files must be used as the source of truth for Spectrum
          Holding Visualization data, whimch is a bottleneck for data input when
          making decisions on upcoming auctions of licences.<br/><br/>
          There should be an easy way for consumers, and Telecommunications
          Providers to view this information. Everyone uses Telecommunications,
          this is such vital information.<br/><br/>
        </h3>}
      </div>
    </div>
  );
};
