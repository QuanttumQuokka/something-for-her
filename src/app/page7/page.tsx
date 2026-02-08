'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Page7() {
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);
  const [opened, setOpened] = useState<boolean[]>([false, false, false]);
  const router = useRouter();

  const handleOpen = (index: number) => {
    const copy = [...opened];
    copy[index] = true;
    setOpened(copy);
    setOpenPhoto(index);
  };

  const allOpened = opened.every(Boolean);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Thode se gifts...sirf aapke liye jiii🎁💖
      </h1>

      <div className={styles.giftsRow}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${styles.giftBox} ${opened[i] ? styles.opened : ''}`}
            onClick={() => handleOpen(i)}
          >
            <img src="/gift.png" alt="gift" />
          </div>
        ))}
      </div>

      {/* POPUP */}
      {openPhoto !== null && (
        <div className={styles.popup}>
          <img
            src={`/photo${openPhoto + 1}.jpg`}
            className={styles.popupImg}
          />
          <button
            className={styles.closeBtn}
            onClick={() => setOpenPhoto(null)}
          >
            Close 💖
          </button>
        </div>
      )}

      {allOpened && (
        <button
          className={styles.nextBtn}
          onClick={() => router.push('/page8')}
        >
          sab dekh liya na cutie...💕 aage bhut kuch hai vaise...to patient ok✨
        </button>
      )}
    </div>
  );
}
