import React from 'react';

import { Container, CustomLink } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <CustomLink to="/" active={String(window.location.pathname === '/')}>
          Listagem
        </CustomLink>
        <CustomLink
          to="/import"
          active={String(window.location.pathname === '/import')}
        >
          Importar
        </CustomLink>
      </nav>
    </header>
  </Container>
);

export default Header;
