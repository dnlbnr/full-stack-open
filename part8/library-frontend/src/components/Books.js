import { useState } from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
  const [filter, setFilter] = useState("");

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: filter && { genre: filter },
  });

  const meQuery = useQuery(ME);
  const favouriteGenre = meQuery.data?.me?.favouriteGenre;

  if (!props.show) {
    return null;
  }
  if (booksQuery.loading) {
    return "Loading...";
  }

  const books = booksQuery.data.allBooks;
  const genres = books.reduce((genres, book) => {
    book.genres.forEach((g) => genres.add(g));
    return genres;
  }, new Set());

  return (
    <div>
      <h2>books</h2>
      <h3>Filter</h3>
      {[...genres].map((g) => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}{" "}
      {favouriteGenre && (
        <button onClick={() => setFilter(favouriteGenre)}>
          Only show fav genre ({favouriteGenre})
        </button>
      )}
      <button onClick={() => setFilter("")}>Clear filter</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
