import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMiniLink = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px 0;
  align-items: center;
  background: #fff;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
  border-radius: 6px;
  .content {
    text-align: left;
    color: ${(props) => props.theme.color.darkgray};
    font-size: 16px;
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    @media screen and ${(props) => props.theme.media.mobile} {
      font-size: 14px;
      bottom: 0.5rem;
    }
  }
  .title {
    display: inline;
    padding: 0.4rem 0.6rem;
    background: #fff;
    max-width: 80%;
    line-height: 1.8;
    white-space: pre-wrap;
    font-size: 16px;
    letter-spacing: -0.05rem;
    @media screen and ${(props) => props.theme.media.mobile} {
      font-size: 14px;
    }
  }
  .detail {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left: 0;
    padding: 1rem;
    color: ${(props) => props.theme.color.darkgray};
  }
  .click {
    padding: 7px 10px;
    border-radius: 16px;
    font-size: 14px;
    background: #fff;
    .count {
      margin: 0 5px;
    }
  }
  .edit {
    position: absolute;
    top: 12px;
    right: 10px;
  }
`;

const Thumbnail = styled.div`
  background: ${(props) => props.theme.color.gray};
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
`;

const MiniLink = ({ name, imageURL, children }) => (
  <StyledMiniLink>
    <Thumbnail imageURL={imageURL} />
    {children}
    <div className="content">
      <div className="title">{name}</div>
    </div>
  </StyledMiniLink>
);

MiniLink.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
  children: PropTypes.node,
};

MiniLink.defaultProps = {
  name: '',
  imageURL: '',
  children: null,
};

export default MiniLink;
