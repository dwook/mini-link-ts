import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { linkAction } from '../../feature/Link/slice';
import Layout from '../../src/components/Layout';
import ImageUploadArea from '../../src/components/ImageUploadArea';
import SwitchInput from '../../src/components/Switch';
import Button from '../../src/components/Button';
import { Row, Input, Label, Message, Error } from '../../src/components/Input';
import { Cross } from '../../src/icons';

const createLinkPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { createLinkDone } = useSelector((state) => state.link);
  const { register, handleSubmit, watch, errors } = useForm();
  const watchPublic = watch('public', false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('name', data.name);
    formData.append('url', data.url);
    formData.append('public', data.public);
    dispatch(linkAction.createLinkRequest(formData));
  };
  const goAdmin = () => router.push('/admin');

  useEffect(() => {
    if (createLinkDone) {
      router.push('/admin');
    }
  }, [createLinkDone]);
  useEffect(() => {
    dispatch(linkAction.createLinkReset());
  }, []);

  return (
    <Layout title="링크 추가하기" icon={<Cross />} onClick={goAdmin}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <ImageUploadArea name="image" ref={register} />
        <Row>
          <Label>링크 이름</Label>
          <Input
            name="name"
            ref={register({
              required: '링크를 나타낼 수 있는 이름을 입력해주세요.',
            })}
          />
          <Message>
            <Error>{errors.name?.message}</Error>
          </Message>
        </Row>
        <Row>
          <Label>링크 주소</Label>
          <Input
            name="url"
            inputmode="url"
            ref={register({
              required: '연결하고 싶은 링크 주소를 입력해주세요.',
              pattern: {
                value: /^(http|https):\/\//,
                message: 'http:// 또는 https://로 시작하는 URL을 입력해주세요.',
              },
            })}
          />
          <Message>
            <Error>{errors.url?.message}</Error>
          </Message>
        </Row>
        <Row>
          <Label>링크 공개여부</Label>
          <SwitchContainer>
            <span>{watchPublic === true ? '공개' : '비공개'}</span>
            <SwitchInput name="public" ref={register} />
          </SwitchContainer>
          <Message>
            <Error>{errors.public?.message}</Error>
          </Message>
        </Row>
        <Outro>
          <Button primary big type="submit">
            링크 추가
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

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.color.primary};
  }
`;

export default createLinkPage;
