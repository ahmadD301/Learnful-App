import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { useState } from 'react'
import { GoogleSignInButton } from '../components/login/GoogleSignInButton.jsx'
import EmailInput from '../components/login/EmailInput.jsx'
import { PasswordInput } from '../components/login/PasswordInput.jsx'
import { RememberMe } from '../components/login/RememberMe.jsx'
import { Divider } from '../components/login/Divider.jsx'
import { SubmitButton } from '../components/login/SubmitButton.jsx'
import AuthLink from '../components/login/AuthLink.jsx'

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const rememberEmail = localStorage.getItem("rememberEmail");
    if (rememberEmail) {
      setEmail(rememberEmail)
      setRememberMe(true)
    }
  }, []);

  const handleSubmit = (e) => {

  }
  const handleGoogleSignIn = () => { }

  return (


    <div className="flex items-center justify-center min-h-screen">
      <div className="card card-bordered max-w-md w-full shadow-md">
        <div className="card-body">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={shake ? "animate-shake" : ""}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <EmailInput email={email} setEmail={setEmail} isLoading={isLoading} />
              <PasswordInput password={password} setPassword={setPassword} isLoading={isLoading} />
              <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} isLoading={isLoading} />
              <SubmitButton isLoading={isLoading} >Sign in</SubmitButton>
              <Divider />
              <GoogleSignInButton onClick={handleGoogleSignIn} isLoading={isLoading} />
              <AuthLink
                question="Don't have an account?"
                linkText="Sign up"
                href="/signup"
                className="mt-4"
              />
            </form>
          </motion.div>
        </div>
      </div>

    </div>



  )
}

export default LoginForm