import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface NotFoundProps {
  onNavigateHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome }) => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="text-center">
        <Col>
          <div className="error-page">
            <div className="error-code mb-4">
              <h1 className="display-1 fw-bold text-primary">404</h1>
            </div>
            <div className="error-content">
              <h2 className="mb-3">Page Not Found</h2>
              <p className="text-muted mb-4 fs-5">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="error-actions">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={onNavigateHome}
                  className="me-3 px-4"
                >
                  <i className="bi bi-house-door-fill me-2"></i>
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="lg"
                  onClick={() => window.history.back()}
                  className="px-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Go Back
                </Button>
              </div>
            </div>
            <div className="error-illustration mt-5">
              <div className="text-muted" style={{ fontSize: '5rem', opacity: 0.3 }}>
                <i className="bi bi-exclamation-triangle"></i>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
