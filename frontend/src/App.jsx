
import { Route, Routes } from "react-router";
import SignUpForm from "./pages/SignUpForm";  
import LoginForm from "./pages/LoginForm";
import AdminForm from "./pages/AdminForm";
function App() {

  return (
    <>
    <Routes>
      <Route path="/admin" element={<AdminForm />} />
      <Route path="/admin/courses" element={<AdminForm />} />
      <Route path="/admin/users" element={<AdminForm />} />
      <Route path="/admin/quizzes" element={<AdminForm />} />
      
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
    </>
  )
}

export default App
