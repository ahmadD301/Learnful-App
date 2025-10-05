import React, { useEffect } from 'react'
import { useState } from 'react'
import GoogleSignInButton from '../components/login/GoogleSignInButton'
import EmailInput from '../components/login/EmailInput'
import { PasswordInput } from '../components/login/PasswordInput'
import RememberMe from '../components/login/RememberMe'
import Divider from '../components/login/Divider'
import SubmitButton from '../components/login/SubmitButton'

function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const rememberEmail = localStorage.getItem("rememberEmail")
    if (rememberEmail) {
      setEmail(rememberEmail)
      setRememberMe(true)
    }
  }, [])



  return (
    <div>
      <GoogleSignInButton onClick={() => {}} isLoading={isLoading} />
        <EmailInput email={email} setEmail={setEmail} isLoading={isLoading} />
        <PasswordInput password={password} setPassword={setPassword} isLoading={isLoading} />
        <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} isLoading={isLoading} />
        <Divider text="or" />
        <SubmitButton isLoading={isLoading} >Sign in</SubmitButton>
        {error && <p className={`text-red-500 mt-2 ${shake ? 'animate-shake' : ''}`}>{error}</p>}
    </div>
  )
}

export default LoginForm