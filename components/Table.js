import styled from 'styled-components';
import useSortableData from './useSortableData';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  font-weight: bold;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;
  color: #0070f3;

  &:hover {
    color: #0058cc;
  }
`;

const Table = ({ items }) => {
  const { items: sortedItems, requestSort, sortConfig } = useSortableData(items);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <StyledTable>
      <TableHeader>
        <tr>
          <th>Image</th>
          <th>
            <SortButton type="button" onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
              Name
            </SortButton>
          </th>
          <th>
            <SortButton type="button" onClick={() => requestSort('price')} className={getClassNamesFor('price')}>
              Price
            </SortButton>
          </th>
          <th>Link</th>
        </tr>
      </TableHeader>
      <tbody>
        {sortedItems.map((item, index) => (
          <tr key={index}>
            <TableCell>
              <img src={item.imageUrl} alt={item.name} width="100" />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
