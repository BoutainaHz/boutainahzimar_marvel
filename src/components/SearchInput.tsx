import React, { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "@/styles/searchInput.module.scss";
import { DataContext } from "@/context/FilmContext";

type Props = {
  result: number;
};

const SearchInput = ({ result }: Props) => {
  const { search } = useContext(DataContext);
  return (
    <>
      <div className={`${styles.form__group} field`}>
        <input
          type="input"
          className={styles.form__field}
          placeholder="SEARCH A CHARACTER"
          name="name"
          id="name"
          onChange={(e) => search(e.target.value)}
          required
        />
        <label htmlFor="name" className={styles.form__label}>
          <IoSearchOutline /> SEARCH A CHARACTER
        </label>
      </div>
      <p className={styles.text_result}>{result} RESULTS</p>
    </>
  );
};

export default SearchInput;
