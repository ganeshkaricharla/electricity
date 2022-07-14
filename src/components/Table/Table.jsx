import "./Table.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Table({ bills }) {
  const [tablerows, setTableRows] = useState(null);

  useEffect(() => {
    setTableRows(bills);
  }, [bills]);
  return (
    <div className="component_table">
      {tablerows && (
        <div className="component_table_head">
          <div className="component_table_head_cell">Bill Id</div>
          <div className="component_table_head_cell">Bill Date</div>

          <div className="component_table_head_cell">Total Units</div>

          <div className="component_table_head_cell">Bill Amount</div>
          <div className="component_table_head_cell">Bill Status</div>
          <div className="component_table_head_cell">paid Date</div>
        </div>
      )}
      {tablerows &&
        tablerows.map((row, index) => {
          console.log(row);
          return (
            <Link to={`/bill/${row._id}`}>
              <div className="component_table_row" key={index}>
                <div className="component_table_row_cell">{row._id}</div>
                <div className="component_table_row_cell">
                  {row.billdate.slice(0, 10)}
                </div>

                <div className="component_table_row_cell">{row.units}</div>
                <div className="component_table_row_cell">{row.billamount}</div>
                <div className="component_table_row_cell">
                  {row.paid ? "PAID ✅" : "NOTPAID ❌"}
                </div>
                <div className="component_table_row_cell">
                  {row.paid ? row.paidDate.slice(0, 10) : "-"}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default Table;
