"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1 - Logo + About */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>Knowledge<span>Poll</span></h2>
          <p>
            Your trusted source for learning programming, exploring coding
            concepts, and building practical projects. Stay ahead in tech with
            curated knowledge.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h3 className={styles.heading}>Navigation</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/articles">Articles</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/docs">Docs</Link></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className={styles.heading}>Resources</h3>
          <ul>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/tutorials">Tutorials</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h3 className={styles.heading}>Join Our Newsletter</h3>
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          ) : (
            <p className={styles.success}>✅ You’re subscribed to Knowledge Poll!</p>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Knowledge Poll. All rights reserved.</p>
        <div className={styles.socials}>
          <a href="https://twitter.com" target="_blank">Twitter</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
