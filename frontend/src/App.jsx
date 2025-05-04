import React from 'react';
import AppRouter from './router/App.Router.jsx';
import Navbar from './components/common/Navbar/Navbar.jsx';

function App() {
  return (
    <div className="app-container">
      <AppRouter />
      <Navbar />
    </div>
  );
}

export default App;
