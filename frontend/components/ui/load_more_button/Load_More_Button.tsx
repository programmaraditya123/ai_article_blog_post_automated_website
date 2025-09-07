import React from "react";
import styles from "./load_more_button.module.scss";

type LoadMoreButtonProps = {
  onClick?: () => void;
  text?: string;
  Icon?: React.ElementType; // works with any component
};

function LoadMoreButton({ onClick, text, Icon }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.btn_parent}
    >
      
      {Icon && <Icon size={20}  className= {styles.iconcolor} /> }  {/* ✅ use directly */}
     
      {text}
    </button>
  );
}



export default LoadMoreButton;
