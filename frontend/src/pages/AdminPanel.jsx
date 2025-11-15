import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/api"

export default function AdminPanel(){
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState("background")
  const [bg, setBg] = useState(null)
  const [file, setFile] = useState(null)
  const [products, setProducts] = useState([])
  const [branches, setBranches] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  
  // Form states
  const [productForm, setProductForm] = useState({ title: "", description: "", specs: "", image: "", price: "" })
  const [branchForm, setBranchForm] = useState({ city: "", state: "", country: "", address: "", phone: "", mapUrl: "" })

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("vtech_user") || "{}")
    if(user.role !== "admin"){
      nav("/")
      return
    }
    loadData()
  },[])

  async function loadData(){
    try{
      const [bgRes, productsRes, branchesRes, contactsRes] = await Promise.all([
        API.get("/admin/background"),
        API.get("/admin/products"),
        API.get("/admin/branches"),
        API.get("/admin/contacts")
      ])
      setBg(bgRes.data.url)
      setProducts(productsRes.data)
      setBranches(branchesRes.data)
      setContacts(contactsRes.data)
    }catch(err){
      if(err.response?.status === 401){
        alert("Session expired. Please login again.")
        localStorage.clear()
        nav("/")
      }
    }
  }

  async function uploadBackground(e){
    e.preventDefault()
    if(!file) return alert("Select an image file")
    setLoading(true)
    try{
      const fd = new FormData()
      fd.append("image", file)
      const res = await API.post("/admin/background", fd, { headers: { "Content-Type": "multipart/form-data" } })
      setBg(res.data.url)
      alert("Background updated successfully")
      setFile(null)
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }finally{
      setLoading(false)
    }
  }

  async function saveProduct(e){
    e.preventDefault()
    setLoading(true)
    try{
      if(editing){
        await API.put(`/admin/products/${editing}`, productForm)
        alert("Product updated")
      }else{
        await API.post("/admin/products", productForm)
        alert("Product created")
      }
      setProductForm({ title: "", description: "", specs: "", image: "", price: "" })
      setEditing(null)
      loadData()
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }finally{
      setLoading(false)
    }
  }

  async function deleteProduct(id){
    if(!confirm("Delete this product?")) return
    try{
      await API.delete(`/admin/products/${id}`)
      loadData()
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }
  }

  function editProduct(p){
    setEditing(p._id)
    setProductForm({ title: p.title || "", description: p.description || "", specs: p.specs || "", image: p.image || "", price: p.price || "" })
  }

  async function saveBranch(e){
    e.preventDefault()
    setLoading(true)
    try{
      if(editing){
        await API.put(`/admin/branches/${editing}`, branchForm)
        alert("Branch updated")
      }else{
        await API.post("/admin/branches", branchForm)
        alert("Branch created")
      }
      setBranchForm({ city: "", state: "", country: "", address: "", phone: "", mapUrl: "" })
      setEditing(null)
      loadData()
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }finally{
      setLoading(false)
    }
  }

  async function deleteBranch(id){
    if(!confirm("Delete this branch?")) return
    try{
      await API.delete(`/admin/branches/${id}`)
      loadData()
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }
  }

  function generateMapUrl(city, state, country, address){
    const parts = [address, city, state, country].filter(Boolean)
    const query = encodeURIComponent(parts.join(", "))
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  }

  function handleBranchFieldChange(field, value){
    const updated = { ...branchForm, [field]: value }
    setBranchForm(updated)
    
    // Auto-generate map URL when location fields change
    if(field === "city" || field === "state" || field === "country" || field === "address"){
      if(updated.city || updated.state || updated.country || updated.address){
        const mapUrl = generateMapUrl(updated.city, updated.state, updated.country, updated.address)
        setBranchForm({ ...updated, mapUrl })
      }
    }
  }

  function editBranch(b){
    setEditing(b._id)
    setBranchForm({ 
      city: b.city || "", 
      state: b.state || "", 
      country: b.country || "", 
      address: b.address || "", 
      phone: b.phone || "", 
      mapUrl: b.mapUrl || "" 
    })
  }

  async function deleteContact(id){
    if(!confirm("Delete this message?")) return
    try{
      await API.delete(`/admin/contacts/${id}`)
      loadData()
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }
  }

  function logout(){
    localStorage.clear()
    nav("/")
  }

  const tabs = [
    { id: "background", label: "Background" },
    { id: "products", label: "Products" },
    { id: "branches", label: "Branches" },
    { id: "contacts", label: "Messages" }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={()=>{ setActiveTab(tab.id); setEditing(null) }}
              className={`px-4 py-2 font-medium transition ${activeTab === tab.id ? "border-b-2 border-indigo-600 text-indigo-600" : "text-slate-600 hover:text-slate-900"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "background" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Landing Page Background</h2>
            {bg && <img src={bg} alt="Current background" className="h-48 w-full object-cover rounded-lg mb-4" />}
            <form onSubmit={uploadBackground} className="space-y-4">
              <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} className="w-full" />
              <button disabled={loading} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                {loading ? "Uploading..." : "Upload Background"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{editing ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={saveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Product Title" value={productForm.title} onChange={e=>setProductForm({...productForm, title: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Image URL" value={productForm.image} onChange={e=>setProductForm({...productForm, image: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Price" type="number" value={productForm.price} onChange={e=>setProductForm({...productForm, price: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Specifications" value={productForm.specs} onChange={e=>setProductForm({...productForm, specs: e.target.value})} className="p-2 border rounded" />
                <textarea placeholder="Description" value={productForm.description} onChange={e=>setProductForm({...productForm, description: e.target.value})} className="p-2 border rounded md:col-span-2" rows="3" />
                <div className="md:col-span-2 flex gap-2">
                  <button disabled={loading} type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    {loading ? "Saving..." : editing ? "Update" : "Create"}
                  </button>
                  {editing && <button type="button" onClick={()=>{ setEditing(null); setProductForm({ title: "", description: "", specs: "", image: "", price: "" }) }} className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400">Cancel</button>}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">All Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(p => (
                  <div key={p._id} className="border rounded-lg p-4">
                    {p.image && <img src={p.image} alt={p.title} className="h-32 w-full object-cover rounded mb-2" />}
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-slate-600">{p.specs}</p>
                    <p className="text-indigo-600 font-semibold mt-2">₹{p.price}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>editProduct(p)} className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Edit</button>
                      <button onClick={()=>deleteProduct(p._id)} className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && <p className="text-slate-500">No products yet</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "branches" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{editing ? "Edit Branch" : "Add New Branch"}</h2>
              <form onSubmit={saveBranch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="City" value={branchForm.city} onChange={e=>handleBranchFieldChange("city", e.target.value)} className="p-2 border rounded" required />
                <input placeholder="State" value={branchForm.state} onChange={e=>handleBranchFieldChange("state", e.target.value)} className="p-2 border rounded" />
                <input placeholder="Country" value={branchForm.country} onChange={e=>handleBranchFieldChange("country", e.target.value)} className="p-2 border rounded" />
                <input placeholder="Phone" value={branchForm.phone} onChange={e=>handleBranchFieldChange("phone", e.target.value)} className="p-2 border rounded" required />
                <input placeholder="Street Address" value={branchForm.address} onChange={e=>handleBranchFieldChange("address", e.target.value)} className="p-2 border rounded md:col-span-2" required />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Map URL (Auto-generated)</label>
                  <input value={branchForm.mapUrl} onChange={e=>setBranchForm({...branchForm, mapUrl: e.target.value})} className="p-2 border rounded w-full" readOnly />
                  <p className="text-xs text-slate-500 mt-1">Map URL is automatically generated from address, city, state, and country</p>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button disabled={loading} type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    {loading ? "Saving..." : editing ? "Update" : "Create"}
                  </button>
                  {editing && <button type="button" onClick={()=>{ setEditing(null); setBranchForm({ city: "", state: "", country: "", address: "", phone: "", mapUrl: "" }) }} className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400">Cancel</button>}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">All Branches</h2>
              <div className="space-y-3">
                {branches.map(b => (
                  <div key={b._id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg">{b.city}</h3>
                    <p className="text-slate-600">{b.address}</p>
                    <p className="text-slate-600">Phone: {b.phone}</p>
                    {b.mapUrl && <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Map</a>}
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>editBranch(b)} className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Edit</button>
                      <button onClick={()=>deleteBranch(b._id)} className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                ))}
                {branches.length === 0 && <p className="text-slate-500">No branches yet</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>
            <div className="space-y-3">
              {contacts.map(c => (
                <div key={c._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-slate-600">{c.email}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                    <button onClick={()=>deleteContact(c._id)} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Delete</button>
                  </div>
                  <p className="mt-2 text-slate-700">{c.message}</p>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-slate-500">No messages yet</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

