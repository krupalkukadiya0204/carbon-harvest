import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const IndustryDashboard = () => {
    return (
        <Container className="py-4">
            <h1 className="mb-4">Industry Dashboard</h1>
            <Row>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Carbon Market</Card.Title>
                            <Card.Text>
                                Browse and purchase carbon credits
                            </Card.Text>
                            <a href="/industry/market" className="btn btn-primary">View Market</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Portfolio</Card.Title>
                            <Card.Text>
                                Manage your carbon credit portfolio
                            </Card.Text>
                            <a href="/industry/portfolio" className="btn btn-primary">View Portfolio</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Transactions</Card.Title>
                            <Card.Text>
                                View your transaction history
                            </Card.Text>
                            <a href="/industry/transactions" className="btn btn-primary">View Transactions</a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default IndustryDashboard;
