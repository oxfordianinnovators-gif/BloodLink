import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import Landing from './pages/Landing';
import DonorRegistration from './pages/DonorRegistration';
import RequestBlood from './pages/RequestBlood';
import DonorSearch from './pages/DonorSearch';
import BloodBanks from './pages/BloodBanks';
import ActiveRequests from './pages/ActiveRequests';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<DonorRegistration />} />
            <Route path="/request" element={<RequestBlood />} />
            <Route path="/active-requests" element={<ActiveRequests />} />
            <Route path="/search" element={<DonorSearch />} />
            <Route path="/banks" element={<BloodBanks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;