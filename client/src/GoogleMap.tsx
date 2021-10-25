import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
//Import googlemap.js from https://github.com/google-map-react/google-map-react-examples/blob/master/src/components/GoogleMap.js

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export interface GoogleMapProps { 
  children: any,
  defaultZoom: number,
  defaultCenter: any,
  bootstrapURLKeys: any,
  onChildClick: any,
  yesIWantToUseGoogleMapApiInternals: any,
  onGoogleApiLoaded: any
}


const GoogleMap = (props: GoogleMapProps) => (
  <Wrapper>
    <GoogleMapReact
      { ...props }
    >
      {props.children}
    </GoogleMapReact>
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
