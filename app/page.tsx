"use client";
import Link from 'next/link';
import GetInModal from '@/components/GetInModal';
import { Globe } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showGetInModal, setShowGetInModal] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-b from-black to-gray-900 text-white dotted-grid-background flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto text-center px-6 py-12 bg-black/70 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-transparent bg-clip-text">
          Stacks Dapp Starter Pack
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Kickstart your next Stacks-powered dapp with this modern template.<br />
          Easily onboard users with instant wallet creation or connect existing accounts.
        </p>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-lg shadow-lg transition cursor-pointer select-none"
          onClick={() => setShowGetInModal(true)}
        >
          <Globe size={22} />
          Get Your Account
        </button>
        <div className="mt-8 text-sm text-gray-400">
          <Link href="https://github.com/fabohax/ezstx" target="_blank">
          <span className="font-semibold text-white">Open Source</span></Link> · Next.js · TailwindCSS · Stacks.js
        </div>
      </div>
      {showGetInModal && <GetInModal onClose={() => setShowGetInModal(false)} />}
    </div>
  )
}
