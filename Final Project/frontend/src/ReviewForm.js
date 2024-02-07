import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ onReviewSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onReviewSubmit(review);
    setReview('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="review">
        <Form.Label>Write a Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit Review
      </Button>
    </Form>
  );
};

export default ReviewForm;