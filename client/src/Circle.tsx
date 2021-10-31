import * as React from "react";

export interface CircleProps extends google.maps.CircleOptions {
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

export const Circle: React.FC<CircleProps> = ({
  onClick,
  children,
  ...options
}) => {
  const [circle, setCircle] = React.useState<google.maps.Circle>();

  React.useEffect(() => {
    if (!circle) {
      console.log('Circle created');
      setCircle(new google.maps.Circle());
    }

    // Remove Circle from map on unmount
    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [circle]);

  React.useEffect(() => {
    if (circle) {
      ['click'].forEach((eventName) =>
        google.maps.event.clearListeners(circle, eventName)
      );

      if (onClick) {
        circle.addListener("click", onClick);
      }
    }
  }, [circle, onClick]);

  React.useEffect(() => {
    console.log('Circle set options');
    if (circle) {
      circle.setOptions(options);
    }
  }, [circle, options]);

  return null;
};