import { useState } from "react";
import ShowRow from "../../components/ShowRow";
import SortDirection from "../SortDirection";

function ShowTable({ shows }) {
  const [nameSort] = useState("");

  return (
    <table>
      <thead>
        <tr>
          <td>
            Name <SortDirection direction={nameSort} />
          </td>
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
  );
}

export default ShowTable;
