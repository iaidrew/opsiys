"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
  pricing: string;
}

export default function ToolsPage() {

  const [tools,setTools] = useState<Tool[]>([]);
  const [filtered,setFiltered] = useState<Tool[]>([]);

  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [pricing,setPricing] = useState("All");

  const categories = [
    "All",
    "Design",
    "Writing",
    "Marketing",
    "Productivity",
    "Coding",
    "Video",
    "Research"
  ];

  const pricingTypes = ["All","free","freemium","paid"];


  /* LOAD TOOLS */

  useEffect(()=>{

    const loadTools = async()=>{

      const snap = await getDocs(collection(db,"aiTools"));

      const list:any=[];

      snap.forEach((doc)=>{
        list.push({
          id:doc.id,
          ...doc.data()
        });
      });

      setTools(list);
      setFiltered(list);
    };

    loadTools();

  },[]);



  /* FILTER + SEARCH */

  useEffect(()=>{

    let results = tools;

    if(search){
      results = results.filter(tool =>
        tool.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if(category !== "All"){
      results = results.filter(tool => tool.category === category);
    }

    if(pricing !== "All"){
      results = results.filter(tool => tool.pricing === pricing);
    }

    setFiltered(results);

  },[search,category,pricing,tools]);



  return(

  <section className="px-6 pb-24 pt-10">

  <div className="max-w-7xl mx-auto">


  {/* HERO */}

  <div className="mb-16">

  <div className="flex items-center justify-between flex-wrap gap-6">

  <div>

  <h1 className="text-5xl md:text-6xl font-black mb-4">
  AI Tools <span className="text-red-500">Marketplace</span>
  </h1>

  <p className="text-gray-400 max-w-xl">
  Discover powerful AI tools for founders, creators and builders.
  Search, filter and explore the fastest growing AI ecosystem.
  </p>

  </div>


  <Link
  href="/submit-tool"
  className="bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-xl font-semibold"
  >
  Submit Tool
  </Link>

  </div>

  </div>



  {/* SEARCH BAR */}

  <div className="mb-10">

  <input
  placeholder="Search AI tools..."
  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-6 py-4 text-lg focus:border-red-500 outline-none"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  />

  </div>



  {/* FILTER BAR */}

  <div className="flex flex-wrap gap-4 mb-14">

  <select
  value={category}
  onChange={(e)=>setCategory(e.target.value)}
  className="bg-zinc-900 border border-white/10 px-4 py-3 rounded-lg"
  >
  {categories.map(c => (
  <option key={c}>{c}</option>
  ))}
  </select>


  <select
  value={pricing}
  onChange={(e)=>setPricing(e.target.value)}
  className="bg-zinc-900 border border-white/10 px-4 py-3 rounded-lg"
  >
  {pricingTypes.map(p => (
  <option key={p}>{p}</option>
  ))}
  </select>

  </div>



  {/* TOOLS GRID */}

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {filtered.map(tool => (

  <div
  key={tool.id}
  className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition hover:-translate-y-1"
  >

  <h3 className="text-xl font-semibold mb-3">
  {tool.name}
  </h3>

  <p className="text-gray-400 mb-5">
  {tool.description}
  </p>

  <div className="flex justify-between text-sm text-gray-500 mb-4">

  <span className="bg-white/5 px-3 py-1 rounded-lg">
  {tool.category}
  </span>

  <span>
  {tool.pricing}
  </span>

  </div>


  <a
  href={tool.website}
  target="_blank"
  className="text-red-500 hover:underline"
  >
  Visit Tool →
  </a>

  </div>

  ))}

  </div>


  </div>
  </section>

  );
}