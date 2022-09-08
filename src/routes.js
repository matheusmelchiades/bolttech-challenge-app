import {
  BrowserRouter,
  Routes as SwitchRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export default function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SwitchRoutes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </SwitchRoutes>
      </AuthProvider>
    </BrowserRouter>
  );
}
