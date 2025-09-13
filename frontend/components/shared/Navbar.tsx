'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState,useRef, useEffect } from "react";
import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar/SearchBar";
import Icons from "../icons";


const menuItems = ["articles", "blogs", "posts", "pricing", "docs"];

const NavBar = () => {
  const pathname = usePathname();
  const activeLink = pathname.split("/")[1]?.toLowerCase() || "";

const [isOpen, setIsOpen]=useState(false)
const menuRef = useRef<HTMLDivElement | null>(null);
 const handleToggle = () => {
    setIsOpen(!isOpen);
  };
 const handleClose = () => {
    setIsOpen(false); // 🔹 closes menu when link is clicked
  };

 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);




  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <div className={styles.bar_icon} onClick={handleToggle}>
           {isOpen ? <Icons.CrossIcon size={22}/> : <Icons.BarsIcon size={28}/>}
        </div>
        <Link href="/" className={styles.homelink}>KnowledgePoll</Link>
        
      </div>

      {isOpen && (<div className={styles.vertical_nav } ref={menuRef}
      
      
      
      >
        <ul className={styles.vertical_nav_links}  
        
        >
          {menuItems.map((item) => (
            <Link
                href={`/${item}`}
                className={activeLink === item ? styles.active : ""}
                 onClick={handleClose}
                scroll={false}
                
              >
            <li key={item} className={styles.vertical_navbar_list} >
              
              
                {item}
             
              </li>
               </Link>
          ))}

        </ul>
      </div>)}

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