import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Account } from './pages/Account';
import { Transaction } from './pages/Transaction';

import { User } from './pages/User';

export function Router() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/user" element={<User />} />
        <Route path="/account" element={<Account />} />
        <Route path="/transaction" element={<Transaction />} />
      </Route>

      <Route path="*" element={<Navigate to="/user" />} />
    </Routes>
  );
}
