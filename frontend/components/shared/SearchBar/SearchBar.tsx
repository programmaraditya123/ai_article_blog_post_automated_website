"use client";
import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import Icons from "@/components/icons";
import { getRecommendations } from "@/lib/api/recommendation";
import { Recommendations } from "@/types/articles";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Recommendations>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


   const slugFormatter = (title: string, id: string) => {
    const ftitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${ftitle}-${id}`;
  };


  // fetch recommendations when inputValue changes
  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.trim() !== "") {
        const recommendation = await getRecommendations(inputValue);
        setFilteredSuggestions(recommendation);
        setShowSuggestions(recommendation.length > 0);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 300); // debounce API call
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div className={styles.outer_container}>
      <div className={styles.search_box}>
        <div className={styles.icon_size}>
          <Icons.SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {inputValue && (
          <div
            className={styles.icon_size2}
            onClick={() => setInputValue("")}
          >
            <Icons.CrossIcon />
          </div>
        )}
      </div>

      {showSuggestions && (
        <ul className={styles.suggestions_list}>
          {filteredSuggestions.map((s) => (
           <a href={`/${s.metadata.type}s/${slugFormatter(s.metadata.title,s.metadata.id)}`} key={s.id}>
           <li key={s.id} onClick={() => setInputValue("")}>
              {s.metadata.title}
            </li>

           </a> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
