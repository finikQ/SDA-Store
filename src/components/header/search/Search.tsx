"use client";

import React, { useEffect } from "react";
import styles from "./search.module.css";
import { useRouter } from "next/navigation";

export const Search = () => {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/catalog/search?query=${query}`);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Найти"
          onChange={handleChangeInput}
          value={query}
        ></input>
      </form>
    </div>
  );
};
