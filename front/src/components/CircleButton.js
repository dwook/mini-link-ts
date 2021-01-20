import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const StyledCircleButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 4px;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover {
    opacity: 0.8;
  }
  @media screen and ${(props) => props.theme.media.mobile} {
    height: 40px;
    width: 40px;
    margin: 2px;
  }
  ${(props) => {
    if (props.primary) {
      return `
        background: ${props.theme.color.primary};
        color: #fff;
    `;
    }
    return `
      background: #fff;
      color: ${props.theme.color.black};
    `;
  }}
`;

const CircleButton = ({ outsite, icon, href, primary, onClick }) => {
  if (outsite && href) {
    return (
      <a href={href}>
        <StyledCircleButton type="button" primary={primary}>
          {icon}
        </StyledCircleButton>
      </a>
    );
  }
  if (!outsite && href) {
    return (
      <Link href={href}>
        <a>
          <StyledCircleButton type="button" primary={primary}>
            {icon}
          </StyledCircleButton>
        </a>
      </Link>
    );
  }
  return (
    <StyledCircleButton type="button" primary={primary} onClick={onClick}>
      {icon}
    </StyledCircleButton>
  );
};

CircleButton.propTypes = {
  outsite: PropTypes.bool,
  icon: PropTypes.node,
  href: PropTypes.string,
  primary: PropTypes.bool,
  onClick: PropTypes.func,
};

CircleButton.defaultProps = {
  outsite: false,
  icon: '',
  href: null,
  primary: false,
  onClick: null,
};

export default CircleButton;
