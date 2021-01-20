import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Logo } from '../icons';

const StyledFooter = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Footer = () => (
  <StyledFooter>
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
  </StyledFooter>
);

export default Footer;
