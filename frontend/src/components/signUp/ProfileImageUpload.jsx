// components/ProfileImageUpload.jsx
"use client"

import { motion } from "framer-motion"

export function ProfileImageUpload({ 
  imagePreview, 
  handleImageChange, 
  removeImage, 
  isLoading 
}) {
  return (
    <div className="space-y-2">
      <label className="label">
        <span className="label-text font-semibold">Profile Image (Optional)</span>
      </label>
      <div className="flex items-center gap-4">
        {imagePreview ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="relative"
          >
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-base-300"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-error text-error-content rounded-full p-1 hover:scale-110 transition-transform"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
          <label
            htmlFor="profileImage"
            className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium hover:bg-base-200 transition-colors"
          >
            {imagePreview ? "Change Image" : "Upload Image"}
          </label>
          <p className="text-xs text-base-content/60 mt-2">Max size: 5MB</p>
        </div>
      </div>
    </div>
  )
}