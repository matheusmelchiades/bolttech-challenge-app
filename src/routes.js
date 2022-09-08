import {
  BrowserRouter,
  Routes as SwitchRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export default function Routes() {
  return (
    <BrowserRouter>
      <SwitchRoutes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </SwitchRoutes>
    </BrowserRouter>
  );
}
