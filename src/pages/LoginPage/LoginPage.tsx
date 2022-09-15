import React from 'react';

import styles from './LoginPage.module.scss';

import { Button, Form, Input, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logIn } from '../../redux/Slices/Auth/authSlice';
import { fetchUser, selectStatus, selectUserData } from '../../redux/Slices/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { MyRoutes } from '../../constants';

const { Title } = Typography;

type LoginValues = {
  username: string;
};

export const LoginPage: React.FC = () => {
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish =
    () =>
    async ({ username }: LoginValues) => {
      const isUserFound = await dispatch(fetchUser(username)).unwrap();
      if (!isUserFound) {
         alert('Данного пользователя не существует');
      } else {
         dispatch(logIn());
         localStorage.setItem('userData', JSON.stringify(isUserFound));
         navigate(MyRoutes.Content);
      }
    };

  return (
    <Form
      className={styles.rootForm}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ username: '', password: '' }}
      onFinish={onFinish()}
      autoComplete="off">
      <Title className={styles.title}>Авторизация</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={status === 'pending'} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
