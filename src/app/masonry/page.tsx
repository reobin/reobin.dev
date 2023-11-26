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
  return (
    <section className={styles.container}>
      {Array.from(Array(9)).map((_, index) => (
        <article
          key={index}
          className={cn(styles.article, styles[COLORS[index]])}
        />
      ))}
    </section>
  );
}

export default Masonry;
