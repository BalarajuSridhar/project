import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardHome from '../../components/Dashboard/DashboardHome';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    </ProtectedRoute>
  );
}