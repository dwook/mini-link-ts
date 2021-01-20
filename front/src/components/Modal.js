import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cross } from '../icons';

const StyledContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 90%;
  max-width: 400px;
  z-index: 100;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const Modal = ({ children, onModalCloseHandler }) => {
  const [isOpen, setIsOpen] = useState(true);
  const onCloseClick = () => {
    const handler = onModalCloseHandler || setIsOpen;
    handler(false);
  };

  if (!isOpen) return null;

  return (
    <StyledContainer>
      <Header>
        <CloseButton onClick={onCloseClick}>
          <Cross />
        </CloseButton>
      </Header>
      {children}
    </StyledContainer>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onModalCloseHandler: PropTypes.func,
};

Modal.defaultProps = {
  children: null,
  onModalCloseHandler: null,
};

export default Modal;
