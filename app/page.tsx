import { Upload } from "@/components/Upload";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="p-10 bg-stone-800 text-white min-h-screen">
      <h1 className="text-4xl font-bold"> Image Optimizer</h1>
      <Upload />
    </main>
  );
}
