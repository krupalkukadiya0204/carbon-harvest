import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FarmerProjects = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">My Projects</h2>
      <Row>
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Active Projects</Card.Title>
              <Card.Text>
                Here you can view and manage all your active carbon credit projects.
              </Card.Text>
              {/* Project list will be populated from API */}
              <div className="project-list">
                <p>No active projects yet. Start a new project to begin earning carbon credits!</p>
              </div>
              <button className="btn btn-primary mt-3">Start New Project</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerProjects;
