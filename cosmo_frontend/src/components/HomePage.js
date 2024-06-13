import React from 'react';
import backgroundImage from './images/main-background.png';

const HomePage = () => {
    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain', // Adjusted to contain
            backgroundPosition: 'center', // Center the background
            backgroundRepeat: 'no-repeat',
            height: '80vh',
            width: '80vw',
            marginLeft: "10%",
            marginTop: "2%",
          }}>
          </div>
  );
};

export default HomePage;
