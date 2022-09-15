import React from 'react';

import 'antd/dist/antd.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { ContentPage } from '../pages/ContentPage/ContentPage';
import { useAppSelector } from '../redux/store';
import { selectIsLoggedIn } from '../redux/Slices/Auth/authSlice';
import { MyRoutes } from '../constants';
import { SinglePostPage } from '../pages/SinglePostPage/SinglePostPage';
import { MyLayout } from '../components/MyLayout/MyLayout';
import { FavoutirePage } from '../pages/FavouritePage/FavoutirePage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';


export const AppRoutes: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
		<Route path={MyRoutes.Home} element={<MyLayout/>}>
		<Route
        path={MyRoutes.Home}
        element={isLoggedIn ? <Navigate to={MyRoutes.Content} /> : <Navigate to={MyRoutes.Login} />}
      />
      <Route
        path={MyRoutes.Login}
        element={isLoggedIn ? <Navigate to={MyRoutes.Content} /> : <LoginPage />}
      />
      <Route
        path={MyRoutes.Content}
        element={isLoggedIn ? <ContentPage /> : <Navigate to={MyRoutes.Login} />}
      />
		<Route
        path={MyRoutes.Favourite}
        element={isLoggedIn ? <FavoutirePage /> : <Navigate to={MyRoutes.Login} />}
      />
		<Route
        path={MyRoutes.Profile}
        element={isLoggedIn ? <ProfilePage /> : <Navigate to={MyRoutes.Login} />}
      />
		<Route path='content/post/:postId' element={<SinglePostPage/>}/>
		<Route
        path={MyRoutes.Content+'/politic'}
        element={isLoggedIn ? <ContentPage /> : <Navigate to={MyRoutes.Login} />}
      />
		<Route
        path={MyRoutes.Content+'/history'}
        element={isLoggedIn ? <ContentPage /> : <Navigate to={MyRoutes.Login} />}
      />
		<Route
        path={MyRoutes.Content+'/music'}
        element={isLoggedIn ? <ContentPage /> : <Navigate to={MyRoutes.Login} />}
      />
		</Route>
    </Routes>
  );
};
