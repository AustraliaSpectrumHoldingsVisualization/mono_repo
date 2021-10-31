import * as React from "react";

export interface InfoWindowProps extends google.maps.InfoWindowOptions {
  onCloseClick?: (e: google.maps.MapMouseEvent) => void;
}


export const InfoWindow: React.FC<InfoWindowProps> = ({
  onCloseClick,
  ...options
}) => {
  const [infoWindow, setInfoWindow]
  = React.useState<google.maps.InfoWindow>();

  React.useEffect(() => {
    if (!infoWindow) {
      console.log('InfoWindow open');
      setInfoWindow(new google.maps.InfoWindow());
    }

    // Remove infoWindow from map on unmount
    return () => {
      if (infoWindow) {
        console.log('InfoWindow close');
        infoWindow.close();
      }
    };
  }, [infoWindow]);

  React.useEffect(() => {
    if (infoWindow) {
      ['closeclick'].forEach((eventName) =>
        google.maps.event.clearListeners(infoWindow, eventName)
      );

      if (onCloseClick) {
        infoWindow.addListener("closeclick", onCloseClick);
      }
    }
  }, [infoWindow, onCloseClick]);

  React.useEffect(() => {
    if (infoWindow) {
      console.log('set info window options')
      infoWindow.setOptions(options);
    }
  }, [infoWindow, options]);

  return null;
};