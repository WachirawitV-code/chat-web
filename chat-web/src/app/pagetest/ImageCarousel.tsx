import { useState, useEffect } from 'react';
import styles from './ImageCarousel.module.css';

const pageIndex = [
  { id: 0, topic: "Test000" },
  { id: 1, topic: "Test001" },
  { id: 2, topic: "Test002" },
  { id: 3, topic: "Test003" },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout:any;
    console.log(currentIndex)

    const nextSlide = () => {
      setCurrentIndex((currentIndex + 1) % pageIndex.length);
    };

    const startAutoPlay = () => {
      timeout = setTimeout(() => {
        nextSlide();
        startAutoPlay();
      }, 3000);
    };

    startAutoPlay();

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className={styles.carousel}>
      {pageIndex.map((page, index) => (
        <div
          key={page.id}
          className={`${styles.slide} ${index === currentIndex ? styles.in : styles.out}`}
        >
          <h1>{page.topic}</h1>
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
