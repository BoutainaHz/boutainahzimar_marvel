"use client";
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchInput";
import img from "../../public/logom.png";
import item from "../../public/item.png";
import FilmItem from "@/components/FilmItem";
import Film from "@/types/Film";
import { DataContext } from "@/context/FilmContext"; // Adjust based on your file structure
import { useContext } from "react";
export default function Home() {
  const { films, loading, error } = useContext(DataContext);

  console.log(films);

  return (
    <div className="content">
      <Navbar image={img.src} color="red" />
      <div className="container">
        <SearchInput result={films ? films.length : 0} />
        {films ? (
          <FilmItem films={films} />
        ) : (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Loading...
            <div
              style={{
                position: "relative",
              }}
            >
              <span className="loader"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
