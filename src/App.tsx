import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './Layout';
import type { JSX, ReactNode } from 'react';
import { WSProvider } from './ws';

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('authorization');
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <WSProvider>
                  <Layout />
                </WSProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
