import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBadge = styled.div`
  display: inline-block;
  padding: 8px 8px 6px;
  border-radius: 16px;
  font-size: 14px;
  ${(props) => {
    if (props.primary) {
      return `
        background: ${props.theme.color.primary};
        color: #fff;
    `;
    }
    return `
      background: #fff;
      color: ${props.theme.color.darkgray};
    `;
  }}
`;

const Badge = ({ text, primary }) => (
  <StyledBadge primary={primary}>{text}</StyledBadge>
);

Badge.propTypes = {
  text: PropTypes.string,
  primary: PropTypes.bool,
};

Badge.defaultProps = {
  text: '',
  primary: false,
};

export default Badge;
