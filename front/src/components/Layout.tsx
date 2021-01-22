import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const Container = styled.div`
  max-width: 600px;
  padding-top: 20px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  button {
    position: absolute;
    top: 0;
    left: 20px;
    padding: 2px;
    cursor: pointer;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
`;

interface LayoutProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onClick: () => void;
}

const Layout = ({
  icon, title, onClick, children,
}: LayoutProps) => (
  <>
    <Container>
      <Top>
        <button type="button" onClick={onClick}>
          {icon}
        </button>
        <Title>{title}</Title>
      </Top>
      {children}
    </Container>
    <Footer />
  </>
);

Layout.defaultProps = {
  icon: null,
  title: '',
  onClick: null,
  children: null,
};

export default Layout;
