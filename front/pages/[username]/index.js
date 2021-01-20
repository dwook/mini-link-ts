import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import MiniLink from '../../src/components/MiniLink';
import Introduction from '../../src/components/Introduction';
import {
  CoverImage,
  CoverButtonList,
  CoverButton,
} from '../../src/components/CoverImage';
import Modal from '../../src/components/Modal';
import Button from '../../src/components/Button';
import Footer from '../../src/components/Footer';
import { Home, Instagram, Youtube, Share } from '../../src/icons';
import { backURL } from '../../config';

const MiniHome = ({ miniHome, miniLinks, username, ip }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const URLRef = useRef(null);

  const onLinkClick = useCallback(
    (linkId) => () => {
      axios.post(`${backURL}/visit?linkId=${linkId}&ip=${ip}`);
    },
    []
  );
  const onShareClick = useCallback(() => {
    try {
      if (navigator.share) {
        navigator.share({
          title: `${username} 미니링크`,
          text: miniHome.introduction,
          url: `https://mini-link.site/${username}`,
        });
      } else {
        setIsModalOpen(true);
      }
    } catch (e) {
      console.log('공유 실패');
    }
  }, []);
  const copyToClipboard = (e) => {
    URLRef.current.select();
    document.execCommand('copy');
    setCopySuccess('주소가 복사되었습니다!');
  };

  useEffect(() => {
    axios.post(`${backURL}/visit?homeId=${miniHome.id}&ip=${ip}`);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCopySuccess('');
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [copySuccess]);

  return (
    <>
      <Head>
        <title>{username} 미니링크</title>
        <meta property="og:title" content={`${username} 미니링크`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://mini-link.site/${username}`}
        />
        <meta property="og:description" content={miniHome.introduction} />
        <meta property="og:image" content={miniHome.coverImage} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header mainColor={miniHome.mainColor}>
        <CoverImage imageURL={miniHome.coverImage}>
          <Introduction primary content={username} />
          <Introduction content={miniHome.introduction} />
          <CoverButtonList>
            {miniHome.website && (
              <CoverButton outsite icon={<Home />} href={miniHome.website} />
            )}
            {miniHome.instagram && (
              <CoverButton
                outsite
                icon={<Instagram />}
                href={`https://www.instagram.com/${miniHome.instagram}`}
              />
            )}
            {miniHome.youtube && (
              <CoverButton outsite icon={<Youtube />} href={miniHome.youtube} />
            )}
            <CoverButton icon={<Share />} onClick={onShareClick} />
          </CoverButtonList>
        </CoverImage>
        {isModalOpen && (
          <Modal onModalCloseHandler={setIsModalOpen}>
            <URLContainer>
              <Message>{copySuccess}</Message>
              <form>
                <URLTextarea
                  readOnly
                  ref={URLRef}
                  value={`https://mini-link.site/${username}`}
                />
              </form>
              <Button primary big full onClick={copyToClipboard}>
                주소복사
              </Button>
            </URLContainer>
          </Modal>
        )}
      </Header>
      <Content>
        <LinksContainer>
          {miniLinks &&
            miniLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onLinkClick(link.id)}
              >
                <MiniLink name={link.name} imageURL={link.image} />
              </a>
            ))}
        </LinksContainer>
      </Content>
      <Footer />
    </>
  );
};

MiniHome.propTypes = {
  miniHome: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  miniLinks: PropTypes.array,
  ip: PropTypes.string,
};

MiniHome.defaultProps = {
  miniLinks: [],
  ip: '',
};

const fetcher = (url) => axios.get(url).then((result) => result.data);

export async function getServerSideProps(context) {
  const user = await axios.post('/user/check', {
    username: context.params.username,
  });

  const ipData = await fetch('https://api.ipify.org?format=json', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => res.ip);

  if (user.data) {
    const GET_HOME_DATA_URL = `${backURL}/home/${context.params.username}`;
    const GET_LINKS_DATA_URL = `${backURL}/link?username=${context.params.username}&public=1`;
    const homeData = await fetcher(GET_HOME_DATA_URL);
    const linkData = await fetcher(GET_LINKS_DATA_URL);

    return {
      props: {
        miniHome: homeData,
        miniLinks: linkData,
        username: context.params.username,
        ip: ipData,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
}

const Header = styled.div`
  background-color: ${(props) => props.mainColor || props.theme.color.yellow};
  height: 240px;
  width: 100%;
  position: fixed;
  z-index: 50;
  top: 0;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 240px auto 100px;
  @media screen and ${(props) => props.theme.media.mobile} {
    padding: 0 20px;
  }
`;

const URLContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  form {
    width: 100%;
  }
`;

const URLTextarea = styled.textarea`
  width: 100%;
  background-color: ${(props) => props.theme.color.gray};
  text-align: center;
  border: none;
  border-radius: 6px;
  outline: none;
  resize: none;
  line-height: 3;
  font-size: 16px;
  height: 3rem;
  margin: 1rem 0 1rem;
`;

const Message = styled.div`
  margin: 1rem 0;
  height: 1rem;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  > a {
    width: 50%;
  }
`;

export default MiniHome;
