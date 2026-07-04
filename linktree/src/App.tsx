import {createBrowserRouter} from 'react-router-dom'

import Home from './pages/Home/index.tsx'
import Login from './pages/Login/index.tsx'
import Admin from './pages/Admin/index.tsx'
import Networks from './pages/Networks/index.tsx'

import Private from './routes/Private.tsx'
import ErrorPage from './pages/Error/index.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Private><Admin /></Private>,
  },
  {
    path: '/admin/social',
    element: <Private><Networks /></Private>,
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
])