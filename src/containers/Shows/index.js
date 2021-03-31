import "whatwg-fetch";
import { useState, useEffect } from "react";
import ShowRow from "../../components/ShowRow";

async function getShows(search, page = 1) {
  const results = await (
    await fetch(`https://api.tvmaze.com/search/shows?q=${search}&page=${page}`)
  ).json();

  return results;
}

function Shows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("Vikings");
  const [isSearching, setIsSearching] = useState(false);

  const onPageChange = ({ target }) => {
    setPage(target.value);
  };

  const onSearchInput = ({ target }) => {
    setSearch(target.value);
  };

  useEffect(() => {
    setIsSearching(true);

    return getShows(search, page).then((results) => {
      setIsSearching(false);
      setShows(results);
    });
  }, [search, page]);

  return (
    <form>
      <label>
        Search:
        <input type="text" id="search" value={search} onInput={onSearchInput} />
      </label>
      <label>
        Page:
        <input type="number" id="page" value={page} onChange={onPageChange} />
      </label>

      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Premier Date</td>
          </tr>
        </thead>
        <tbody>
          {shows.map((result) => (
            <ShowRow key={result.show.id} show={result.show} />
          ))}
        </tbody>
      </table>
    </form>
  );
}

export default Shows;
