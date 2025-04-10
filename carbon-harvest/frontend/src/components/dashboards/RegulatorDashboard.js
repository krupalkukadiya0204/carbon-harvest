import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RegulatorDashboard = () => {
    return (
        <Container className="py-4">
            <h1 className="mb-4">Regulator Dashboard</h1>
            <Row>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Project Approvals</Card.Title>
                            <Card.Text>
                                Review and approve carbon credit projects
                            </Card.Text>
                            <a href="/regulator/approvals" className="btn btn-primary">View Approvals</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Monitoring</Card.Title>
                            <Card.Text>
                                Monitor ongoing projects and compliance
                            </Card.Text>
                            <a href="/regulator/monitoring" className="btn btn-primary">View Monitoring</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Reports</Card.Title>
                            <Card.Text>
                                Access system-wide reports and analytics
                            </Card.Text>
                            <a href="/regulator/reports" className="btn btn-primary">View Reports</a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegulatorDashboard;
