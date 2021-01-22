import React from 'react';
import styled from 'styled-components';

interface IntroductionProps {
  content?: React.ReactNode;
  primary?: boolean;
}

const StyledContainer = styled.div < IntroductionProps > `
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

const Introduction = ({ content, primary }: IntroductionProps) => (
  <StyledContainer primary={primary}>{content}</StyledContainer>
);

Introduction.defaultProps = {
  content: null,
  primary: false,
};

export default Introduction;
