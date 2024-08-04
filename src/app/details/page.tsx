"use client";
import Navbar from "@/components/Navbar";
import img from "../../../public/logom.png";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/details.module.scss";
import cut from "../../../public/cut.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ComicsCaroussel from "@/components/ComicsCaroussel";
import { DataContext } from "@/context/FilmContext";
import { getIdParams } from "@/utils/params";
import Film from "@/types/Film";

type Props = {};

const page = (props: Props) => {
  const [character, setCharacter] = useState<Film | null>();

  const { findCharacter, addToFavorites, findComics } = useContext(DataContext);
  useEffect(() => {
    const id = getIdParams();
    if (id) {
      const foundCharacter = findCharacter(Number(id)); // Ensure id is a number
      setCharacter(foundCharacter);
      findComics(id);
    }
  }, []);
  return (
    <div>
      <Navbar image={img.src} color="red" />
      {character && (
        <div>
          <div
            className={styles.bg_primary}
            style={{
              position: "relative",
            }}
          >
            <div className={`${styles.container} ${styles.detail_body}`}>
              <img
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt=""
                style={{ height: "300px", width: "300px", objectFit: "cover" }}
              />
              <div className={styles.p_5}>
                <div className="flex">
                  <h1 className="f-white">{character.name}</h1>
                  <div>
                    <button onClick={() => addToFavorites(character)}>
                      {character.is_favorite ? (
                        <FaHeart color="red" size={20} />
                      ) : (
                        <FaRegHeart color="white" size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <p className="f-white film_description">
                  {character.description}
                </p>
              </div>
            </div>
            <div className="p-absolute right-0 bottom-0 ">
              <img src={cut.src} alt="" className={styles.cut} />
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <h1>COMICS</h1>
        <ComicsCaroussel />
      </div>
    </div>
  );
};

export default page;
