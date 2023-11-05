import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import placeholder from '../noimagefound.svg'

interface Props {
  title: string,
  summary: string,
  image: string
}

const GameCard = ({title, summary, image}: Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image ? image : placeholder} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {summary ? summary : "No summary available"}
        </Card.Text>
        <Button variant='primary'>Go Somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default GameCard;