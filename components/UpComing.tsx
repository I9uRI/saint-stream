"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MovieContainer from "./MovieContainer";

const UpComing = () => {
  const [movieList, setMovieList] = useState([]);
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const fetchMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q3N2FjOTY5NjZlZjc0ZDkxYjIzNjI0Mjc1NzgwOCIsInN1YiI6IjY0YzkyMDE1MWZhMWM4MDE1MTQ0ZTVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.51uambKSTI_HsvwnRZ_uzbC4QU7aDR74qlVD5Dy7dyA",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieList(response.results);
      })

      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  });

  return (
    <div className="space-y-1">
      <div className="w-full flex items-center justify-between px-10 pt-1 pb-2">
        <h3 className="text-white font-semibold text-2xl">Up Coming</h3>
      </div>
      <div className="group relative">
        <ArrowRight
          onClick={() => handleClick("right")}
          className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] right-12 m-auto h-8 w-8 p-1.5 bg-primary rounded-full hover:bg-primary/90 cursor-pointer group-hover:opacity-100"
        />
        <div
          className="flex items-center scrollbar-hide overflow-x-scroll pl-10 gap-x-6 pb-8 pt-2 pr-4"
          ref={rowRef}>
          {movieList.map((movie: any) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
        </div>
        <ArrowLeft
          onClick={() => handleClick("left")}
          className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] left-12 m-auto h-8 w-8 p-1.5 bg-primary hover:bg-primary/90 rounded-full cursor-pointer group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default UpComing;
