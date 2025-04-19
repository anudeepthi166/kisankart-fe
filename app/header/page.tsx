'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-5 py-3 shadow-md">
      {/* Logo */}
      <div>
        <img src="KisanKart.png" className="w-24 h-12 object-contain" alt="KisanKart" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/signUp')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => router.push('/login')}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/login')}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
