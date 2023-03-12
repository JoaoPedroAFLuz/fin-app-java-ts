import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';

import { User } from './pages/User';

export function Router() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/user" element={<User />} />
      </Route>

      <Route path="*" element={<Navigate to="/user" />} />
    </Routes>
  );
}
