import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types';
import { schoolConfig } from '../config/school';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'admin'
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(credentials);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 g-0">
          {/* Left Side - Branding */}
          <Col lg={6} className="login-brand-section d-none d-lg-flex">
            <div className="login-brand-content">
              <div className="brand-logo">
                <div className="logo-icon">{schoolConfig.logo}</div>
                <h1 className="brand-title">{schoolConfig.name}</h1>
                <p className="brand-subtitle">{schoolConfig.subtitle}</p>
              </div>
              <div className="brand-contact">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>{schoolConfig.address}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{schoolConfig.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>{schoolConfig.email}</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Side - Login Form */}
          <Col lg={6} xs={12} className="login-form-section">
            <div className="login-form-container">
              {/* Mobile Header */}
              <div className="mobile-brand d-lg-none">
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="mobile-logo">{schoolConfig.logo}</div>
                  <div className="ms-3">
                    <h4 className="mb-0">{schoolConfig.name}</h4>
                    <small className="text-muted">{schoolConfig.subtitle}</small>
                  </div>
                </div>
              </div>

              <div className="login-form-card">
                <div className="form-header">
                  <h2 className="form-title">Welcome Back</h2>
                  <p className="form-subtitle">Please sign in to your account</p>
                </div>

                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={credentials.role}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="admin">Administrator</option>
                      <option value="staff">Staff Member</option>
                      <option value="student">Student</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="form-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="form-input"
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="login-btn w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
