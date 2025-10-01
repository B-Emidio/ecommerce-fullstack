import React from "react";
import Button from 'react-bootstrap/Button';

export default function MainButton({ text, onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      bsPrefix="mainButton"
    >
      {text}
    </Button>
  );
}