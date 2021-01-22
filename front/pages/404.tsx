import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../src/components/Layout';
import Button from '../src/components/Button';

export default function FourOhFour() {
  return (
    <Layout>
      <Banner>
        <div className="emoji">😳</div>
        <div className="text">존재하지 않는 페이지입니다.</div>
      </Banner>
      <Link href="/">
        <a>
          <Button primary big full>
            미니링크 이동하기
          </Button>
        </a>
      </Link>
    </Layout>
  );
}

const Banner = styled.div`
  padding: 20px;
  margin: 20px;
  .emoji {
    font-size: 60px;
    text-align: center;
    margin-bottom: 4rem;
  }
  .text {
    text-align: center;
    font-size: 1.5rem;
  }
`;
