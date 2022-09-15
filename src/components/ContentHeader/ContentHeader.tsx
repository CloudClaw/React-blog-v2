import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './ContentHeader.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logOut } from '../../redux/Slices/Auth/authSlice';
import { selectUserData } from '../../redux/Slices/User/userSlice';

const { Header } = Layout;

export const ContentHeader: React.FC = () => {
  const userData = useAppSelector(selectUserData);

  const dispatch = useAppDispatch();
  const exitFunc = () => {
    dispatch(logOut());
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item>
            <NavLink to="/content">Домашняя страница</NavLink>
          </Menu.Item>
          <Menu.Item><NavLink to="/favourite">Избранное</NavLink></Menu.Item>
          <Menu.Item><NavLink to="/profile">Профиль</NavLink></Menu.Item>
          <Menu.Item>
            Добрый день,&nbsp;<span className={styles.name}>{userData?.name}</span>
          </Menu.Item>
          <Menu.Item onClick={exitFunc} className={styles.exitBtn}>Выход</Menu.Item>
      </Menu>
    </Header>
  );
};
