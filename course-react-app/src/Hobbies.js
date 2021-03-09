import React, { Component } from "react";
 
class Hobbies extends Component {
  render() {
    return (
      <main>
        <h2>Hobbies page</h2>
        <p>I have too many hobbies, so little time.</p>
        <p>Just to name a few:</p>
        <ul>
          <li className="hobbies">Unicycling (is the most recent one)</li>
          <li className="hobbies">Whitewater canoeing </li>
          <li className="hobbies">Fishing/icefishing: I fish for jumbo perch.</li> 
          <li className="hobbies">Vintage snowmobiling</li> 
          <img src="images/20150124_125914.jpg" alt="Ski-Doo Elan snowmobile"/>
          <li className="hobbies">Moped racing</li>
          <img src="images/P1100222.JPG" alt="Moped racing in NY, US"/>
          <img src="images/P1100235.JPG" alt="Moped racing in NY, US"/>
          <li className="hobbies">Model airplanes</li>
          <li className="hobbies"> Music </li> 
          <li className="hobbies">Graphic art</li>
        </ul>
        <div className="video">
        <iframe width="420" height="315" src="https://www.youtube.com/embed/5SvNzWqmgEM"
        title="control line airmodels combat video">
        </iframe>
        </div>
      <article>
      </article>
        
      </main>
    );
  }
}
 
export default Hobbies;