import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>
        <strong>Hello!</strong> I&apos;m Robin.
        <br />I code and brew coffee.
      </h1>
    </div>
  );
}
