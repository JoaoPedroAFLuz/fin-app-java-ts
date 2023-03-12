import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  padding: 0.5rem;

  background: ${({ theme }) => theme.colors.primary.dark};

  img {
    height: 3.25rem;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    list-style-type: none;

    li {
      a {
        color: #ffffff;
        text-decoration: none;
        font-size: 1.5rem;
      }
    }
  }
`;

export const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 1000px;
  margin: 2.5rem auto;
`;
