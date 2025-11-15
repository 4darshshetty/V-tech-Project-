import React from 'react'
export default function Loader(){
  return (
    <div className="flex items-center justify-center h-24">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
    </div>
  )
}
