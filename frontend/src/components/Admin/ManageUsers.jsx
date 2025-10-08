import React from 'react'
import Sidebar from './Sidebar'
function ManageUsers() {
    return (
    <div className="flex min-h-screen bg-base-200">

      <Sidebar />
      <div className="flex-1 p-6">
      <div>manage Users</div>
      </div>
    </div>
  )
}

export default ManageUsers