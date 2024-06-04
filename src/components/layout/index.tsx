import React, { useEffect } from 'react';
import { Container } from '../container';
import { NavBar } from '../nav-bar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectCurrent } from '../../features/user/userSlice';
import { Profile } from '../profile';
import { Header } from '../header';

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const current = useSelector(selectCurrent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{current && <Profile />}</div>
        </div>
      </Container>
    </>
  );
};