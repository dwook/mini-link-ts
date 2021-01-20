import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  font-size: 1.2rem;
  line-height: 2;
  display: inline;
  padding: 0.5rem 1rem;
  white-space: pre-wrap;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 16px;
    line-height: 2.2;
  }
  ${(props) => {
    if (props.primary) {
      return `
        background: #000;
        color: #fff;
    `;
    }
    return `
      background: #fff;
      color: #000;
    `;
  }}
`;

const Introduction = ({ content, primary }) => (
  <StyledContainer primary={primary}>{content}</StyledContainer>
);

Introduction.propTypes = {
  content: PropTypes.node,
  primary: PropTypes.bool,
};

Introduction.defaultProps = {
  content: null,
  primary: false,
};

export default Introduction;
