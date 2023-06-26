import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Adjust the path according to your file structure
import TableRow from "./TableRow";

const ProfitTable = () => {
  const { data } = useContext(AppContext);

  return (
    <table>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} row={item} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(ProfitTable);
