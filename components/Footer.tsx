'use client'

import Link from "next/link"
import { FaWhatsapp, FaInstagram } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"

const Footer = () => {
  return (
    <footer className="footer w-full px-4 py-4">
      <div className="max-w-7xl mx-auto
        flex flex-col gap-3 h-40  items-center justify-center
        md:flex-row md:justify-between font-semibold text-[1.2em] opacity-85">

        {/* LEFT */}
        <div className="flex items-center justify-center md:justify-start gap-4 ">
          <Link
            href="https://chat.whatsapp.com/B5ge2LXXSfxBQDd1toCt1I?mode=wwt"
            target="_blank"
            className="flex items-center justify-center gap-1 hover:text-green-400 transition"
          >
            <FaWhatsapp /> Whatsapp
          </Link>

          <Link
            href="https://www.instagram.com/hueborn2025"
            target="_blank"
            className="flex items-center justify-center gap-1 hover:text-pink-400 transition"
          >
            <FaInstagram /> Instagram
          </Link>
        </div>

        {/* CENTER */}
        <p className=" text-center">
          © 2025 Hueborn. All rights reserved.
        </p>

        {/* RIGHT */}
        <div className="flex items-center justify-center md:justify-end ">
          <Link
            href="mailto:support@hueborn.in"
            className="flex items-center gap-1 hover:text-blue-400 transition"
          >
            <MdOutlineEmail /> support@hueborn.in
          </Link>
        </div>

      </div>
    </footer>
  )
}

export default Footer
