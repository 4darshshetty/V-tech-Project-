import React from "react"
export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>&copy; 2025 VTECH. All rights reserved.</div>
          <div className="space-x-3">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
