import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="btn btn-dark d-md-none m-2 position-fixed top-0 start-0 z-3"
        style={{ zIndex: 1051 }}
        onClick={() => setShowSidebar(true)}
      >
        <Menu />
      </button>

      {/* Overlay Background on Mobile */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1049 }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar (Desktop or Mobile) */}
      <div
        className={`bg-dark text-white flex-column p-3 position-fixed top-0 start-0 ${
          showSidebar ? 'd-flex' : 'd-none'
        } d-md-flex`}
        style={{
          width: '280px',
          height: '100vh',
          zIndex: 1050,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Close Button for Mobile */}
        <div className="d-md-none d-flex justify-content-end">
          <button className="btn btn-danger mb-3" onClick={() => setShowSidebar(false)}>
            <X />
          </button>
        </div>

        <h4 className="text-white mb-4">MyApp</h4>

        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li>
            <Link to="/home" className="nav-link text-white d-flex align-items-center" onClick={() => setShowSidebar(false)}>
              <Home size={18} className="me-2" /> Home
            </Link>
          </li>

          <li>
            <Link to="/create-post" className="nav-link text-white d-flex align-items-center" onClick={() => setShowSidebar(false)}>
              <LayoutDashboard size={18} className="me-2" /> CreatePost
            </Link>
          </li>

           {/* <li>
            <Link to="/payment-gateway" className="nav-link text-white d-flex align-items-center" onClick={() => setShowSidebar(false)}>
              <LayoutDashboard size={18} className="me-2" /> PaymentGateway
            </Link>
          </li> */}

          <li className="mt-3">
            <Link to="/" className="nav-link text-danger d-flex align-items-center" onClick={() => setShowSidebar(false)}>
              <LogOut size={18} className="me-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
