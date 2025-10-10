import React from 'react'
import { motion } from "framer-motion"

function TeacherSignUp() {
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

                            </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default TeacherSignUp