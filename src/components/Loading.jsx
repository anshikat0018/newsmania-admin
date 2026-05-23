import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa'
      }}
    >
      <Container className="text-center">
        <div className="mb-4">
          <Spinner
            animation="border"
            role="status"
            style={{
              width: '50px',
              height: '50px',
              color: '#8fc3cc',
              borderWidth: '4px'
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <h4 style={{ color: 'white', fontWeight: '600' }}>Loading...</h4>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Please wait</p>
      </Container>
    </div>
  );
};

export default Loading;