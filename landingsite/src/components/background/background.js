import React from 'react';
import '../background/background.css'

const Background = () => {
    return (
      <>
        <div className="shadow-overlay"></div>
        <video
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          id="bg"
        >
          <source src={''} type="video/mp4" />
        </video>
      </>
    );
  };
  
  export default Background;