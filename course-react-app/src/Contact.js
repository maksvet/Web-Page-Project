import React, { Component } from "react";
 
class Contact extends Component {
  render() {
    return (
      <form onsubmit="return false">
      <label for="name"></label>
      <input type="text" id="name" name="name" placeholder="Your name..." required/>
  
      <label for="email"></label>
      <input type="email" id="email" name="email" placeholder="Your email..." required/>
  
      <label for="message"></label>
      <textarea id="message" name="message" placeholder="Your message..." required></textarea>
    <input type="submit" value="Submit" onclick="messsageSent()"/>
    </form>
    );
  }
}
 
export default Contact;