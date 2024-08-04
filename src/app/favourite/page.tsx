"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import img from "../../../public/logom.png";
import SearchInput from "@/components/SearchInput";
import FilmItem from "@/components/FilmItem";
import Film from "@/types/Film";
import item from "../../../public/item.png";
import { DataContext } from "@/context/FilmContext"; // Adjust based on your file structure
import { useContext } from "react";

const Page = () => {
  const { getFavorites } = useContext(DataContext);

  const films = getFavorites();
  return (
    <div className="content">
      <Navbar image={img.src} color="red" />
      <div className="container">
        <h2>FAVORITES</h2>
        <SearchInput result={0} />
        <FilmItem films={films || []} />
      </div>
    </div>
  );
};

export default Page;
