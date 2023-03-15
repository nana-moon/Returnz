import './index.css';
import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import reportWebVitals from './reportWebVitals';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import WaitingPage from './pages/WaitingPage';
import ProfilePage from './pages/ProfilePage';
import SignPage from './pages/SignPage';
import GamePage from './pages/GamePage';
import TutorialPage from './pages/TutorialPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      // 게임
      { path: '/waiting', element: <WaitingPage /> },
      { path: '/tutorial', element: <TutorialPage /> },
      { path: '/game', element: <GamePage /> },
      // 회원
      { path: '/signup', element: <SignPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
