import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CustomLink = styled(Link)<{ active?: string }>`
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;
  padding-bottom: 5px;
  opacity: 0.7;
  ${props =>
    props.active === 'false'
      ? null
      : css`
          opacity: 1;
          border-bottom: 2px solid #ff872c;
        `}

  & + a {
    margin-left: 32px;
  }

  &:hover {
    opacity: 1;
  }
`;
