import "whatwg-fetch";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import ShowTable from "../../components/ShowTable";

async function getShows(search, page = 1) {
  const results = await (
    await fetch(`https://api.tvmaze.com/search/shows?q=${search}&page=${page}`)
  ).json();

  return results;
}

function Shows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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

      {isSearching === false && shows.length === 0 && search.trim() === "" && (
        <p>Please enter a search term</p>
      )}

      {isSearching === false && shows.length === 0 && search.trim() !== "" && (
        <p>No shows found</p>
      )}

      {isSearching === true && <Loader />}

      {isSearching === false && shows.length !== 0 && (
        <ShowTable shows={shows} />
      )}
    </form>
  );
}

export default Shows;
