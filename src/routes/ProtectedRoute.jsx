import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
  const user = JSON.parse(localStorage.getItem("user"))

  return user ? <Outlet /> : <Navigate to="/login" />
}

// export default function ProtectedRoute() {
//   return <h1>PROTECTED ROUTE NYALA</h1>
// }