import React, { useContext } from "react";
import Film from "@/types/Film";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "../styles/filmItems.module.scss";
import cutsmall from "../../public/cutsmall.png";
import { DataContext } from "@/context/FilmContext";
import Link from "next/link";

type Props = {
  films: Film[] | null;
};

const FilmItem = ({ films }: Props) => {
  const { addToFavorites } = useContext(DataContext);

  return (
    <div className={styles.film__container}>
      {films &&
        films.map((film) => (
          <div key={film.id} className={styles.film__item}>
            <Link
              href={`/details?id=${film.id}`}
              style={{ backgroundColor: "red" }}
            >
              <img
                src={film.thumbnail.path + "." + film.thumbnail.extension}
                alt={film.name}
                className={styles.image__film}
                style={{ height: "200px" }}
              />
            </Link>
            <div>
              <div className={styles.film__content}>
                <Link href={`/details?id=${film.id}`} className="no-underline">
                  <p className={`${styles.film__title} no-underline`}>
                    {film.name}
                  </p>
                </Link>
                <button onClick={() => addToFavorites(film)}>
                  {film.is_favorite ? (
                    <FaHeart color="red" size={20} />
                  ) : (
                    <FaRegHeart color="white" size={20} />
                  )}
                </button>
              </div>
              <div style={{ textAlign: "end" }}>
                <img src={cutsmall.src} alt="" className={styles.cutsmall} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FilmItem;
