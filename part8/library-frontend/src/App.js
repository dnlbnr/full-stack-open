import { useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, CHANGE_BIRTHYEAR } from "./queries";

const App = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth-token")
  );
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  const allAuthors = useQuery(ALL_AUTHORS, { skip: page !== "authors" });
  const allBooks = useQuery(ALL_BOOKS, { skip: page !== "books" });

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) =>
      console.log(error.graphQLErrors[0]?.message ?? error.message ?? error),
  });

  const [changeBirthYear] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error),
  });

  const handleBookCreate = (values) => {
    createBook({ variables: values });
  };

  const handleBirthYearChange = (values) => {
    const { author, birthYear } = values;
    changeBirthYear({ variables: { author, birthYear } });
  };

  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem("auth-token", token);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("auth-token");
    client.resetStore();
  };

  return authToken ? (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={allAuthors}
        onBirthYearChange={handleBirthYearChange}
      />

      <Books show={page === "books"} />
      <Books show={page === "recommended"} books={allBooks} />

      <NewBook show={page === "add"} onBookCreate={handleBookCreate} />
    </div>
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default App;
