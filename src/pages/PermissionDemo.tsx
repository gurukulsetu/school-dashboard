import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Badge, Button, Table } from 'react-bootstrap';
import { EnhancedPermissionsService } from '../services/enhancedPermissionsService';
import { User, School } from '../types';

const PermissionDemo: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [demoUsers, setDemoUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const schoolData = EnhancedPermissionsService.getAvailableSchools();
      const userData = EnhancedPermissionsService.getDemoUsers();
      
      setSchools(schoolData);
      setDemoUsers(userData);
    };

    loadData();
  }, []);

  const handleUserSelect = async (user: User) => {
    setSelectedUser(user);
    const permissions = await EnhancedPermissionsService.getUserPermissions(user);
    setUserPermissions(permissions);
  };

  const getSchoolName = (schoolId: string) => {
    return schools.find(s => s.id === schoolId)?.name || schoolId;
  };

  const getSchoolFeatures = (schoolId: string) => {
    return schools.find(s => s.id === schoolId)?.features || [];
  };

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h2>🔒 Two-Level Permission System Demo</h2>
        <p className="text-muted">
          This demonstrates how school-level features and user role permissions work together.
        </p>
      </div>

      <Row>
        {/* Schools and Features */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">🏫 Schools & Features</h5>
            </Card.Header>
            <Card.Body>
              {schools.map(school => (
                <div key={school.id} className="mb-4">
                  <h6 className="fw-bold">
                    {school.name} 
                    <Badge bg="primary" className="ms-2">{school.subscription}</Badge>
                  </h6>
                  <div className="mb-2">
                    <strong>Enabled Features:</strong>
                  </div>
                  <div className="mb-2">
                    {school.features.filter(f => f.enabled).map(feature => (
                      <Badge key={feature.feature} bg="success" className="me-1 mb-1">
                        ✅ {feature.feature.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <strong>Disabled Features:</strong>
                  </div>
                  <div>
                    {school.features.filter(f => !f.enabled).map(feature => (
                      <Badge key={feature.feature} bg="danger" className="me-1 mb-1">
                        ❌ {feature.feature.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Demo Users */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">👥 Demo Users</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-3">Click a user to see their permissions:</p>
              {demoUsers.map(user => (
                <Button
                  key={user.id}
                  variant={selectedUser?.id === user.id ? "primary" : "outline-secondary"}
                  className="me-2 mb-2 d-block w-100 text-start"
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{user.name}</strong>
                      <br />
                      <small>{user.email}</small>
                    </div>
                    <div className="text-end">
                      <Badge bg="info">{user.role}</Badge>
                      <br />
                      <small className="text-muted">{getSchoolName(user.schoolId)}</small>
                    </div>
                  </div>
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Permissions Display */}
      {selectedUser && userPermissions && (
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  🔑 Permissions for {selectedUser.name} ({selectedUser.role}) at {getSchoolName(selectedUser.schoolId)}
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6>📊 Available Statistics:</h6>
                    {userPermissions.statistics.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {userPermissions.statistics.map((stat: string) => (
                          <li key={stat} className="list-group-item d-flex align-items-center">
                            <Badge bg="success" className="me-2">✓</Badge>
                            {stat}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No statistics available</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <h6>⚡ Quick Actions:</h6>
                    {userPermissions.quickActions.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {userPermissions.quickActions.map((action: any) => (
                          <li key={action.id} className="list-group-item d-flex align-items-center">
                            <Badge bg="success" className="me-2">✓</Badge>
                            <span className="me-2">{action.icon}</span>
                            <span>{action.title}</span>
                            {action.type === 'dropdown' && (
                              <Badge bg="info" className="ms-auto">Dropdown</Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No quick actions available</p>
                    )}
                  </Col>
                </Row>

                <hr />

                <h6>🏫 School Feature Access Matrix:</h6>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>School Enabled</th>
                      <th>Role Access</th>
                      <th>Final Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSchoolFeatures(selectedUser.schoolId).map(feature => {
                      const hasAccess = userPermissions.quickActions.some((action: any) => 
                        action.id.includes(feature.feature.split('_')[0]) || 
                        userPermissions.statistics.includes(`total${feature.feature.split('_')[0].charAt(0).toUpperCase() + feature.feature.split('_')[0].slice(1)}s`)
                      );
                      
                      return (
                        <tr key={feature.feature}>
                          <td>{feature.feature.replace('_', ' ')}</td>
                          <td>
                            <Badge bg={feature.enabled ? "success" : "danger"}>
                              {feature.enabled ? "✅ Yes" : "❌ No"}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg="info">{selectedUser.role}</Badge>
                          </td>
                          <td>
                            <Badge bg={hasAccess && feature.enabled ? "success" : "secondary"}>
                              {hasAccess && feature.enabled ? "✅ Allowed" : "🚫 Denied"}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Usage Instructions */}
      <Row className="mt-4">
        <Col lg={12}>
          <Card className="bg-light">
            <Card.Header>
              <h5 className="mb-0">📋 How It Works</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>🏫 School-Level Control:</h6>
                  <ul>
                    <li><strong>School A (Greenwood Academy):</strong> All features enabled</li>
                    <li><strong>School B (Riverside High):</strong> Attendance & Exam features disabled</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>👤 User Role Permissions:</h6>
                  <ul>
                    <li><strong>Admin:</strong> Full access to enabled features</li>
                    <li><strong>Accountant:</strong> Can't manage classes</li>
                    <li><strong>Staff:</strong> Can't pay fees</li>
                    <li><strong>Student:</strong> Limited view-only access</li>
                  </ul>
                </Col>
              </Row>
              <div className="mt-3">
                <h6>🔐 Permission Logic:</h6>
                <code>Final Permission = School Feature Enabled AND User Role Has Access</code>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionDemo;
