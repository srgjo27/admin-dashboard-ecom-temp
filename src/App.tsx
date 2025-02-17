import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import ManagementUserPage from './pages/user/ManagementUserPage'
import ProtectedRoute from './ProtectedRoute'
import Layout from './pages/Layout'
import ProductPage from './pages/product/ProductPage'
import ApiDocsPage from './pages/api/_docs-api'
import CategoryPage from './pages/product/CategoryPage'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute><Layout children={<DashboardPage />} /></ProtectedRoute>}
          />
          <Route
            path="/admin/management-user"
            element={<ProtectedRoute><Layout children={<ManagementUserPage />} /></ProtectedRoute>}
          />
          <Route
            path='/admin/categories'
            element={<ProtectedRoute><Layout children={<CategoryPage />} /></ProtectedRoute>}
          />
          <Route
            path='/admin/products'
            element={<ProtectedRoute><Layout children={<ProductPage />} /></ProtectedRoute>}
          />
          <Route
            path='/admin/docs-api'
            element={<ProtectedRoute><Layout children={<ApiDocsPage />} /></ProtectedRoute>}
          />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
