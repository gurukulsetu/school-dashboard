import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

interface NoInternetProps {
  onRetry: () => void;
}

const NoInternet: React.FC<NoInternetProps> = ({ onRetry }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setTimeout(() => {
        onRetry();
      }, 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onRetry]);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    try {
      // Test connection by trying to fetch a small resource
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      if (response.ok) {
        onRetry();
      } else {
        setTimeout(() => setIsRetrying(false), 1000);
      }
    } catch (error) {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="text-center">
        <Col>
          {isOnline && (
            <Alert variant="success" className="mb-4">
              <i className="bi bi-wifi me-2"></i>
              Connection restored! Redirecting...
            </Alert>
          )}
          
          <div className="offline-page">
            <div className="offline-icon mb-4">
              <div 
                className={`text-${isOnline ? 'success' : 'danger'}`} 
                style={{ fontSize: '5rem' }}
              >
                <i className={`bi bi-${isOnline ? 'wifi' : 'wifi-off'}`}></i>
              </div>
            </div>
            
            <div className="offline-content">
              <h2 className="mb-3">
                {isOnline ? 'Connection Restored!' : 'No Internet Connection'}
              </h2>
              <p className="text-muted mb-4 fs-5">
                {isOnline 
                  ? 'Your internet connection has been restored. You will be redirected shortly.'
                  : 'Please check your internet connection and try again. The application requires an active internet connection to work properly.'
                }
              </p>
              
              {!isOnline && (
                <div className="offline-actions">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="px-4"
                  >
                    {isRetrying ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Checking...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Try Again
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            <div className="offline-tips mt-5">
              <h5 className="text-muted mb-3">Troubleshooting Tips:</h5>
              <div className="text-start">
                <ul className="list-unstyled text-muted">
                  <li className="mb-2">
                    <i className="bi bi-check-circle me-2"></i>
                    Check your WiFi or mobile data connection
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle me-2"></i>
                    Try refreshing the page
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle me-2"></i>
                    Restart your router if using WiFi
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle me-2"></i>
                    Contact your network administrator
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NoInternet;
