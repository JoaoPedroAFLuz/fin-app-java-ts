import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  padding: 0.5rem;

  background: ${({ theme }) => theme.colors.primary};

  img {
    height: 50px;
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
