import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';

const StyledJumbotron = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  flex-direction: column;
  width: 100%;
  height: 270px;
  background-color: ${(props) => props.theme.color.primary};
  text-align: center;
  .container {
    max-width: 450px;
    margin: 0 auto;
  }
  .emoji {
    font-size: 60px;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const H1 = styled.h1`
  color: #fff;
  padding: 1.5rem;
  font-size: 3rem;
  font-weight: bold;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

const H2 = styled.h1`
  color: #fff;
  padding: 1rem;
  font-size: 2rem;
  line-height: 1.2;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 1.2rem;
  }
`;

const Jumbotron = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <StyledJumbotron>
      {userInfo && (
        <div className="container">
          <div className="emoji">😃</div>
          <H2>{`${userInfo?.username}님, 안녕하세요!`}</H2>
          <Link href="/admin">
            <a>
              <Button full>
                관리자 페이지로 이동
              </Button>
            </a>
          </Link>
        </div>
      )}
      {!userInfo && (
        <>
          <H1>💛 한번에 보여주는 멀티링크 🌿</H1>
          <H2>전달하고 싶은 모든 링크를 한페이지에 담아요!</H2>
        </>
      )}
    </StyledJumbotron>
  );
};

export default Jumbotron;
