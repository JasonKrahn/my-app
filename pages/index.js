import { useState } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import Table from '../components/Table';
import LoadingSpinner from '../components/LoadingSpinner';
import React from 'react';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0058cc;
  }
`;

function Home() {
  const [formInputValue, setFormInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scrapeURL: formInputValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchData();
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={formInputValue}
          onChange={(event) => setFormInputValue(event.target.value)}
          placeholder="Enter the URL to scrape"
        />
        <Button type="submit">Fetch Products</Button>
      </Form>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {items.length > 0 && <Table items={items} />}
    </Container>
  );
}

export default Home;