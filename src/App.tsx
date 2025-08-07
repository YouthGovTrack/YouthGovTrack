import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './styles/global.css';

const App: React.FC = () => (
  <>
    <Navbar />
    <Home />
    {/* TODO: Swap Home with other pages as needed */}
    <Footer />
  </>
);

export default App;
