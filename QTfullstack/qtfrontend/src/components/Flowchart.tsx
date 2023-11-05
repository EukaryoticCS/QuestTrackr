import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FlowChart = () => {
  return (
    <Container>
      <Row>
        <Col className="box" style={{ backgroundColor: '#f8d7da', borderRadius: '10px 50px 10px 50px' }}>
          Create Trackr Templates
        </Col>
        <Col className="box" style={{ backgroundColor: '#cce5ff', borderRadius: '50px 10px 50px 10px' }}>
          Track Your Progress
        </Col>
        <Col className="box" style={{ backgroundColor: '#d4edda', borderRadius: '10px 50px 10px 50px' }}>
          Show off to Friends!
        </Col>
      </Row>
    </Container>
  );
};

export default FlowChart;