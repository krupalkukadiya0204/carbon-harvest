import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FarmerCredits = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Carbon Credits</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Credit Balance</Card.Title>
              <div className="credit-stats">
                <div className="stat">
                  <h3>0</h3>
                  <p>Total Credits</p>
                </div>
                <div className="stat">
                  <h3>₹0</h3>
                  <p>Estimated Value</p>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Transaction History</Card.Title>
              <p>No transactions yet. Your credit transactions will appear here.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Market Overview</Card.Title>
              <div className="market-stats">
                <div className="stat">
                  <h4>₹1,200</h4>
                  <p>Current Price/Credit</p>
                </div>
                <div className="stat">
                  <h4>+5%</h4>
                  <p>24h Change</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerCredits;
