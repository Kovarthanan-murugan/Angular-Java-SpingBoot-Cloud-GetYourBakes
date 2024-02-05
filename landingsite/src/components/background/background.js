import React from 'react';
import video1 from '../../assets/bg-universe.mp4';
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
          <source src={video1} type="video/mp4" />
        </video>
      </>
    );
  };
  
  export default Background;