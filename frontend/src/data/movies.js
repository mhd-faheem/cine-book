
import inceptionImg from '../assets/inception.jpg'
import aaveshamImg from '../assets/aavesham.jpg'
import spidermanImg from '../assets/spidermanImg.jpg'
// movies.js

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genres: ["Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    rating: 8.8,
    image: inceptionImg,
  },
  {
    id: 2,
    title: "Aavesham",
    year: 1999,
    genres: ["Sci-Fi", "Action"],
    directors: ["Lana Wachowski", "Lilly Wachowski"],
    rating: 8.7,
    image: aaveshamImg,
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    year: 2019,
    genres: ["Drama", "Thriller"],
    director: "Bong Joon-ho",
    rating: 8.5,
    image: spidermanImg,
  },
  {
    id: 4,
    title: "Goutham",
    year: 2019,
    genres: ["Drama", "Thriller"],
    director: "Bong Joon-ho",
    rating: 8.5,
    image: spidermanImg,
  }
];

export default movies