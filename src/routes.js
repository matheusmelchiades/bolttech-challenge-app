import {
  BrowserRouter,
  Routes as SwitchRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/login';

export default function Routes() {
  return (
    <BrowserRouter>
      <SwitchRoutes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </SwitchRoutes>
    </BrowserRouter>
  );
}
