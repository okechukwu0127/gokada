import React from "react";
//import "./Marker.css";

const MarkerCustom = (props: any) => {
  const { color, name, id } = props;
  return (
    <div
      className="marker"
          style={{
              backgroundColor: color, cursor: "pointer",
    
    
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: '#000',
              borderWidth: 6,
    borderColor:'red',
    borderRadius: '100%',
    userSelect: 'none',
    transform:' translate(-50%, -50%)',
    zIndex: 1
          }}
      title={name}
    />
  );
};

export default MarkerCustom;
