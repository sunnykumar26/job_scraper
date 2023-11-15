import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [age, setAge] = useState(null); // State to hold the input age
  const [qualification, setQualification] = useState(""); // State to hold the input qualification
  const [filteredData, setFilteredData] = useState([]); // State to hold the filtered data

  const handleInputChange = (event) => {
    setAge(parseInt(event.target.value)); // Update the age state with input value
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value); // Update the qualification state with input value
  };

  const handleFilterData = () => {
    const filteredByAge = data.filter((item) => parseInt(item.m, 10) >= age);
    const regex = new RegExp(qualification, "i"); // Create a case-insensitive RegExp from the qualification input

    const filteredByQualification = filteredByAge.filter((item) =>
      regex.test(item.q)
    );
    // console.log(filteredByAge);
    // console.log(filteredByQualification);
    // console.log(regex);

    setFilteredData(filteredByQualification); // Update the filtered data state
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleFilterData();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://job-scraper-n67f.onrender.com/scraper"
        ); // Update with your server URL
        const res = await response.json();
        console.log(res);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="head">
        sarkari<span style={{ fontFamily: "inter", color: "green" }}> <i>jobs</i></span>
      </header>
      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      <select
        value={qualification}
        onChange={handleQualificationChange}
        onKeyPress={handleKeyPress}
      >
        <option value="" disabled>
          Select a qualification
        </option>
        <option value="class">Class 10th or 12th</option>
        <option value="degree">Graduate Degree</option>
        <option value="diploma">Diploma</option>
        <option value="tech">B.Tech</option>
      </select>

      <button onClick={handleFilterData}>search</button>
      <div className="card_container">
        {filteredData.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.p}</h3>
            <p>
              <b>Age Limit: </b>
              {item.m} years
            </p>
            <p className="last_date">
              <b>Last Date: </b>
              {item.l}
            </p>
            <p>
              <b>Required Qualification: </b> <br />
              {item.q}
            </p>
            <a
              href={`https://www.google.com/search?q=+ ${item.p} + official site `}
              target="_blank"
            >
              Apply on official site
            </a>
          </div>
        ))}
      </div>
      <footer className="notice">
        <h1>Easy access to your latest active Indian govt jobs </h1>
        <li>
          for displaying all the active posts just press <u> search </u> button
        </li>
        <li>
          for displaying according to eligibility then enter the Age and choose
          the qualification{" "}
        </li>
        <br />
        <hr />
        <p>
          * all the posts shown here are currently active during the time means
          you can come and check for the latest jobs released by govt of India,
          do not worry you can trust us as the jobs are updated every day.
        </p>
      </footer>
    </div>
  );
};

export default App;
