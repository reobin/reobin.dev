import styles from './footer.module.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a href="https://github.com/reobin" target="_blank">
          Follow on Github
        </a>
        <span>
          © {year}, Contact me at{' '}
          <a href="mailto:me@reobin.dev">me@reobin.dev</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
