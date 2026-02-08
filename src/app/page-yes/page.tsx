'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PageYes() {
  const router = useRouter();

  const goNext = () => {
    router.push('/page5');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        YEEEEEE 🥳💖
      </h1>

      <p className={styles.text}>
        You accepted my proposal 🥺🥳✨
      </p>

      <button className={styles.btn} onClick={goNext}>
        chalo aage dekhte h 💕
      </button>
    </div>
  );
}
