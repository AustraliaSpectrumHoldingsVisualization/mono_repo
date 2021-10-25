import React, { Component } from "react";                                       
import PropTypes from "prop-types";
import GoogleMap from './GoogleMap';
import CSS from 'csstype';

//This is our old marker with no styling
//const AnyReactComponent = ({ lat, lng, text } : { lat: number, lng: number, text: string}) => <div>{text}</div>;
//New marker with styling as per example: https://github.com/google-map-react/google-map-react-examples/blob/master/src/examples/MarkerInfoWindow.js
// InfoWindow component
const InfoWindow = ({ place } : { place: Place }) => {
  //Re-defined infoWindowStyle based on this: https://fettblog.eu/typescript-react/styles/
  const infoWindowStyle: CSS.Properties = {
    position: 'relative',
    bottom: '150px',
    left: '-45px',
    width: '220px',
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: '10',
    fontSize: '14',
    zIndex: 100
  };

  console.log("InfoWindow");
  console.log(place.name);
  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {place.name}
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {place.rating}
          {' '}
        </span>
        <span style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
        <span style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {place.types[0]}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {'$'.repeat(place.price_level)}
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>
        {place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div>
    </div>
  );
};

// Marker component
const Marker = ({ show, place } : { show: boolean, place: Place }) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };
  console.log("Dropping marker for: "+place.name);
  console.log("- Show: "+show);

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindow place={place} />}
    </>
  );
};

// Return map bounds based on list of places
const getMapBounds = (map: any, maps: any, places: any) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place: any) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map: any, maps: any, bounds: any) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map: any, maps: any, places: any) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

//https://stackoverflow.com/questions/46987816/using-state-in-react-with-typescript/46987987
interface IProps {
}

interface IState {
  places: Place[];
}

class MarkerInfoWindow extends Component<IProps, IState> {
  constructor( props: IProps ) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    //See original here: https://github.com/google-map-react/google-map-react-examples/blob/master/public/places.json
    fetch('places.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        //Set foreach like this: https://stackoverflow.com/questions/43064221/typescript-ts7006-parameter-xxx-implicitly-has-an-any-type
        data.results.forEach((result: any) => {
          console.log('Got place');
          console.log(result);
          result.show = false; // eslint-disable-line no-param-reassign
        });
        this.setState({ places: data.results });
      });
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = ( key: any ) => {
    console.log("Clicked on: "+key);
    const state = this.state;
    const index = state.places.findIndex(( e: any ) => e.id === key);
    console.log("Show_before["+index+"]: "+state.places[index].show);
    state.places[index].show = !state.places[index].show;
    console.log("Show_after["+index+"]: "+state.places[index].show);
    this.setState({ places: state.places });
    /*
    this.setState((previousState, props) => {
      const index = this.state.places.findIndex(( e: any ) => e.id === key);
      console.log("Found index: "+index);
      console.log("Show_before["+index+"]: "+this.state.places[index].show);
      this.state.places[index].show = !this.state.places[index].show;
      //places: !this.state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: this.state.places };
    });*/
  };

  render() {
    const { places } = this.state;
    console.log("State:");
    console.log(this.state);
    console.log("Rendering...");
    console.log(places);

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        {places && (
          <GoogleMap
            defaultCenter={[34.0522, -118.2437]} //[-33.889148401472646, 151.1590462340873]} //{LOS_ANGELES_CENTER}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            onChildClick={this.onChildClickCallback}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps } : { map: any, maps: any }) => apiIsLoaded(map, maps, places)}
          >
            {places.filter(( place: Place) => {
              console.log("Filter");
              console.log(place);
              return place.geometry;
            }).map(( place: Place) => {
              console.log('Mapping');
              console.log(place);
              //Got this working by adding "return" - was not in the demo code.
              return (
                <Marker
                  key={place.id}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                  show={place.show}
                  place={place}
                />
             )
            })}
          </GoogleMap>
        )}
      </div>
    );
  }
}

InfoWindow.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    price_level: PropTypes.number,
    opening_hours: PropTypes.shape({
      open_now: PropTypes.bool,
    }),
  }).isRequired,
};

Marker.propTypes = {
  show: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    price_level: PropTypes.number,
    opening_hours: PropTypes.shape({
      open_now: PropTypes.bool,
    }),
  }).isRequired,
};

type Place = {
  id: number,
  show: boolean,
  name: string,
  formatted_address: string,
  rating: number,
  types: string[],
  price_level: number,
  opening_hours: {
    open_now: boolean
  },
  geometry: any,
}

type Marker = {
  show: boolean,
  lat: number,
  lng: number,
  place: Place
}

export default MarkerInfoWindow;

/*
export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: -33.889148401472646,
      lng: 151.1590462340873
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCelNsFgNgUJNZx7dG-uAqtqBdsdPGb93A" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={-33.88914840147264}
          lng={151.1590462340873}
          text="My Marker 1"
        />

        <AnyReactComponent                                                      
          lat={-33.78914840147264}                                              
          lng={151.2590462340873}                                               
          text="My Marker 2"                                                    
        />  
      </GoogleMapReact>
    </div>
  );
} */
