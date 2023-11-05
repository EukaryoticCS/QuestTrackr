import React from 'react'
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const SearchBar = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <Form className="d-flex inline">
            <Form.Control
              type="search"
              placeholder='Search'
              className='me-2 rounded-pill'
              aria-label='Search'
            />
            <Button className='rounded-pill' variant='outline-primary'>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchBar;