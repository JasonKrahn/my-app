import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-color: #f5c6cb;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = ({ children }) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

export default ErrorMessage;