import React, { useState, useEffect } from "react";


const Resume = () => {
  const [resume, setResume] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3008/resume");
      res.json().then((res) => setResume(res));
      //.catch((err) => setErrors(err));
    }
    fetchData();
  }, []);
    return (
        
      <article>

<h2>
<ul className="skills">
        <div id="resume">
            {resume.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.name}
                </li>
            ))}
        </div>
</ul>
</h2>


  <ul className="skills">
        <div id="resume">
            {resume.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                Phone: {item.phone}; Email: {item.email}; Address: {item.street_address}, {item.city}, {item.province}, {item.country}
                </li>
            ))}
        </div>
    <li className="resume">Energetic, hardworking, punctual, creative and able to work at various shifts.</li>
</ul>

  <h3>HIGHLITES OF QUALIFICATIONS:</h3>
</article>
    );
  }

 
export default Resume;