'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar/SearchBar";
import Icons from "../icons";

const menuItems = ["articles", "blogs", "posts", "pricing", "docs"];

const NavBar = () => {
  const pathname = usePathname();
  const activeLink = pathname.split("/")[1]?.toLowerCase() || "";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <div className={styles.bar_icon}>
          <Icons.BarsIcon size={28}/>
        </div>
        <Link href="/" className={styles.homelink}>KnowledgePoll</Link>
        
      </div>
      <div className={styles.vertical_nav}>
        <ul className={styles.vertical_nav_links}>
          {menuItems.map((item) => (
            <li key={item} className={styles.vertical_navbar_list}>
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

      <div className={styles.search}>
         <SearchBar/>
      </div>
      
    </nav>
  );
};

export default NavBar;