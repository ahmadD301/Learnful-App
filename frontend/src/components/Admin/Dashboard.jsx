import React from "react";
import { BookOpen, User, FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function Dashboard() {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Manage Courses",
            description: "Create, edit, and organize your courses",
            icon: BookOpen,
            route: "/admin/courses",
        },
        {
            title: "Manage Users",
            description: "View and manage student accounts",
            icon: User,
            route: "/admin/users",
        },
        {
            title: "Manage Quizzes",
            description: "Create and edit quiz questions",
            icon: FileText,
            route: "/admin/quizzes",
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-base-content">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {actions.map((action, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.15, // staggered delay for each card
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 },
                        }}
                        onClick={() => navigate(action.route)}
                        className="relative overflow-hidden bg-base-100 border border-base-300 rounded-xl shadow-md cursor-pointer p-6"
                    >
                        <div>
                            <div className="flex items-center mb-4">
                                <action.icon className="h-6 w-6 text-primary mr-3" />
                                <h3 className="text-lg font-semibold text-base-content">
                                    {action.title}
                                </h3>
                            </div>
                            <p className="text-sm text-base-content/70 mb-4">{action.description}</p>
                            <div className="self-end text-primary">
                                <span className="text-xl">→</span>
                            </div>
                            {/* Animated gradient overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 rounded-xl"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
