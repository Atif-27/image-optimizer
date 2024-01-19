"use client";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import error from "next/error";
// import { Label } from "@/components/ui/label";
interface File {
  url: string;
  name: string;
  size: number;
}
interface Optimized {
  url: string;
  size: number;
}
export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<Optimized | null>(null);
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOptimizedImage(null);
    const upload_file = e.target.files?.[0];
    if (!upload_file) {
      console.error("Please select an image file.");
      return;
    }
    console.log(upload_file);

    setFile({
      url: URL.createObjectURL(upload_file),
      name: upload_file.name,
      size: upload_file.size,
    });

    const form = new FormData();
    form.append("image", upload_file);
    const apiKey = "3e48108778cf5475992454b8dcfab936";
    const apiUrl = "https://api.femto.cypherx.in/optimize-image";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!res.ok) {
        throw new Error();
      }
      const optimizedImageBuffer = await res.arrayBuffer();
      console.log("Optimized Image Buffer:", optimizedImageBuffer);
      const optimizedImageBlob = new Blob([optimizedImageBuffer]);

      console.log(optimizedImageBlob);

      setOptimizedImage({
        url: URL.createObjectURL(optimizedImageBlob),
        size: optimizedImageBlob.size,
      });
    } catch (err) {
      console.error("Error:", err as Error);
    }
  }
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
        {/* <Label htmlFor="picture">Picture</Label> */}
        <Input id="picture" type="file" onChange={handleChange} />
      </div>
      <div className="flex max-md:flex-col w-full gap-10 mt-5">
        {file && (
          <div>
            <h3 className=" font-semibold">Uploaded Image</h3>
            <Image
              src={file.url}
              width={500}
              height={500}
              alt="uploaded_image"
            />
            <p>Name: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
        {optimizedImage && (
          <div>
            <h3 className=" font-semibold">Optimized Image</h3>
            <Image
              src={optimizedImage.url}
              width={500}
              height={500}
              alt="uploaded_image"
            />{" "}
            <p>Size: {(optimizedImage.size / 1024).toFixed(2)} KB</p>
            <a
              className="bg-gray-500 w-max px-2 py-1 rounded-md"
              href={optimizedImage.url || ""}
              download="optimized_image.png"
              style={{ display: "block", marginTop: "10px" }}
            >
              Download Optimized Image
            </a>
          </div>
        )}
      </div>
    </>
  );
}
