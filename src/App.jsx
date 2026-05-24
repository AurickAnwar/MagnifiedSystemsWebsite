import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import PlaceholderPage from './PlaceholderPage';
import Contact from './Contact';


const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/what-we-do" element={<PlaceholderPage title="What we do" />} />
      <Route path="/Progress" element={<PlaceholderPage title="Progress" />} />
      <Route path="/meet-the-team" element={<PlaceholderPage title="Meet the Team" />} />
      <Route path="/contact" element={<Contact />} />
    
    </Routes>
  </>
);

export default App;
