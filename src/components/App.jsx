import React, { useState } from "react";
import Nav from "./Nav";
import hogs from "../porkers_data";
import Card from "./Card";

function App() {
  const [hogsList, setHogsList] = useState(hogs);
  const [hiddenHogs, setHiddenHogs] = useState(new Set());
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    specialty: "",
    greased: false,
    "highest medal achieved": "",
    image: "",
  });

  function hideHog(hogName) {
    setHiddenHogs((prev) => new Set(prev).add(hogName));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a name");
      return;
    }
    const newHog = {
      name: formData.name.trim(),
      weight: Number(formData.weight),
      specialty: formData.specialty.trim(),
      greased: formData.greased,
      "highest medal achieved": formData["highest medal achieved"].trim(),
      image: formData.image.trim() || "https://via.placeholder.com/150",
    };
    setHogsList((prev) => [...prev, newHog]);
    setFormData({
      name: "",
      weight: "",
      specialty: "",
      greased: false,
      "highest medal achieved": "",
      image: "",
    });
  }

  let visibleHogs = hogsList.filter((hog) => !hiddenHogs.has(hog.name));

  if (greasedOnly) {
    visibleHogs = visibleHogs.filter((hog) => hog.greased);
  }

  if (sortBy === "name") {
    visibleHogs = [...visibleHogs].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "weight") {
    visibleHogs = [...visibleHogs].sort((a, b) => a.weight - b.weight);
  }

  return (
    <div className="App">
      <Nav />

      <div style={{ margin: "1rem 0" }}>
        <input
          type="checkbox"
          id="greased-filter"
          checked={greasedOnly}
          onChange={(e) => setGreasedOnly(e.target.checked)}
        />
        <label htmlFor="greased-filter" style={{ marginLeft: "0.5rem" }}>
          Greased Pigs Only?
        </label>

        <label htmlFor="sort-by" style={{ marginLeft: "2rem" }}>
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
        </select>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "2rem", maxWidth: "400px" }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="weight">Weight:</label>
          <br />
          <input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="any"
          />
        </div>

        <div>
          <label htmlFor="specialty">Specialty:</label>
          <br />
          <input
            id="specialty"
            name="specialty"
            type="text"
            value={formData.specialty}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="highest-medal">Highest Medal Achieved:</label>
          <br />
          <input
            id="highest-medal"
            name="highest medal achieved"
            type="text"
            value={formData["highest medal achieved"]}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="image">Image URL:</label>
          <br />
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>

        <div>
          <input
            id="greased"
            name="greased"
            type="checkbox"
            checked={formData.greased}
            onChange={handleChange}
          />
          <label htmlFor="greased" style={{ marginLeft: "0.3rem" }}>
            Greased?
          </label>
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Add Hog
        </button>
      </form>

      <div
        className="hog-container"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      >
        {visibleHogs.map((hog) => (
          <Card key={hog.name} hog={hog} onHide={() => hideHog(hog.name)} />
        ))}
      </div>
    </div>
  );
}

export default App;
