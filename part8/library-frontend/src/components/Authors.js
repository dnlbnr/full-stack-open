import { useState } from "react";

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [birthYear, setBirthYear] = useState("");
  if (!props.show) {
    return null;
  }
  if (props.authors.loading) {
    return "Loading...";
  }
  const authors = props.authors.data.allAuthors;

  const handleBirthyearChange = (e) => {
    e.preventDefault();
    props.onBirthYearChange({ author, birthYear: parseInt(birthYear) });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={handleBirthyearChange}>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default Authors;
