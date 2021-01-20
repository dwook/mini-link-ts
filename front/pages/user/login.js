import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { userAction } from '../../feature/User/slice';
import Layout from '../../src/components/Layout';
import Button from '../../src/components/Button';
import { Row, Input, Label, Message, Error } from '../../src/components/Input';
import { ArrowLeft } from '../../src/icons';

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo, logInError } = useSelector((state) => state.user);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(userAction.logInRequest(data));
  };
  const goBack = () => router.back();

  useEffect(() => {
    if (userInfo) {
      router.push('/admin');
    }
  }, [userInfo]);

  return (
    <Layout title="로그인" icon={<ArrowLeft />} onClick={goBack}>
      <Intro>
        <div className="container">
          <div className="emoji">🙋‍♀️</div>
          <div className="content">
            아직 가입하지 않으셨나요?
            <Link href="/user/signup">
              <a>무료 회원가입</a>
            </Link>
          </div>
        </div>
      </Intro>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Label>아이디</Label>
          <Input
            name="username"
            ref={register({ required: '아이디를 입력해주세요.' })}
          />
          <Message>
            <Error>{errors.username?.message}</Error>
          </Message>
        </Row>
        <Row>
          <Label>비밀번호</Label>
          <Input
            name="password"
            type="password"
            autoComplete="off"
            ref={register({ required: '비밀번호를 입력해주세요.' })}
          />
          <Message>
            <Error>{errors.password?.message}</Error>
          </Message>
        </Row>
        <Outro>
          <Message>
            <Error>{logInError}</Error>
          </Message>
          <Button primary big type="submit">
            미니링크 로그인
          </Button>
        </Outro>
      </form>
    </Layout>
  );
};

const Intro = styled.div`
  text-align: left;
  width: 100%;
  padding: 20px;
  .container {
    display: flex;
  }
  a {
    color: ${(props) => props.theme.color.primary};
    margin-top: 6px;
    font-weight: bold;
  }
  .emoji {
    font-size: 60px;
    text-align: left;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 10px;
  }
`;

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 100px;
  padding: 0 20px;
`;

export default login;
