import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Table } from "../../exports";
import { Link } from "react-router-dom";
function Home() {
  const [bills, setBills] = useState(null);

  useEffect(() => {
    axios
      .get("https://electricityserver.herokuapp.com/")
      .then((res) => {
        setBills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page_home">
      <h1 className="page_home_title">Bill History</h1>
      <Link to="/addBill">
        <h3 className="page_home_title page_home_title_add">Add New Bill?</h3>
      </Link>
      <div className="page_home_table_area">
        <Table bills={bills} />
      </div>
    </div>
  );
}

export default Home;
