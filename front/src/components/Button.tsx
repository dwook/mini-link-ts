import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  primary: boolean;
  big: boolean;
  full: boolean;
  onClick: () => void;
}

const StyledButton = styled.button < ButtonProps > `
  border-radius: 6px;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  ${(props) => {
    if (props.primary) {
      return `
        background: ${props.theme.colors.primary};
        color: #fff;
        box-shadow: ${props.theme.colors.primary}4D 0px 4px 8px 0px,
        ${props.theme.colors.primary}40 0px 2px 4px 0px;
        &:hover {
          box-shadow: ${props.theme.colors.primary}4D 0px 4px 8px 0px;
        }
    `;
    }
    return `
      box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1);
      &:hover {
        box-shadow: 0 6px 20px rgba(93,93,93,0.23);
      }
    `;
  }}
  ${(props) => {
    if (props.big) {
      return `
        height: 60px;
        font-size: 16px;
        font-weight: bold;
  `;
    }
    return `
    height: 44px;
    font-size: 14px;
  `;
  }}
  ${(props) => {
    if (props.full) {
      return `
      width: 100%;
  `;
    }
    return null;
  }}
`;

const Button = ({
  children, primary, big, full, onClick,
}: ButtonProps) => (
  <StyledButton primary={primary} big={big} full={full} onClick={onClick}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  children: null,
  primary: false,
  big: false,
  full: false,
  onClick: null,
};

export default Button;
