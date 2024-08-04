// context/DataContext.tsx
"use client"; // Add this at the top

import Comic from "@/types/Comics";
import Film from "@/types/Film";
import { title } from "process";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface DataContextType {
  // this for stock data from api characters
  films: Film[] | null;
  // loading is a boolean to know if the data is loading
  loading: boolean;
  //error is a string to know if there is an error
  error: string | null;
  // addToFavorites is a function to add a film to favorites
  addToFavorites: (film: Film) => void;
  // getFavorites is a function to get the list of favorites
  getFavorites: () => Film[] | null;
  // search is a function to search for films
  search: (query: string) => void;
  // findCharacter is a function to find a character by id
  findCharacter: (id: number) => Film | null;
  // findComics is a function to find a comic by id
  findComics: (id: number) => void;
  // comics is a list of comics
  comics: Comic[] | null;
}

const DataContext = createContext<DataContextType>({
  films: [],
  loading: true,
  error: null,
  addToFavorites: () => {},
  getFavorites: () => {
    return null;
  },
  search: () => {},
  findCharacter: () => {
    return null;
  },
  findComics: () => {
    return null;
  },
  comics: [],
});

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [films, setFilms] = useState<Film[] | null>(null);
  const [comics, setComics] = useState<Comic[] | null>(null);
  const [listFilms, setListFilms] = useState<Film[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          apikey: "cb5fedff9282ee04fb9ef48056e18db4",
          ts: "2",
          hash: "264a4b398f0696ffe8e0e311b09f18bb",
          limit: "10",
        };
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(
          `http://gateway.marvel.com/v1/public/characters?${queryString}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // normalize the data
        const filmsData = result.data.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          thumbnail: item.thumbnail,
          is_favorite: false, // Set default value for is_favorite
        }));

        setFilms(filmsData as Film[]);
        setListFilms(filmsData as Film[]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToFavorites = (film: Film) => {
    const updatedFilms = films?.map((f) => {
      if (f.id === film.id) {
        return { ...f, is_favorite: !f.is_favorite };
      }
      return f;
    });
    setFilms(updatedFilms as Film[]);
  };

  const getFavorites = () => {
    return films?.filter((film) => film.is_favorite) || [];
  };

  const search = (query: string) => {
    if (query === "") {
      setFilms(listFilms as Film[]);
    } else {
      const filteredFilms = listFilms?.filter((film) =>
        film.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilms(filteredFilms as Film[]);
    }
  };

  const findCharacter = (id: number) => {
    return films?.find((film) => film.id === id) || null;
  };

  const findComics = async (id: number) => {
    try {
      const params = {
        apikey: "cb5fedff9282ee04fb9ef48056e18db4",
        ts: "2",
        hash: "264a4b398f0696ffe8e0e311b09f18bb",
        limit: "10",
      };
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `http://gateway.marvel.com/v1/public/characters/${id}/comics?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const comicsData = result.data.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        modified: item.modified,
        thumbnail: item.thumbnail,
      }));

      setComics(comicsData as Comic[]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        films,
        loading,
        error,
        addToFavorites,
        getFavorites,
        search,
        findCharacter,
        findComics,
        comics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
