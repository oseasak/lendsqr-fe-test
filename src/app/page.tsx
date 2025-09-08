// app/page.tsx
import Image from 'next/image';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Login.module.scss';

export default function Page() {
  return (
    <main className={styles.loginContainer}>
      {/* LEFT: logo + illustration */}
      <section className={styles.left}>
        <div className={styles.logo}>
          <Image src="/images/logo.png" alt="Lendsqr" width={173.6} height={36} />
        </div>

        <div className={styles.illustrationWrap}>
          <Image
            src="/images/illustration.png"
            alt="Illustration"
            width={600}
            height={337.57}
            className={styles.illustration}
          />
        </div>
      </section>

      {/* RIGHT: login card */}
      <section className={styles.right}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}