import React, { useState, useEffect } from "react";


const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://fs1040course-project-p2xhr6rraq-nn.a.run.app/portfolio");
      res.json().then((res) => setPortfolio(res));
      //.catch((err) => setErrors(err));
    }
    fetchData();
  }, []);

    return (
        
      <article>
<h2>Portfolio links</h2>
<h4>
<ul className="name">
        <div id="resume">
            {portfolio.map((item, key) => (
                <li key={item.id} style={{ listStyle: "none" }}>
                <a href="{item.link}">{item.description}</a> 
                </li>
            ))}
        </div>
</ul>
</h4>
</article>
    );
  }
export default Portfolio;