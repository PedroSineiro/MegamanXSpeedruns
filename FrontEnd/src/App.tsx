import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Games from './pages/Games';
import Rules from './pages/Rules';
import Runs from './pages/Runs';
import SubmitRun from './pages/SubmitRun';
import Login from './pages/Login';
import Register from './pages/Register'
import Profile from './pages/Profile';
import Navbar from './assets/components/Navbar/Navbar';
import Container from './assets/components/Container/Container';
import { AuthProvider } from '../src/contexts/AuthContext';


export default function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar/>
      <Container>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/runs" element={<Runs />} />
        <Route path="/submit" element={<SubmitRun />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Rules" element={<Rules />} />
      </Routes>
      </Container>
      </AuthProvider>
    </Router>
  );
}
