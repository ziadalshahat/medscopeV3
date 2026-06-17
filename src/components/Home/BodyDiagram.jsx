import React from 'react';
import '../../styles/Home/Home.css';
import bodyImg from '../../assets/images/home/body-diagram.jpg';

const BodyDiagram = () => {
  return (
    <div className="home-section" style={{ overflow: 'hidden' }}>
      <h2 className="home-section-title" style={{ fontSize: '42px', marginBottom: '50px' }}>Where is the pain?</h2>
      
      <div className="body-diagram-container">
        <div className="bg-circles"></div>
        <img 
          src={bodyImg} 
          alt="Human Body Diagram" 
          className="body-diagram-img"
          style={{ minHeight: '500px', backgroundColor: 'transparent' }} 
        />
      </div>
    </div>
  );
};

export default BodyDiagram;
