import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
  return (
    <Spline 
      scene="https://prod.spline.design/aibQhpRak9bvfjB9/scene.splinecode"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default SplineBackground;
