'use client';

import useTheme from '@/hooks/useTheme';

import styles from './lightSwitch.module.css';

function LightSwitch() {
  const { isDark, onToggle } = useTheme();

  return (
    <label
      className={styles.lightSwitch}
      title={`Turn on ${isDark ? 'light' : 'dark'} mode`}
    >
      <span>{isDark ? '🌞' : '🌚'}</span>
      <input type="checkbox" checked={isDark} onChange={onToggle} />
    </label>
  );
}

export default LightSwitch;
