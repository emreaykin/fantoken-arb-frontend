import React from "react";

const TableRow = ({ row }) => {
  return (
    <tr key={row.key}>
      <td>
        {row.withdrawEnabled === false ? (
          <span className="circle-red"></span>
        ) : (
          <span className="circle-green"></span>
        )}
        {" "} USD ({(row.buyPrice * row.buyVolume).toFixed(0)}) {" "}  {row.exchangeOne}
      </td>
      <td>
        Al : <span className="buy-color">{row.buyPrice}</span>
      </td>
      <td>
        Hacim: <span className="buy-color">{row.buyVolume}</span>
      </td>
      <td>
        {row.depositEnabled === false ? (
          <span className="circle-red"></span>
        ) : (
          <span className="circle-green"></span>
        )}
      {" "} USD ({(row.sellPrice * row.sellVolume).toFixed(0)}) {" "}  {row.exchangeTwo}
      </td>
      <td>
        Sat: <span className="sell-color">{row.sellPrice}</span>
      </td>
      <td>
        Hacim: <span className="sell-color">{row.sellVolume}</span>
      </td>
      <td>
        Coin:{" "}
        {row.exchangeOne === "Jupiter"
          ? row.exchangeTwoSymbol
          : row.exchangeOneSymbol}
      </td>
      <td >Kaar:  { <span className={row.profit>0 ? "sell-color":"buy-color"}>{row.profit}</span> }</td>
    </tr>
  );
};

export default React.memo(TableRow);
