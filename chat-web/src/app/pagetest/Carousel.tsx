import { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import { motion } from "framer-motion";

const pageIndex = [
  { id: 0, topic: "Test000" },
  { id: 1, topic: "Test001" },
  { id: 2, topic: "Test002" },
  { id: 3, topic: "Test003" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(currentIndex);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pageIndex.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePaginationClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      {pageIndex.map((page, index) => (
        <motion.div
          key={page.id}
          className={`${styles.slide} ${
            index === currentIndex ? styles.in : styles.out
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white">{page.topic}</h1>
        </motion.div>
      ))}

      <div className={styles.pagination}>
        {pageIndex.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePaginationClick(index)}
            className={`${styles.paginationButton} ${
              index === currentIndex ? styles.active : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
