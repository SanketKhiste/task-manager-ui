import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Mainroutes from './routes/Mainroutes';
import './App.css';

function App() {

  return (
    <div>
      <Header />
      <main className="main-content">
        <Mainroutes/>
      </main>
      <Footer />
    </div>
  );
}

export default App;