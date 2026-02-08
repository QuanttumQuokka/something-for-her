'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const WORDS = ['congratulation', 'you', 'pop', 'all', 'the', 'balloons', 'for','me','😁❤️'];

export default function Page6() {
  const router = useRouter();

  const [gameKey, setGameKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [failed, setFailed] = useState(false);
  const [sentence, setSentence] = useState<(string | null)[]>(
    Array(WORDS.length).fill(null)
  );

  const [balloons, setBalloons] = useState<any[]>([]);

  /* 🔁 CREATE BALLOONS */
  useEffect(() => {
    const fresh = WORDS.map((w, i) => ({
      id: `${gameKey}-${i}-${Math.random()}`, // 👈 IMPORTANT
      word: w,
      index: i,
      left: Math.random() * 80 + 5,
    }));
    setBalloons(fresh);
  }, [gameKey]);

  /* ⏱ TIMER */
  useEffect(() => {
    if (failed) return;

    if (timeLeft === 0) {
      setFailed(true);
      return;
    }

    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, failed]);

  /* 🎈 POP */
  const popBalloon = (b: any) => {
    if (failed) return;

    new Audio('/sounds/pop.mp3').play().catch(() => {});

    setSentence(prev => {
      const copy = [...prev];
      copy[b.index] = b.word;
      return copy;
    });

    setBalloons(prev => prev.filter(x => x.id !== b.id));
  };

  /* ❌ MISS = FAIL */
  const missBalloon = () => {
    if (!failed) setFailed(true);
  };

  /* 🔁 RESTART */
  const restart = () => {
    setSentence(Array(WORDS.length).fill(null));
    setTimeLeft(10);
    setFailed(false);
    setGameKey(k => k + 1); // 👈 FULL RESET
  };

  const win = sentence.every(w => w !== null);

  return (
    <div className={styles.screen} key={gameKey}>
      {/* HEADER */}
      <div className={styles.header}>
        ⏱ Pop the balloons in {timeLeft}s
      </div>

      {/* BALLOONS */}
      {balloons.map(b => (
        <div
          key={b.id}
          className={styles.balloon}
          style={{ left: `${b.left}%` }}
          onClick={() => popBalloon(b)}
          onAnimationEnd={missBalloon}
        />
      ))}

      {/* SENTENCE */}
      <div className={styles.wordStrip}>
        {sentence.map((w, i) => (
          <span key={i}>{w ?? '___'}</span>
        ))}
      </div>

      {/* WIN */}
      {win && (
        <button className={styles.nextBtn} onClick={() => router.push('/page7')}>
          vaise or bhi kuch hai aage tere liye...❤️💕
        </button>
      )}

      {/* FAIL */}
      {failed && !win && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            koi n fir se try Karo cutie 😊
            <button onClick={restart}>Retry</button>
          </div>
        </div>
      )}
    </div>
  );
}
