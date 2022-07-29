import React, { useState, useEffect } from "react";
import "./SearchStyle.css";

function Homepage() {
  const [population_data, setPopulation_data] = useState(null);
  const [search, setSearch] = useState("");
  const [rendered, setRendered] = useState([]);

  useEffect(() => {
    fetch("https://datausa.io/api/data?drilldowns=State&measures=Population")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPopulation_data(data);

        const path = location.pathname.substring(1);
        if (path !== "") {
          setSearch(path);
          let temp = data.data.filter((x) => x.Year === path);
          setRendered(temp);
        } else {
          setRendered(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchData = () => {
    if (search === "") {
      setRendered(population_data.data);
    } else {
      let temp = population_data.data.filter((x) => x.Year === search);
      setRendered(temp);
    }
    history.replaceState({}, "", search);
  };
  return (
    <>
      <div className="search-bar-menue">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Enter Year"
        />
        <button type="Submit" onClick={searchData}>
          Submit
        </button>
      </div>
      <h2>Total Results = {rendered.length} </h2>
      {rendered.map((state, i) => {
        return (
          <ul key={i}>
            <li>{state["ID State"]}</li>
            <li>{state.State}</li>
            <li>{state["ID Year"]}</li>
            <li>{state.Year}</li>
            <li>{state.Population}</li>
            <li>{state["Slug State"]}</li>
          </ul>
        );
      })}
    </>
  );
}

export default Homepage;
