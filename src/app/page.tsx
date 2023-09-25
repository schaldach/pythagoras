'use client'
import Image from "next/image";
import { Inter } from "next/font/google";
import Graph2D from "../../components/Graph2D";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState("");
  const [mathstr, setmathstr] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => setmathstr(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <main className={inter.className}>
      <div className="font-semibold flex gap-2 items-center justify-center text-3xl tracking-tight">
        <Image
          width={40}
          height={40}
          src="/pythagoras.png"
          alt="Platform Logo"
        />
        Pythagoras
      </div>
      <input onChange={e => setQuery(e.target.value)}></input>
      <div className="flex justify-center mt-10">
        <Graph2D exp={mathstr}/>
      </div>
    </main>
  );
}
