'use client';

import useTheme from '@/hooks/useTheme';

import IconMoon from '@/components/icons/moon';
import IconSun from '@/components/icons/sun';

import styles from './lightSwitch.module.css';

function LightSwitch() {
  const { isDark, onToggle } = useTheme();

  return (
    <label
      className={styles.container}
      title={`Turn on ${isDark ? 'light' : 'dark'} mode`}
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={onToggle}
        className={styles.input}
      />
      <div className={styles.slider}>
        {isDark ? <IconMoon /> : <IconSun />}
        <div className={styles.dot} />
      </div>
    </label>
  );
}

export default LightSwitch;
