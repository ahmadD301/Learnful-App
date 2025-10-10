import React from 'react'
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { NameInput } from '../components/signUp/NameInput.jsx'
import { useState } from 'react'
import EmailInput from '../components/login/EmailInput.jsx'
import { PasswordInput } from '../components/login/PasswordInput.jsx'
import { SubmitButton } from '../components/login/SubmitButton.jsx'
import toast from 'react-hot-toast'
import Institution from '../components/signUp/Institution.jsx'
import SpecializationSelect from "../components/signUp/SpecializationSelect.jsx"
import AuthLink from '../components/login/AuthLink.jsx'

function TeacherSignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const specializations = [
        "Software Engineering",
        "Data Structures",
        "Algorithms",
        "Web Development",
        "Mobile Development",
        "Machine Learning",
        "Artificial Intelligence",
        "Database Systems",
        "Computer Networks",
        "Cybersecurity",
        "Cloud Computing",
        "DevOps",
    ]
    const handleSubmit = () => {

    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card card-bordered max-w-2xl w-full shadow-md">
                <div className="card-body">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}

                    >
                        {/* Logo and Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                                <GraduationCap className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learnful Instructor Portal</h1>
                            <p className="text-gray-600 text-sm">
                                Join as an Instructor and start publishing your interactive courses.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className='flex justify-center gap-6'>
                                <NameInput
                                //   name={formData.name}
                                //   setName={(value) => handleInputChange('name', value)}
                                //   isLoading={isLoading}
                                />
                                <EmailInput
                                //   email={formData.email}
                                //   setEmail={(value) => handleInputChange('email', value)}
                                //   isLoading={isLoading}
                                />
                            </div>
                            <div className='flex justify-center gap-6'>
                                <PasswordInput
                                //   password={formData.password}
                                //   setPassword={(value) => handleInputChange('password', value)}
                                //   isLoading={isLoading}
                                //   label="Password"
                                />

                                <PasswordInput
                                //   password={formData.confirmPassword}
                                //   setPassword={(value) => handleInputChange('confirmPassword', value)}
                                //   isLoading={isLoading}
                                //   label="Confirm Password"
                                //   placeholder="Confirm your password"
                                />
                            </div>

                            <Institution formData={formData} setFormData={setFormData} />

                            <SpecializationSelect
                                formData={formData}
                                setFormData={setFormData}
                                specializations={specializations}
                            />
                            <SubmitButton isLoading={isLoading} >Sign in</SubmitButton>

                            <AuthLink
                                question="Already have an account?"
                                linkText="Login"
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

export default TeacherSignUp