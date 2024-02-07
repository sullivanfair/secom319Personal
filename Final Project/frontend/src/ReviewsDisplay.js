import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ReviewsDisplay = ({ review }) => {
  return (
    <ListGroup>
 
        <ListGroup.Item>{review}</ListGroup.Item>

    </ListGroup>
  );
};

export default ReviewsDisplay;
