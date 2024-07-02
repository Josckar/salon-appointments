import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile/UserProfile';
import Appointment from './components/Appointment/Appointment';
import { ProtectedRoute } from './protected.route';
import { AdminRoute } from './admin.route';
import { Container, Row, Col } from 'react-bootstrap';

const NotFoundPage = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>The page you are looking for does not exist or has been moved.</p>
                    <li><Link to="/">Home</Link></li>
                </Col>
            </Row>
        </Container>
    );
};

function App() {
    return (
        <>
            <Router>
                <NavBar style={{ backgroundImage: "url('../assets/navbar-bg.png');" }} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/appointment/*" element={<ProtectedRoute component={Appointment} />} />
                    <Route path="/admin/*" element={<AdminRoute component={Admin} />} />
                    <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
