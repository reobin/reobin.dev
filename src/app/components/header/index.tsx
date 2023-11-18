import Image from 'next/image';
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Image src="/logo.png" alt="reobin.dev logo" width={50} height={50} />
      <h2>reobin.dev</h2>
    </header>
  );
}

export default Header;
