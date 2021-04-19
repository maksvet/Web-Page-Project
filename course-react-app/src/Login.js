import React, { useState } from "react";
import { useHistory } from "react-router-dom";

  const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [jwt, setJwt] = useState("")
  const formSubmit = async event => {
    event.preventDefault()
    const response = await fetch('http://localhost:3008/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        const payload = await response.json()
        if (response.status >= 400) {
          alert(`Oops! Error: ${payload}`)
        } else {
            localStorage.setItem('token', payload.token)
            setJwt(payload.token)
            //const storedJwt = localStorage.getItem('token')
            alert(`You are logged in!`)
            history.push("/entriespage");
            

        }
        
  }


    return(
        <div>
        <h1>Admin login</h1>
      <form onSubmit={formSubmit}>
      <label htmlFor="name"></label>
      <input type="email" id="email" name="email" placeholder="Your email..." required value={email} onChange={e => setEmail(e.target.value)}/>
  
      <label htmlFor="password"></label>
      <input type="password" id="password" name="password" placeholder="Your password..." required value={password} onChange={e => setPassword(e.target.value)}/>
    <input type="submit" value="Submit"/>
    </form>
    </div>
   )
    
  
}
 
export default Login;