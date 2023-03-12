import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3.25rem;
  padding: 0 1rem;

  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  transition: background 0.2s ease-in;
  appearance: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc !important;
    cursor: not-allowed !important;
  }
`;
