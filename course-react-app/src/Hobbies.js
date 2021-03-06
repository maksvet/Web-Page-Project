import React, { Component } from "react";
 
class Hobbies extends Component {
  render() {
    return (
      <main>
        <h2>Hobbies page</h2>
        <p>I have too many hobbies, so little time.</p>
        <p>Just to name a few:</p>
        <ul>
          <li class="hobbies">Unicycling (is the most recent one)</li>
          <li class="hobbies">Whitewater canoeing </li>
          <li class="hobbies">Fishing/icefishing: I fish for jumbo perch.</li> 
          <li class="hobbies">Vintage snowmobiling</li> 
          <img src="images/20150124_125914.jpg" alt="Ski-Doo Elan snowmobile"/>
          <li class="hobbies">Moped racing</li>
          <img src="images/P1100222.JPG" alt="Moped racing in NY, US"/>
          <img src="images/P1100235.JPG" alt="Moped racing in NY, US"/>
          <li class="hobbies">Model airplanes</li>
          <li class="hobbies"> Music </li> 
          <li class="hobbies">Graphic art</li>
        </ul>
        <div class="video">
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