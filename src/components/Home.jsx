import Card from "./Card";
import { useState, useEffect } from "react";

const Home = () => {
  const [cardWidth, setCardWidth] = useState(500);
  const cardsInRow = 5;
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardsInRow);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const url =
        "https://tvshow.p.rapidapi.com/Movie/NowPlaying?Page=1&Language=en-US&Adult=true";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "aa6394b68bmsh4ab8074e82a3edap181de1jsn4a76d264963c", // Replace with your real key
          "x-rapidapi-host": "tvshow.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse as JSON

        console.log(result); // Check this in dev tools to verify shape

        // Update based on how your API returns data
        setMovies(result || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div
      className="flex justify-center items-center"
      style={{ width: wrapperWidth }}
    >
      <div className="flex flex-wrap">
        {movies.map((movie, i) => (
          <div key={i}>
            <Card movie={movie} cardWidth={cardWidth} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
