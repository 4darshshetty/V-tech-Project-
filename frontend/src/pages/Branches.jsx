import React, { useEffect, useState } from 'react'
import API from '../utils/api'

export default function Branches(){
  const [list,setList] = useState([]);
  useEffect(()=>{ API.get('/branches').then(r=> setList(r.data)).catch(()=>{}); },[]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Branches</h1>
      <div className="space-y-4">
        {list.map(b=> (
          <div key={b._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-xl mb-2">{b.city}{b.state ? `, ${b.state}` : ''}{b.country ? `, ${b.country}` : ''}</h3>
            <div className="text-slate-600 mb-2">{b.address}</div>
            <div className="text-slate-600 mb-3">Phone: {b.phone}</div>
            {b.mapUrl && (
              <a 
                href={b.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                View on Map
              </a>
            )}
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No branches available yet.
          </div>
        )}
      </div>
    </div>
  )
}
