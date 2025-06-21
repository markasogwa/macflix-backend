import axios from "axios";
import { TMDB_API_KEY } from "../envConfig.js";

export const getMovieTrailer = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching trailer for movie ID:", id);

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`
    );

    // Filter for a trailer (type == "Trailer")
    const trailer = response.data.results.find(
      (video) => video.type === "Trailer"
    );

    if (trailer) {
      res.json({ key: trailer.key });
    } else {
      res.status(404).json({ message: "Trailer not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
