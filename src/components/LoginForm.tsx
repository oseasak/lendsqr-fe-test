'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Login.module.scss';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): boolean => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return false;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError('Enter a valid email address.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      // === Simulated API login ===
      // For development/demo purposes
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check fake credentials
      if (email === 'test@example.com' && password === 'password123') {
        // Store a simple "logged in" flag in localStorage
        localStorage.setItem('loggedIn', 'true');
        router.push('/dashboard'); // navigate to dashboard
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        className={styles.input}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        aria-label="Email"
      />

      <div className={styles.passwordRow}>
        <input
          className={styles.input}
          placeholder="Password"
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          aria-label="Password"
        />
        <button
          type="button"
          className={styles.showBtn}
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? 'HIDE' : 'SHOW'}
        </button>
      </div>

      <a className={styles.forgot} href="#" onClick={(e) => e.preventDefault()}>
        FORGOT PASSWORD?
      </a>

      {error && <div className={styles.errorMsg} role="alert">{error}</div>}

      <button
        className={styles.loginBtn}
        type="submit"
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? 'LOGGING IN…' : 'LOG IN'}
      </button>
    </form>
  );
}
