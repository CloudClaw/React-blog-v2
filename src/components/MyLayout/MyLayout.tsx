import React from 'react';
import { Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/Slices/Auth/authSlice';
import { useAppSelector } from '../../redux/store';
import { ContentHeader } from '../ContentHeader/ContentHeader';

type Props = {};

export const MyLayout: React.FC = (props: Props) => {
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <>
      {isLoggedIn ?<ContentHeader /> : ''}
      <Outlet />
    </>
  );
};
