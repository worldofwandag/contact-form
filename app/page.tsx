'use client'


import Image from "next/image";
import Contactform from './components/Contactform'


export default function Home() {
  return (
    <div className="flex justify-center items-center relative min-h-screen">
      <Contactform />
    </div>
  );
}
