import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./unsplash.module.css";

export default function Unsplash({ query, onSelect }) {
  const [images, setImages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const searchImage = async () => {
      try {
        const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
        },
      });

      setImages(res.data.results);
      } catch (error) {
        console.log('Unsplash error', error);
      }
    };
    if (showModal && query) {
        searchImage();
    }
  }, [showModal, query]);

  const handleSelect = (imgUrl) => {
    setSelected(imgUrl);
    setShowModal(false);
    onSelect(imgUrl); // Вызываем родительский callback
  };

  return (
    <div className={styles.container}>
      <div className={styles.selector} onClick={() => setShowModal(true)}>
        {selected ? (
          <img src={selected} alt="Selected" className={styles.preview} />
        ) : (
          <span className={styles.selectBtn}>Select image</span>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.title}>Select image</h2>
            <div className={styles.grid}>
              {images && images.map((img) => (
                <img
                  key={img.id}
                  src={img.urls.small}
                  alt={img.alt_description}
                  className={styles.imgOption}
                  onClick={() => handleSelect(img.urls.small)}
                />
              ))}
            </div>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
