import React, { useEffect } from 'react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Partners from '../components/Home/Partners';
import BodyDiagram from '../components/Home/BodyDiagram';
import ManagementTools from '../components/Home/ManagementTools';
import '../styles/Home/Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page starts at the top
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <Features />
      <Partners />
      <BodyDiagram />
      <ManagementTools />
    </div>
  );
};

export default Home;