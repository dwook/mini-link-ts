import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store';
import { userAction } from '../feature/User/slice';
import Header from '../src/components/Header';
import Jumbotron from '../src/components/Jumbotron';
import Button from '../src/components/Button';

const CASELIST = [
  {
    id: 'vivastudio',
    category: 'fashion',
    name: '비바스튜디오',
    img:
      'https://mini-link.s3.ap-northeast-2.amazonaws.com/original/1610891465951_vivastudio_cover.jpg',
    mockup:
      'https://mini-link.s3.ap-northeast-2.amazonaws.com/mockups_vivastudio.png',
  },
  {
    id: 'alicefunk',
    category: 'influencer',
    name: '앨리스펑크',
    img:
      'https://mini-link.s3.ap-northeast-2.amazonaws.com/original/1610891792221_alicefunk_cover.jpg',
    mockup:
      'https://mini-link.s3.ap-northeast-2.amazonaws.com/mockups_alicefunk.png',
  },
  {
    id: 'hellonature',
    category: 'food',
    name: '헬로네이처',
    img:
      'https://mini-link.s3.ap-northeast-2.amazonaws.com/original/1610894213199_hellonature_cover.jpg',
    mockup:
      'https://mini-link.s3.ap-northeast-2.amazonaws.com/mockups_hellonature.png',
  },
];

const Home = () => {
  const [id, setId] = useState();
  const onInputChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div>
      <Header />
      <Jumbotron />
      <Container>
        <Section>
          <InputContainer>
            <div className="container">
              <span className="domain">https://mini-link.site/</span>
              <input onChange={onInputChange} value={id} />
            </div>
            <Link href={id ? `/user/signup?id=${id}` : '/user/signup'}>
              <a>
                <Button primary full>
                  시작하기
                </Button>
              </a>
            </Link>
          </InputContainer>
        </Section>
        <Showcase>
          <div className="title">SHOWCASE</div>
          <div className="notice">※ 예시를 위한 작업으로 실제 업체가 운영하는 페이지가 아닙니다.</div>
          <div className="list">
            {CASELIST.map((item) => (
              <a
                key={item.id}
                href={`https://mini-link.site/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Item>
                  <div className="info">
                    <span className="category">{item.category}</span>
                    <span className="name"> {item.name}</span>
                    <span className="url">
                      https://mini-link.site/<strong>{item.id}</strong>
                    </span>
                  </div>
                  <Thumbnail src={item.img}>
                    <img className="mockup" src={item.mockup} alt={item.name} />
                  </Thumbnail>
                </Item>
              </a>
            ))}
          </div>
        </Showcase>
      </Container>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(userAction.getMyInfoRequest());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

const Container = styled.div`
  text-align: center;
`;

const Section = styled.div`
  margin: 0 auto;
  padding: 6.25rem 0;
  text-align: center;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  font-size: 16px;
  .container {
    flex: 1 1 0;
    padding-left: 10px;
    text-align: left;
  }
  .domain {
    color: #bababa;
    padding: 10px 0;
  }
  input {
    width: 40%;
    border: none;
    color: ${(props) => props.theme.color.primary};
    outline: none;
    font-weight: bold;
    font-size: 16px;
    line-height: 3;
  }
  button {
    font-size: 16px;
  }
  @media screen and ${(props) => props.theme.media.mobile} {
    width: 90%;
    max-width: 100%;
    padding: 16px;
    height: auto;
    flex-direction: column;
    a {
      width: 100%;
    }
  }
`;

const Showcase = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 30px auto 200px;
  .title {
    width: 100%;
    font-size: 2rem;
    color: #eaeaea;
    margin: 0 0 30px;
    font-weight: 300;
  }
  .notice {
    margin-bottom: 20px;
  }
  .list {
    width: 100%;
    display: flex;
    a {
      width: 100%;
      color: #2c3848;
    }
    @media screen and ${(props) => props.theme.media.mobile} {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  align-items: center;
  position: relative;
  margin: 10px;
  @media screen and ${(props) => props.theme.media.mobile} {
    width: 90%;
    margin: 20px auto 50px;
  }
  .info {
    position: absolute;
    width: 80%;
    top: 12px;
    left: 0;
    text-align: left;
    line-height: 2.8;
  }
  .category {
    padding: 10px;
    text-transform: uppercase;
    font-weight: bold;
    background-color: ${(props) => props.theme.color.primary};
    color: #fff;
    white-space: nowrap;
  }
  .name {
    padding: 10px;
    background: #fff;
    white-space: nowrap;
  }
  .url {
    display: inline-block;
    position: absolute;
    top: 38px;
    left: 0;
    padding: 0 10px;
    background: #fff;
    color: #bababa;
    white-space: nowrap;
    strong {
      font-weight: bold;
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const Thumbnail = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  padding-top: 200px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  .mockup {
    position: absolute;
    bottom: -85px;
    right: 20px;
    width: 100px;
    @media screen and ${(props) => props.theme.media.mobile} {
      bottom: -32px;
    }
  }
`;

export default Home;
