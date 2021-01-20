import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  font-size: 1.2rem;
  line-height: 2;
  display: inline;
  box-decoration-break: clone;
  background: #fff;
  padding: 0.5rem 1rem;
  filter: url('#gooey');
`;

const Gooey = ({ content }) => (
  <>
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>
    <StyledContainer>{content}</StyledContainer>
  </>
);

Gooey.propTypes = {
  content: PropTypes.node,
};

Gooey.defaultProps = {
  content: null,
};

export default Gooey;
