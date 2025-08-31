import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Badge, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPageTitle } from '../config/routes';
import { EnhancedPermissionsService } from '../services/enhancedPermissionsService';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarVisible }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count
  
  // Get current page title and icon
  const { title: pageTitle, icon: pageIcon } = getPageTitle(location.pathname);

  return (
    <>
      <Navbar bg="white" className="header-navbar shadow-sm px-3 py-2">
        <div className="d-flex align-items-center flex-grow-1">
          {/* Mobile menu toggle */}
          <Button
            variant="outline-secondary"
            className="me-3 d-lg-none border-0"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">☰</span>
          </Button>
          
          {/* Page title - replaces school name, desktop only */}
          <div className="page-title-header-section d-none d-lg-block">
            <span className="page-icon me-2">{pageIcon}</span>
            <span className="page-title-main">{pageTitle}</span>
          </div>
        </div>

        <Nav className="ms-auto d-flex align-items-center">
          {/* Date Badge */}
          <Badge className="custom-badge me-3 d-none d-md-inline">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Badge>

          {/* Notifications */}
          <Dropdown align="end" className="me-3">
            <Dropdown.Toggle 
              variant="outline-secondary" 
              className="border-0 position-relative notification-btn"
              id="notification-dropdown"
            >
              🔔
              {notifications > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle notification-badge"
                >
                  {notifications}
                </Badge>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu className="notification-menu">
              <Dropdown.Header>Notifications</Dropdown.Header>
              <Dropdown.Item>
                <div className="notification-item">
                  <strong>New Student Enrolled</strong>
                  <small className="d-block text-muted">John Doe - Grade 10A</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="notification-item">
                  <strong>Fee Payment Received</strong>
                  <small className="d-block text-muted">Sarah Smith - $500</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="notification-item">
                  <strong>Exam Scheduled</strong>
                  <small className="d-block text-muted">Mathematics - Grade 9</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-center text-primary">
                View All Notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* User Profile */}
          {user && (
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="outline-secondary" 
                className="border-0 d-flex align-items-center user-dropdown"
                id="user-dropdown"
              >
                <div className="me-2 user-avatar">
                  {user.role === 'admin' ? '👨‍💼' : user.role === 'staff' ? '👨‍🏫' : '👨‍🎓'}
                </div>
                <div className="d-none d-md-block text-start">
                  <div className="user-name">{user.name}</div>
                  <small className="user-role text-muted">{user.role}</small>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-menu">
                <Dropdown.Header>
                  <div className="d-flex align-items-center">
                    <div className="me-3 user-avatar-large">
                      {user.role === 'admin' ? '👨‍💼' : user.role === 'staff' ? '👨‍🏫' : '👨‍🎓'}
                    </div>
                    <div>
                      <div className="fw-bold">{user.name}</div>
                      <small className="text-muted">{user.email}</small>
                      <div className="mt-1">
                        <Badge bg="primary" className="text-capitalize">{user.role}</Badge>
                      </div>
                    </div>
                  </div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <span className="me-2">👤</span>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="me-2">⚙️</span>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="me-2">❓</span>
                  Help
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                  <span className="me-2">🚪</span>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
