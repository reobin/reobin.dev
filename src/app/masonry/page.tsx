'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './masonry.module.css';

const COLORS = [
  'yellow',
  'green',
  'white',
  'yellow-dark',
  'red-dark',
  'yellow-pale',
  'green-dark',
  'red',
  'foreground',
];

function Masonry() {
  const [indexOffset, setIndexOffset] = useState<number>(0);

  useEffect(() => {
    setIndexOffset(indexOffset => indexOffset + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexOffset(indexOffset => indexOffset + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container}>
      {Array.from(Array(9)).map((_, index) => (
        <article
          key={index}
          className={cn(
            styles.article,
            styles[COLORS[(index + indexOffset) % 9]],
          )}
        />
      ))}
    </section>
  );
}

export default Masonry;
