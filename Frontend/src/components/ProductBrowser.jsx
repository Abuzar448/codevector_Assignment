import React, { useState, useEffect } from 'react';

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Sports",
  "Beauty",
  "Automotive",
];

export default function ProductBrowser() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/api/product/getProducts";

  const fetchProducts = async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_BASE_URL}?limit=12`;
      
      if (category !== "All") {
        url += `&category=${category}`;
      }
      
      if (isLoadMore && cursor) {
        url += `&cursor=${cursor}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data from server");
      
      const resData = await response.json();

      if (resData.success) {
        if (isLoadMore) {
          setProducts((prev) => [...prev, ...resData.data]);
        } else {
          setProducts(resData.data);
        }

        setCursor(resData.pagination.nextCursor);
        setHasNextPage(resData.pagination.hasNextPage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCursor(null);
    setHasNextPage(false);
    fetchProducts(false);
  }, [category]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 antialiased font-sans p-6 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Sleek Header Section */}
        <header className="mb-12 border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Core Architecture Test</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mt-1 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              SCALESTREAM ENGINE
            </h1>
            <p className="text-neutral-500 text-sm mt-1.5 font-mono">
              Crawling ~200,000 deep-seeded database entries via high-speed cursors
            </p>
          </div>
          
          {/* Custom Custom Styled Premium Dropdown */}
          <div className="flex items-center gap-4 bg-[#121212] border border-neutral-800/80 rounded-xl px-4 py-2.5 shadow-2xl">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">Filter Cluster</label>
            <div className="h-4 w-[1px] bg-neutral-800"></div>
            <select
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer pr-2 hover:text-purple-400 transition-colors duration-150"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#121212] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Cyberpunk Style Error Handle */}
        {error && (
          <div className="bg-red-950/20 border border-red-900/50 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3 text-sm font-mono shadow-2xl">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>SYSTEM FAILURE: {error}. Check backend port binding.</span>
          </div>
        )}

        {/* Modern Cyberpunk / Minimal Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group relative bg-[#121212] border border-neutral-900 rounded-2xl p-6 hover:border-neutral-700/60 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1"
            >
              {/* Card Accent Top Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-purple-400 px-2.5 py-1 bg-purple-950/30 border border-purple-900/30 rounded-md">
                    {product.category}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    ID: {product._id.slice(-6)}
                  </span>
                </div>
                <h3 className="text-md font-medium text-neutral-200 mt-4 line-clamp-2 group-hover:text-white transition-colors duration-200">
                  {product.name}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-900/80 flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Price Node</p>
                  <span className="text-xl font-mono font-bold text-emerald-400 tracking-tight">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Timestamp</p>
                  <span className="text-xs font-mono text-neutral-400">
                    {new Date(product.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-32 border border-dashed border-neutral-900 rounded-2xl bg-[#0E0E0E]">
            <p className="font-mono text-sm text-neutral-500">NULL MATRIX: No product vectors aligned with '{category}'</p>
          </div>
        )}

        {/* Premium Loading and Interaction Bar */}
        <footer className="mt-16 text-center pb-16">
          {loading && (
            <div className="inline-flex items-center gap-3 font-mono text-xs tracking-wider text-purple-400 bg-purple-950/10 border border-purple-900/30 px-5 py-3 rounded-xl shadow-xl">
              <svg className="animate-spin h-4 w-4 text-purple-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              EXECUTING MONGOOSE CURSOR FETCH...
            </div>
          )}

          {!loading && hasNextPage && (
            <button
              onClick={() => fetchProducts(true)}
              className="relative group overflow-hidden bg-white text-black font-mono font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-xl transition-all shadow-2xl active:scale-[0.98] hover:bg-neutral-200 cursor-pointer"
            >
              Stream Next Block
            </button>
          )}

          {!loading && !hasNextPage && products.length > 0 && (
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-500 bg-neutral-900/30 border border-neutral-900 px-5 py-3 rounded-xl">
              <span>✓ LAYER ARCHIVE FULLY RENDERED • END OF RAW DATA VECTORS</span>
            </div>
          )}
        </footer>

      </div>
    </div>
  );
}