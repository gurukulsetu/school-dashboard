export {};
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Layout from '../../components/common/Layout';

const AddStudent: React.FC = () => {
  return (
    <Layout>
      <Container fluid className="p-4">

      {/* Student Registration Form */}
      <Row>
        <Col lg={8} xl={6}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Student Registration Form</h5>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder="Enter first name" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder="Enter last name" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter email address" />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" placeholder="Enter phone number" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Grade</label>
                    <select className="form-select">
                      <option value="">Select Grade</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Section</label>
                    <select className="form-select">
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">Add Student</button>
                <button className="btn btn-secondary">Reset Form</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default AddStudent;
