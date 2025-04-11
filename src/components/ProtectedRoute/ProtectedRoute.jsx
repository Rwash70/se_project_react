import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/' replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
