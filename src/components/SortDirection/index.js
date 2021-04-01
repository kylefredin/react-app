function SortDirection({ direction }) {
  return (
    <button class="sort-direction-button">
      {direction === "asc" && "\u25BC"} {direction === "desc" && "\u25B2"}
    </button>
  );
}

export default SortDirection;
