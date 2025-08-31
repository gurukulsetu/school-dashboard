import React from 'react';
import { Container } from 'react-bootstrap';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title, className = '' }) => {
  return (
    <Container fluid className={`p-4 ${className}`}>
      {children}
    </Container>
  );
};

export default PageWrapper;
