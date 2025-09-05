'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

const menuItems = ["articles", "blogs", "posts", "pricing", "docs"];

const NavBar = () => {
  const pathname = usePathname();
  const activeLink = pathname.split("/")[1]?.toLowerCase() || "";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link href="/" className={styles.homelink}>KnowledgePoll</Link>
        
      </div>

      {/* Center Menu */}
      <div className={styles.navbar_center}>
        <ul className={styles.navbar_links}>
          {menuItems.map((item) => (
            <li key={item} className={styles.navbar_list}>
              <Link
                href={`/${item}`}
                className={activeLink === item ? styles.active : ""}
                scroll={false}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className={styles.navbar_btns}>
        <button type="button" className={styles.user_btns}>Login</button>
        <button type="button" className={styles.user_btns}>Register</button>
      </div>
    </nav>
  );
};

export default NavBar;