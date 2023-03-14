import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  img {
    cursor: pointer;

    transform: rotate(-90deg);
  }
`;
