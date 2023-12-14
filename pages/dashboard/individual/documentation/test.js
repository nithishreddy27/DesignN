import Image from "next/image"
import Link from "next/link"
// import ExpandingArrow from "@/components/expanding-arrow"
// import Uploader from "@/components/uploader"
import { Toaster } from "react-hot-toast"
import ExpandingArrow from "../../../../src/components/expanding-arroow"
import Uploader from "../../../../src/components/uploader"
// import { Toaster } from "@/components/toaster"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Toaster />
      
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Blob on Vercel
      </h1>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <Uploader />
      </div>
     
      {/* <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/blob-starter"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div> */}
    </main>
  )
}
