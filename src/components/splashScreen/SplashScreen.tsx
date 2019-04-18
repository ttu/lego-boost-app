import React, { lazy, Suspense } from 'react';
import './SplashScreen.css';
import logo from './logo.svg';

const App = lazy(() => import('../../App'));

function SplashScreen() {
  return (
    <Suspense fallback={<div className="SplashScreen"><img src={logo} className="SplashScreen-logo" alt="logo" /></div>}>
      <App />
    </Suspense>
  );
}

export default SplashScreen;
