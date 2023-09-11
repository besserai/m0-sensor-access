import React from 'react';
import logo from './logo.svg';
import './App.css';
import WebcamComponent from './components/WebcamComponent';
import GpsComponent from './components/GpsComponent';
import AccelerometerComponent from './components/AccelerometerComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div className="sensor">
          Accelerometer access:
          <AccelerometerComponent />
        </div>

        <div className="sensor">
          GPS access:
          <GpsComponent />
        </div>
        <div className="sensor">
          Camera access:
          <WebcamComponent />
        </div>

      </header>
    </div>
  );
}

export default App;
