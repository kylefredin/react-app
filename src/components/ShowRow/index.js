function ShowRow({ show }) {
  return (
    <tr key={show.id}>
      <td>{show.name}</td>
      <td>{show.status}</td>
      <td>{show.premiered}</td>
    </tr>
  );
}

export default ShowRow;
