"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../components/courseBrowse/Header.jsx"
import SearchFilters from "../components/courseBrowse/SearchFilters.jsx"
import CourseCard from "../components/courseBrowse/CourseCard.jsx"

export default function BrowseCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [enrolledCourses, setEnrolledCourses] = useState([1, 2, 3, 4])

  const allCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn HTML, CSS, and JavaScript to build modern websites.",
      thumbnail: "/web-development-course.png",
      instructor: "Sarah Mitchell",
      rating: 4.8,
      students: 12450,
      duration: "8 weeks",
      lessons: 12,
      difficulty: "beginner",
      category: "Web Development",
      price: "Free",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      description: "Master async programming and modern ES6+ features.",
      thumbnail: "/javascript-course.png",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 8920,
      duration: "10 weeks",
      lessons: 15,
      difficulty: "advanced",
      category: "Programming",
      price: "Free",
      tags: ["JavaScript", "ES6", "Async"],
    },
    {
      id: 3,
      title: "React Fundamentals",
      description: "Build dynamic UIs with React hooks and components.",
      thumbnail: "/react-course.png",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      students: 15230,
      duration: "6 weeks",
      lessons: 10,
      difficulty: "intermediate",
      category: "Web Development",
      price: "Free",
      tags: ["React", "Hooks", "Components"],
    },
    // ... (add others if needed)
  ]

  const categories = [
    "all",
    "Web Development",
    "Programming",
    "Data Science",
    "Design",
    "Backend",
    "Mobile Development",
  ]

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleEnroll = (id) => {
    if (enrolledCourses.includes(id)) {
      alert("You are already enrolled in this course!")
      return
    }
    setEnrolledCourses([...enrolledCourses, id])
    alert("Successfully enrolled!")
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-3">Explore Our Courses</h2>
          <p className="text-lg text-gray-600">
            Discover new skills and advance your career with our comprehensive course catalog.
          </p>
        </motion.div>

        {/* Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          categories={categories}
        />

        {/* Count */}
        <p className="text-gray-600 mt-6 mb-4">
          Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              enrolledCourses={enrolledCourses}
              handleEnroll={handleEnroll}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
