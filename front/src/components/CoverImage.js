import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const CoverImage = styled.div`
  max-width: 600px;
  height: 100%;
  padding-top: 20px;
  margin: 0 auto;
  position: relative;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
  background-position: center;
`;

const CoverButtonList = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const StyledCoverButton = styled.button`
  background-color: #fff;
  display: inline-block;
  padding: 10px 10px 8px;
  border-radius: 6px;
  cursor: pointer;
  margin: 2px;
`;

const CoverButton = ({ children, outsite, icon, href, onClick }) => {
  if (outsite && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <StyledCoverButton>
          {icon}
          {children}
        </StyledCoverButton>
      </a>
    );
  }
  if (!outsite && href) {
    return (
      <Link href={href}>
        <StyledCoverButton>
          {icon}
          {children}
        </StyledCoverButton>
      </Link>
    );
  }
  return (
    <StyledCoverButton onClick={onClick}>
      {icon}
      {children}
    </StyledCoverButton>
  );
};

CoverButton.propTypes = {
  children: PropTypes.node,
  outsite: PropTypes.bool,
  icon: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

CoverButton.defaultProps = {
  children: null,
  outsite: false,
  icon: '',
  href: null,
  onClick: null,
};

export { CoverImage, CoverButtonList, CoverButton };
