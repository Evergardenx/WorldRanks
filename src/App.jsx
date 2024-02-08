import "./App.css";
import Home from "./pages/Home";
import Country from "./pages/Country";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Return from "./Return";

function App() {
  const [COUNTRIES, setCOUNTRIES] = useState([]);

  async function getCountries() {
    const API = "https://restcountries.com/v3.1/all";
    const res = await axios.get(API);
    setCOUNTRIES(
      res.data.filter((country) => country.name.common !== "Antarctica")
    );
  }

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home COUNTRIES={COUNTRIES} />}></Route>
        <Route
          path={`/country/:name`}
          element={<Country COUNTRIES={COUNTRIES} />}
        />
      </Routes>
      <Return />
    </BrowserRouter>
  );
}

export default App;
