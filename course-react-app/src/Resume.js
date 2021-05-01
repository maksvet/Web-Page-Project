import React, { useState, useEffect } from "react";


const Resume = () => {
  const [resume, setResume] = useState({
    personal_info : [],
    skills: [],
    qualifications: [],
    work_experience: [],
    education: [],
    training: []
});
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3008/resume");
      res.json().then((res) => setResume(res));
      //.catch((err) => setErrors(err));
    }
    fetchData();
  }, []);

  console.log(resume)

    return (
        
      <article>

<h2>
<ul className="name">
        <div id="resume">
            {resume.personal_info.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.name}
                </li>
            ))}
        </div>
</ul>
</h2>
<ul className="personal_info">
        <div id="resume">
            {resume.personal_info.map((item, key) => (
                <li key={item.name} style={{ listStyle: "none" }}>
                Phone: {item.phone}, Email: {item.email}, Address: {item.street_address}, {item.city}, {item.province}, {item.country}
                </li>
            ))}
        </div>
</ul>
<h4>HIGHLITES OF QUALIFICATIONS:</h4>
<ul className="skills">
        <div id="resume">
            {resume.skills.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.skill}
                </li>
            ))}
            {resume.qualifications.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.qualification}
                </li>
            ))}
        </div>
</ul>
<h4>WORK EXPERIENCE:</h4>
<ul className="skills">
        <div id="resume">
            {resume.work_experience.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.position}. {item.start_date} - {item.finish_date}. {item.name}, {item.city}, {item.province}, {item.country}.<br/>
                {item.task}<br/>
                </li>
            ))}
        </div>
</ul>
<h4>EDUCATION:</h4>
<ul className="skills">
        <div id="resume">
            {resume.education.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.education_title}. {item.start_date} - {item.finish_date}. {item.name}, {item.city}, {item.province}, {item.country}.<br/>
                </li>
            ))}
        </div>
</ul>
<h4>TRAINING COURSERS:</h4>
<ul className="skills">
        <div id="resume">
            {resume.training.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                {item.traning_title}. {item.start_date} - {item.finish_date}. {item.name}, {item.city}, {item.province}, {item.country}.<br/>
                </li>
            ))}
        </div>
</ul>

</article>
    );
  }

 
export default Resume;