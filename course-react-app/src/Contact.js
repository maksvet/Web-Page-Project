import React, { useState } from "react";

  const Contact = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [content, setContent] = useState("")
  const formSubmit = async event => {
    event.preventDefault()
    const response = await fetch('https://fs1040course-project-p2xhr6rraq-nn.a.run.app/contact_form/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, email, phone, content })
        })
        const payload = await response
      //alert(payload)
        if (response.status >= 400) {
          alert(`Oops! Error: ${payload.error}`)//fields require validation
        } else {
            setName("")//clearing the input fields on submit
            setEmail("")
            setPhone("")
            setContent("")
            alert(`Your message successfully submitted`)
        }
        
  }


    return(
      <form onSubmit={formSubmit}>
      <label htmlFor="name"></label>
      <input type="text" id="name" name="name" placeholder="Your name..." required value={name} onChange={e => setName(e.target.value)}/>
  
      <label htmlFor="email"></label>
      <input type="email" id="email" name="email" placeholder="Your email..." required value={email} onChange={e => setEmail(e.target.value)}/>

      <label htmlFor="phoneNumber"></label>
      <input type="phoneNumber" id="phoneNumber" name="phoneNumber" placeholder="Your phone number..." required value={phone} onChange={e => setPhone(e.target.value)}/>

      <label htmlFor="message"></label>
      <textarea id="message" name="message" placeholder="Your message..." required value={content} onChange={e => setContent(e.target.value)}></textarea>
    <input type="submit" value="Submit"/>
    </form>
   )
    
  
}
 
export default Contact;