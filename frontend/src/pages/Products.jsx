import React, { useEffect, useState } from "react"
import API from "../utils/api"

export default function Products(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ API.get("/products").then(r=> setProducts(r.data)).catch(()=>{}) },[])

  return (
    <section id="products" className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p=> (
          <div key={p._id} className="border border-slate-100 bg-white/80 rounded-2xl p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <img src={p.image} alt="" className="h-36 w-full rounded-xl object-cover mb-3" />
            <h3 className="font-semibold text-slate-900">{p.title}</h3>
            <p className="text-sm text-slate-500">{p.specs}</p>
            <div className="mt-3 text-lg font-semibold text-indigo-600">{"\u20B9"}{p.price}</div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="md:col-span-3 rounded-2xl border border-dashed border-white/40 bg-white/30 p-10 text-center text-slate-500">
            Product catalogue coming soon.
          </div>
        )}
      </div>
    </section>
  )
}
