import React, { useState } from "react";

 
// class Contact extends Component {
//   render()
const Contact = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [content, setContent] = useState("")
  const formSubmit = async event => {
    event.preventDefault()
    const response = await fetch('http://localhost:3007/contact_form/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, email, phoneNumber, content})
        })
        const payload = await response.json()
        if (response.status !== 200) {
            alert(`Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            alert(`Your message successfully submitted`)
        }
  }


    return(
      <form onSubmit={formSubmit}>
      <label for="name"></label>
      <input type="text" id="name" name="name" placeholder="Your name..." required value={name} onChange={e => setName(e.target.value)}/>
  
      <label for="email"></label>
      <input type="email" id="email" name="email" placeholder="Your email..." required value={email} onChange={e => setEmail(e.target.value)}/>

      <label for="phoneNumber"></label>
      <input type="phoneNumber" id="phoneNumber" name="phoneNumber" placeholder="Your phone number..." required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
  
      <label for="message"></label>
      <textarea id="message" name="message" placeholder="Your message..." required value={content} onChange={e => setContent(e.target.value)}></textarea>
    <input type="submit" value="Submit"/>
    </form>
   )
    
  
}
 
export default Contact;