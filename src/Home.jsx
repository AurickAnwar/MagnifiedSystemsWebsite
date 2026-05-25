import React from 'react';
import { Link } from 'react-router-dom';
import HelmetViewer from './components/HelmetViewer/HelmetViewer';
import HomeTechCards from './components/HomeTechCards/HomeTechCards';
import './Home.css';

const Home = () => {
  return (
    <section className="home">
      <div className="container home-inner">
        <div className="home-layout">
          <div className="home-copy">
            <p className="home-subtitle">Compatible with any Helmet!</p>
            <div className="home-copy-body">
              <h1 className="home-title">
                <span className="home-title-line">Detect.</span>
                <span className="home-title-line">Analyze.</span>
                <span className="home-title-line home-title-line--accent">Protect.</span>
              </h1>
              <p className="home-lead">
                Wearable impact monitoring device to detect and <br /> analyze impact
                forces and reduce risk of injury.
              </p>
            </div>
            <div className="home-actions">
              <Link to="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link to="/Progress" className="btn btn-secondary">
                Track Progress 📈
              </Link>
            </div>
          </div>
          <div className="home-viewer">
            <HelmetViewer />
          </div>
        </div>
        <HomeTechCards />
      </div>
      <footer className="home-footer container">
        <p>Copyright © 2026 Magnified Systems All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Home;
