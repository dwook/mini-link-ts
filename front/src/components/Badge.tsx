import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  text?: string;
  primary?: boolean;
}

const StyledBadge = styled.div < BadgeProps > `
  display: inline-block;
  padding: 8px 8px 6px;
  border-radius: 16px;
  font-size: 14px;
  ${(props) => {
    if (props.primary) {
      return `
        background: ${props.theme.colors.primary};
        color: #fff;
    `;
    }
    return `
      background: #fff;
      color: ${props.theme.colors.darkgray};
    `;
  }}
`;

const Badge = ({ text, primary }: BadgeProps) => (
  <StyledBadge primary={primary}>{text}</StyledBadge>
);

Badge.defaultProps = {
  text: '',
  primary: false,
};

export default Badge;
