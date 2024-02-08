import { useState, useEffect } from "react";
import axios from "axios";

import TableRow from "../TableRow";

export default function Home({ COUNTRIES }) {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    americas: true,
    antarctic: true,
    africa: true,
    asia: true,
    europe: true,
    oceania: true,
    un: false,
    independent: false,
  });
  const [sort, setSort] = useState("population");
  useEffect(() => {
    setFilteredCountries(COUNTRIES);
  }, [COUNTRIES]);

  function updateFormData(e) {
    e.target.type !== "checkbox"
      ? setFormData({ ...formData, [e.target.name]: e.target.value })
      : setFormData({ ...formData, [e.target.name]: e.target.checked });
  }

  function sortCountries(countries) {
    if (sort === "name") {
      return countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sort === "population") {
      return countries.sort((a, b) => b.population - a.population);
    } else if (sort === "area") {
      return countries.sort((a, b) => b.area - a.area);
    }
  }

  function filterCountries() {
    //creates an array of the keys from formData object where its value equals true
    const filters = [];
    for (const [key, value] of Object.entries(formData)) {
      if (value === true) filters.push(key);
    }

    let newFilteredCountries = [];

    filters.forEach((filter) => {
      newFilteredCountries.push(
        ...COUNTRIES.filter((country) => {
          if (filter !== "un" && filter !== "independent") {
            if (country.region.toLowerCase() === filter) return country;
          }
        })
      );
    });

    if (filters.includes("un")) {
      newFilteredCountries = newFilteredCountries.filter(
        (country) => country.unMember
      );
    }

    if (filters.includes("independent")) {
      newFilteredCountries = newFilteredCountries.filter(
        (country) => country.independent
      );
    }

    //before setting the new state the filtered array is filtered again using searchTerm
    setFilteredCountries(
      newFilteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  useEffect(filterCountries, [formData, searchTerm]);

  return (
    <>
      <main className="app">
        <form className="app__form">
          <div className="justify-between">
            <span className="form__found">
              Found {filteredCountries.length} countries
            </span>
            <input
              className="form__search"
              name="search"
              placeholder="Search by name, region, subregion"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </form>
        <div className="app__grid">
          <form className="app__form">
            <label htmlFor="sort">
              Sort by
              <select
                className="form__sort"
                id="sort"
                name="sort"
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="population">Population</option>
                <option value="name">Name</option>
                <option value="area">Area</option>
              </select>
            </label>
            <fieldset className="form__region">
              <legend>Region</legend>
              <label htmlFor="americas">
                Americas
                <input
                  checked={formData.americas}
                  id="americas"
                  name="americas"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
              <label htmlFor="antarctic">
                Antarctic
                <input
                  checked={formData.antarctic}
                  id="antarctic"
                  name="antarctic"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
              <label htmlFor="africa">
                Africa
                <input
                  checked={formData.africa}
                  id="africa"
                  name="africa"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
              <label htmlFor="asia">
                Asia
                <input
                  checked={formData.asia}
                  id="asia"
                  name="asia"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
              <label htmlFor="europe">
                Europe
                <input
                  checked={formData.europe}
                  id="europe"
                  name="europe"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
              <label htmlFor="oceania">
                Oceania
                <input
                  checked={formData.oceania}
                  id="oceania"
                  name="oceania"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
            </fieldset>
            <fieldset className="form__status">
              <legend>Status</legend>
              <label htmlFor="un">
                Member of the United Nations
                <input
                  checked={formData.un}
                  id="un"
                  name="un"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
              <label htmlFor="independent">
                Independent
                <input
                  checked={formData.independent}
                  id="independent"
                  name="independent"
                  type="checkbox"
                  onChange={(e) => updateFormData(e)}
                />
              </label>
            </fieldset>
          </form>
          <table className="app__table">
            <thead>
              <tr>
                <th className="hidden-small">Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area(km³)</th>
                <th className="large-only">Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries &&
                sortCountries(filteredCountries).map((country, index) => {
                  return (
                    <TableRow
                      alt={country.flags.alt}
                      area={country.area.toLocaleString()}
                      img={country.flags.svg}
                      key={index + 1}
                      name={country.name.common}
                      pop={country.population.toLocaleString()}
                      region={country.region}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
