"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { DataContext } from "../context/FilmContext";

type Props = {
  image: string;
  color: string;
};

const Navbar = ({ image, color }: Props) => {
  const { getFavorites } = useContext(DataContext);
  const films = getFavorites();
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <img src={image} alt="logo" />
      </Link>

      <ul className="nav-links">
        <div className="menu">
          <Link href="/favourite">
            <FaHeart color={color} size={20} />
          </Link>
          {films ? films.length : 0}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
