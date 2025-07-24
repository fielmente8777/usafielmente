"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoCall } from "react-icons/io5";

function Call() {
    const pathName = usePathname();

  if (pathName === "/thank-you/") {
    return null;
  }
    return (
        <div className='fixed bottom-10 lg:left-10  left-4 z-20 cursor-pointer'>
            <Link href="tel:+919501868775" target="_blank" rel="noreferrer" className='w-12 h-12 rounded-full flex items-center justify-center bg-blue-700 hover:bg-blue-800 hover:shadow-2xl transition-all'>
                <IoCall size={29} color='white' />
                <span className='sr-only'>what&apos;s app</span>
            </Link>
        </div>
    )
}

export default Call