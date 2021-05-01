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

<h2>Resume</h2>

  <h3>HIGHLITES OF QUALIFICATIONS:</h3>
  <ul class="skills">
        <div id="Entries">
            {resume.map((item, key) => (
                <li key={item.id}>
                {item.name}; Phone {item.phone}; Email: {item.email}; Address: {item.street_address};
                </li>
            ))}
        </div>
    <li class="resume">Energetic, hardworking, punctual, creative and able to work at various shifts.</li>
</ul>
</article>
    );
  }

 
export default Resume;