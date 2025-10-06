
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";  
import LoginForm from "./pages/LoginForm";

import StepIndicator from "./components/signUp/StepIndicator";
import NavigationButtons from "./components/signUp/NavigationButtons";

function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
    </>
  )
}

export default App
