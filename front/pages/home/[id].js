import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store';
import { userAction } from '../../feature/User/slice';
import { homeAction } from '../../feature/Home/slice';
import Layout from '../../src/components/Layout';
import ImageUploadArea from '../../src/components/ImageUploadArea';
import Button from '../../src/components/Button';
import { Row, Input, Label, Message, Error } from '../../src/components/Input';
import { Cross } from '../../src/icons';

const editHomePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { selectedHome, editHomeDone } = useSelector((state) => state.home);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      introduction: selectedHome?.introduction,
      instagram: selectedHome?.instagram,
      youtube: selectedHome?.youtube,
      website: selectedHome?.website,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.image[0]) {
      formData.append('coverImage', data.image[0]);
    }
    formData.append('introduction', data.introduction);
    formData.append('instagram', data.instagram);
    formData.append('youtube', data.youtube);
    formData.append('website', data.website);
    formData.append('userId', id);
    dispatch(homeAction.editHomeRequest(formData));
  };
  const goAdmin = () => router.push('/admin');

  useEffect(() => {
    if (editHomeDone) {
      router.push('/admin');
      dispatch(homeAction.editHomeReset());
    }
  }, [editHomeDone]);

  return (
    <Layout title="커버 수정하기" icon={<Cross />} onClick={goAdmin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploadArea
          name="image"
          ref={register}
          exImageURL={selectedHome?.coverImage}
        />
        <Row>
          <Label>소개글</Label>
          <Input
            name="introduction"
            type="text"
            placeholder="소개글을 입력해주세요."
            ref={register}
          />
          <Message>
            <Error>{errors.introduction?.message}</Error>
          </Message>
        </Row>
        <Row>
          <Label>웹사이트</Label>
          <Input
            name="website"
            inputmode="url"
            placeholder="웹사이트 전체 주소를 입력해주세요."
            ref={register({
              pattern: {
                value: /^(http|https):\/\//,
                message: 'http:// 또는 https://로 시작하는 URL을 입력해주세요.',
              },
            })}
          />
          <Message>
            <Error>{errors.website?.message}</Error>
          </Message>
        </Row>
        <Row>
          <Label>인스타그램</Label>
          <Input
            name="instagram"
            inputmode="url"
            placeholder="@를 제외한 아이디만 입력해주세요."
            ref={register({
              pattern: {
                value: /^[^@ | http://www. | https://www.].*/,
                message: '@없이 인스타그램 아이디만 입력해주세요.',
              },
            })}
          />
          <Message>
            <Error>{errors.instagram?.message}</Error>
          </Message>
        </Row>
        <Row>
          <Label>유투브</Label>
          <Input
            name="youtube"
            inputmode="url"
            placeholder="채널 전체 주소를 입력해주세요."
            ref={register({
              pattern: {
                value: /^(http|https):\/\//,
                message: 'http:// 또는 https://로 시작하는 URL을 입력해주세요.',
              },
            })}
          />
          <Message>
            <Error>{errors.youtube?.message}</Error>
          </Message>
        </Row>
        <Outro>
          <Button primary big type="submit">
            수정 완료
          </Button>
        </Outro>
      </form>
    </Layout>
  );
};

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 100px;
  padding: 0 20px;
`;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(userAction.getMyInfoRequest());
    context.store.dispatch(homeAction.getHomeRequest(context.params.id));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default connect((state) => state)(editHomePage);
