import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DashboardStats, UserPermissions, QuickActionItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { EnhancedPermissionsService } from '../services/enhancedPermissionsService';
import Layout from '../components/common/Layout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalStaff: 0,
    totalClasses: 0,
    pendingFees: 0,
    upcomingExams: 0
  });
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load dashboard data and user permissions
    const loadDashboardData = async () => {
      setLoading(true);
      
      try {
        // Load user permissions based on role
        if (user?.role) {
          const permissions = await EnhancedPermissionsService.getUserPermissions(user);
          setUserPermissions(permissions);
        }

        // Simulate loading dashboard stats
        setTimeout(() => {
          setStats({
            totalStudents: 1247,
            totalStaff: 89,
            totalClasses: 42,
            pendingFees: 156,
            upcomingExams: 7
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: string;
    color: string;
    statKey: string;
    onClick?: () => void;
  }> = ({ title, value, icon, color, statKey, onClick }) => {
    // Check if user has permission to see this statistic
    if (!userPermissions?.statistics.includes(statKey)) {
      return null;
    }

    return (
      <Card 
        className={`stat-card-compact ${color} h-100`} 
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
      >
        <Card.Body className="d-flex align-items-center">
          <div className="stat-icon me-3">
            <span>{icon}</span>
          </div>
          <div className="stat-content">
            <h4 className="fw-bold mb-0">{value.toLocaleString()}</h4>
            <p className="text-muted mb-0 small">{title}</p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const QuickActionButton: React.FC<{
    action: QuickActionItem;
  }> = ({ action }) => (
    <Card className={`action-card-compact ${action.color} h-100`} onClick={action.action} style={{ cursor: 'pointer' }}>
      <Card.Body className="d-flex align-items-center">
        <div className="action-icon me-2">
          <span>{action.icon}</span>
        </div>
        <div className="action-content">
          <h6 className="mb-0">{action.title}</h6>
        </div>
      </Card.Body>
    </Card>
  );

  const QuickActionDropdown: React.FC<{
    action: QuickActionItem;
  }> = ({ action }) => (
    <Card className={`action-card-compact ${action.color} h-100`}>
      <Dropdown className="h-100">
        <Dropdown.Toggle 
          variant=""
          className="w-100 h-100 d-flex align-items-center border-0 bg-transparent text-dark p-0"
          style={{ cursor: 'pointer' }}
        >
          <Card.Body className="d-flex align-items-center w-100">
            <div className="action-icon me-2">
              <span>{action.icon}</span>
            </div>
            <div className="action-content flex-grow-1">
              <h6 className="mb-0">{action.title}</h6>
            </div>
          </Card.Body>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {action.options?.map((option, index) => (
            <Dropdown.Item key={option.id} onClick={option.action}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );

  const renderQuickAction = (action: QuickActionItem, index: number) => {
    const key = `${action.id}-${index}`;
    
    if (action.type === 'dropdown') {
      return (
        <Col key={key} xs={12} sm={6} md={4} lg={3} xl={4}>
          <QuickActionDropdown action={action} />
        </Col>
      );
    } else {
      return (
        <Col key={key} xs={12} sm={6} md={4} lg={3} xl={4}>
          <QuickActionButton action={action} />
        </Col>
      );
    }
  };

  const feeOptions = [
    { label: '💳 Pay Fee', action: () => alert('Pay Fee feature coming soon!') },
    { label: '⚙️ Configure Fee', action: () => alert('Configure Fee feature coming soon!') },
    { label: '📊 Fee Reports', action: () => navigate('/reports') },
    { label: '📋 Fee Structure', action: () => alert('Fee Structure feature coming soon!') },
  ];

  const examOptions = [
    { label: '📝 Schedule Exam', action: () => alert('Schedule Exam feature coming soon!') },
    { label: '📊 Exam Results', action: () => alert('Exam Results feature coming soon!') },
    { label: '📋 Question Bank', action: () => alert('Question Bank feature coming soon!') },
    { label: '🎓 Grade Book', action: () => alert('Grade Book feature coming soon!') },
  ];

  if (loading) {
    return (
      <Layout>
        <Container fluid className="p-4 text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2 text-muted">Loading dashboard...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid className="p-4">
      {/* Statistics Cards - Role-based visibility */}
      <Row className="mb-4 fade-in-up">
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon="👨‍🎓"
            color="students"
            statKey="totalStudents"
            onClick={() => navigate('/students')}
          />
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <StatCard
            title="Total Staff"
            value={stats.totalStaff}
            icon="👨‍🏫"
            color="staff"
            statKey="totalStaff"
            onClick={() => navigate('/staff')}
          />
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <StatCard
            title="Total Classes"
            value={stats.totalClasses}
            icon="🏫"
            color="classes"
            statKey="totalClasses"
            onClick={() => navigate('/classes')}
          />
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <StatCard
            title="Pending Fees"
            value={stats.pendingFees}
            icon="💰"
            color="fees"
            statKey="pendingFees"
            onClick={() => navigate('/fees')}
          />
        </Col>
      </Row>

      <Row>
        {/* Quick Actions - Role-based visibility */}
        <Col lg={12} xl={8}>
          <Card className="h-100 mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              {userPermissions?.quickActions.length ? (
                <Row className="g-3">
                  {userPermissions.quickActions.map((action, index) => 
                    renderQuickAction(action, index)
                  )}
                </Row>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No quick actions available for your role.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col lg={12} xl={4}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <div className="activity-item mb-3 p-3 bg-light rounded">
                <div className="d-flex align-items-center">
                  <span className="me-3">🎓</span>
                  <div>
                    <div className="fw-bold">New Student Enrolled</div>
                    <small className="text-muted">John Doe - Grade 10A</small>
                  </div>
                </div>
              </div>
              
              <div className="activity-item mb-3 p-3 bg-light rounded">
                <div className="d-flex align-items-center">
                  <span className="me-3">💰</span>
                  <div>
                    <div className="fw-bold">Fee Payment Received</div>
                    <small className="text-muted">Sarah Smith - $500</small>
                  </div>
                </div>
              </div>
              
              <div className="activity-item mb-3 p-3 bg-light rounded">
                <div className="d-flex align-items-center">
                  <span className="me-3">📝</span>
                  <div>
                    <div className="fw-bold">Exam Scheduled</div>
                    <small className="text-muted">Mathematics - Grade 9</small>
                  </div>
                </div>
              </div>
              
              <div className="activity-item mb-3 p-3 bg-light rounded">
                <div className="d-flex align-items-center">
                  <span className="me-3">👨‍🏫</span>
                  <div>
                    <div className="fw-bold">New Staff Member</div>
                    <small className="text-muted">Dr. Jane Wilson - Physics</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default Dashboard;