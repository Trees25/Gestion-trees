import React from 'react';
import Lottie from 'lottie-react';
// Importá el JSON de la animación (suponiendo que lo bajaste)
import animationData from '../animacion.json';

const AboutAnimation = () => {
  return (
    <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#202E40', // mismo color que la sección
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AboutAnimation;
