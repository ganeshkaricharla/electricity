import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, BillPage, EditPage, AddPage } from "./exports";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bill/:id" element={<BillPage />} />
          <Route path="/:id/edit" element={<EditPage />} />
          <Route path="/addBill" element={<AddPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
