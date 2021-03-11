import React, { useState } from "react";

  const Login = (props) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const formSubmit = async event => {
    event.preventDefault()
    const response = await fetch('http://localhost:3007/contact_form/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, password})
        })
        const payload = await response.json()
        if (response.status >= 400) {
          alert(`Oops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            setName("")//clearing the input fields on submit
            setPassword("")
            alert(`You are logged in!`)
        }
        
  }


    return(
        <div>
        <h1>Admin login</h1>
      <form onSubmit={formSubmit}>
      <label htmlFor="name"></label>
      <input type="text" id="name" name="name" placeholder="Your username..." required value={name} onChange={e => setName(e.target.value)}/>
  
      <label htmlFor="password"></label>
      <input type="password" id="password" name="password" placeholder="Your password..." required value={password} onChange={e => setPassword(e.target.value)}/>
    <input type="submit" value="Submit"/>
    </form>
    </div>
   )
    
  
}
 
export default Login;