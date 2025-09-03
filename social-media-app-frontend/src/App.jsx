
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import PaymentGateway from './components/PaymentGateway';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
