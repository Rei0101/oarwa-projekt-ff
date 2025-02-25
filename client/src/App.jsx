import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'; 
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import MakeAMeal from './pages/MakeAMeal/MakeAMeal';
import Order from './pages/Order/Order';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header /> 
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/make-a-meal" element={<MakeAMeal />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;
