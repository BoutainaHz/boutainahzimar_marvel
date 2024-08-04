"use client";
import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import comic from "../../public/comic.png";
import { DataContext } from "@/context/FilmContext";

type Props = {};

const ComicsCaroussel = (props: Props) => {
  const images = [
    comic.src,
    comic.src,
    comic.src,
    comic.src,
    comic.src,
    comic.src,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const { comics } = useContext(DataContext);

  return (
    <div className="carousel-wrapper">
      {comics ? (
        <Slider {...settings}>
          {comics.map((item, index) => (
            <div className="slide" key={index}>
              <img
                alt={`sample_file_${index}`}
                src={item.thumbnail.path + "." + item.thumbnail.extension}
              />
              <p className="legend">{item.title}</p>
              <p style={{ fontSize: "10px" }}>{item.modified.split("T")[0]}</p>
            </div>
          ))}
        </Slider>
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
  );
};

export default ComicsCaroussel;
