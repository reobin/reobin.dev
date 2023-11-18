import Image from 'next/image';
import { Archivo } from 'next/font/google';

import LightSwitch from '../lightSwitch';

import styles from './header.module.css';

const font = Archivo({ weight: '700', subsets: ['latin'] });

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Image src="/logo.png" alt="reobin.dev logo" width={50} height={50} />
        <h2 className={font.className}>reobin.dev</h2>
      </div>
      <LightSwitch />
    </header>
  );
}

export default Header;
