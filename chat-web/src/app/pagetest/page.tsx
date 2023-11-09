"use client";
import Head from "next/head";
import ImageCarousel from "./ImageCarousel";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Image Carousel</title>
      </Head>
      <main>
        <div>
          <h1>Auto loop</h1>
        </div>
        <ImageCarousel />
      </main>
    </div>
  );
};

export default Home;
