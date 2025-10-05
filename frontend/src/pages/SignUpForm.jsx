import React from 'react'
import { motion } from "framer-motion"
import { ProfileImageUpload } from '../components/signUp/ProfileImageUpload'
import { NameInput } from '../components/signUp/NameInput.jsx'
import EmailInput from '../components/login/EmailInput.jsx'
import { PasswordInput } from '../components/login/PasswordInput.jsx'
import { SubmitButton } from '../components/login/SubmitButton.jsx'
import { Divider } from '../components/login/Divider.jsx'
import { GoogleSignInButton } from '../components/login/GoogleSignInButton.jsx'
import { useState } from 'react'
import AuthLink from '../components/login/AuthLink.jsx'

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);


  const handleSubmit = async (e) => {

  }
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
              <ProfileImageUpload
              // imagePreview={imagePreview} 
              // handleImageChange={(e) => {}}
              // removeImage={() => {}}
              // isLoading={isLoading}
              />

              <NameInput
              // name={formData.name}
              // setName={(value) => handleInputChange("name", value)}
              // isLoading={isLoading}
              />

              <EmailInput
              // email={formData.email}
              // setEmail={(value) => handleInputChange("email", value)}
              // isLoading={isLoading}
              />

              <PasswordInput
              // password={formData.password}
              // setPassword={(value) => handleInputChange('password', value)}
              // isLoading={isLoading}
              // label="Password"
              />

              <PasswordInput
              // password={formData.confirmPassword}
              // setPassword={(value) => handleInputChange('confirmPassword', value)}
              // isLoading={isLoading}
              // label="Confirm Password"
              // placeholder="Confirm your password"
              />

              <SubmitButton isLoading={isLoading}>
                Create account
              </SubmitButton>

              <Divider />

              <GoogleSignInButton
              // onClick={handleGoogleSignUp} 
              // isLoading={isLoading}
              />
              <AuthLink 
                question="Already have an account?"
                linkText="Sign in"
                href="/login"
                className="mt-4"
              />
            </form>
            </motion.div>

          </div>
        </div>
      </div>

    
  )
}

export default SignUp