import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FarmerReports = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Reports & Analytics</h2>
      <Row>
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Project Performance</Card.Title>
              <Card.Text>
                Track your projects carbon reduction impact and financial performance.
              </Card.Text>
              <div className="reports-list">
                <p>No reports available yet. Reports will be generated once your projects are active.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Carbon Reduction</Card.Title>
              <div className="chart-placeholder">
                <p>Carbon reduction metrics will be displayed here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Financial Summary</Card.Title>
              <div className="chart-placeholder">
                <p>Financial performance metrics will be displayed here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerReports;
