// app/components/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import styles from '../styles/Login.module.scss';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth call
    console.log('Login attempt', { email, password });
    alert(`Logging in as ${email}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className={styles.passwordRow}>
        <input
          className={styles.input}
          placeholder="Password"
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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

      <button className={styles.loginBtn} type="submit">
        LOG IN
      </button>
    </form>
  );
}