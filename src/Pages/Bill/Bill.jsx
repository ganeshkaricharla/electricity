import "./Bill.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function Bill() {
  const { id } = useParams();
  const [bills, setBills] = useState(null);

  async function deleteBill() {
    await axios
      .delete(`https://electricityserver.herokuapp.com/delete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateBill() {
    window.location.replace("/" + id + "/edit");
  }

  useEffect(() => {
    axios
      .get("https://electricityserver.herokuapp.com/bill/" + id)
      .then((res) => {
        console.log(res.data);
        setBills(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/");
      });
  }, []);

  return (
    <div className="page_bill">
      <h1 className="page_bill_title">Bill Summary</h1>
      {bills && (
        <div className="page_bill_area">
          <div className="page_bill_legend">
            <h1>{bills._id}</h1>
            <div className="page_bill_icons">
              <i className="fa-solid fa-pen" onClick={updateBill}></i>
              <i className="fa-solid fa-trash" onClick={deleteBill}></i>
            </div>
          </div>
          <div className="page_bill_details">
            <div className="page_bill_row">
              <div className="page_bill_label">Bill Date</div>
              <div className="page_bill_value">
                {bills.billdate.slice(0, 10)}
              </div>
            </div>
            <div className="page_bill_row">
              <div className="page_bill_label">Units</div>
              <div className="page_bill_value">{bills.units}</div>
            </div>
            <div className="page_add_row">
              <div className="page_bill_label">Bill Amount</div>
              <div className="page_bill_value">{bills.billamount}</div>
            </div>
            <div className="page_bill_row">
              <div className="page_bill_label">Bill Status</div>
              <div className="page_bill_value">
                {bills.paid ? "PAID" : "NOT PAID"}
              </div>
            </div>
            <div className="page_bill_row">
              <div className="page_bill_label">Payment Date</div>
              <div className="page_bill_value">
                {bills.paid ? bills.paidDate.slice(0, 10) : "-"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
