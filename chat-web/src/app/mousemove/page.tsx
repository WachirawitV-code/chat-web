"use client";
import Head from "next/head";
import React,{ useEffect } from "react";

const mousemove: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (event:any) => {
      // ทำงานเมื่อมีการขยับเมาส์
      console.log("Mouse moved!", event.clientX, event.clientY);
      // ทำงานตามที่คุณต้องการ
    };

    // เพิ่ม event listener เมื่อ component ถูก mount
    document.addEventListener("mousemove", handleMouseMove);

    // คืนค่าฟังก์ชันที่จะถูกเรียกเมื่อ component ถูก unmount เพื่อลบ event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // ให้ useEffect ถูกเรียกเพียงครั้งเมื่อ component ถูก mount และ unmount
  return (
    <div>
      <Head>
        <title>Image Carousel</title>
      </Head>
      <main>
        <div>
          <h1>Detect Mousemove</h1>
        </div>
      </main>
    </div>
  );
};

export default mousemove;
