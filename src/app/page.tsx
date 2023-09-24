import Image from "next/image";
import { Inter } from "next/font/google";
import Graph2D from "../../components/Graph2D";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <div className="flex justify-center mt-10">
        <Graph2D />
      </div>
    </main>
  );
}
