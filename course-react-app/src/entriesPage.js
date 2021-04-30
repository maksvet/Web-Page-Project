import React, { useState } from "react";


  const EntriesPage = (props) => {
    const [entries, setEntries] = useState([]);
  const loadEntries = async event => {
    event.preventDefault()
    const jwt = localStorage.getItem('token')
    const response = await fetch('http://localhost:3008/contact_form/entries', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
        })
    const payload = await response.json()
    setEntries(payload)
    }
    

    return (
      <div>
        <h1>Entries page</h1>
        <button onClick={loadEntries}>Load Entries</button>
        <section className="container">
          <div id="Entries">
            {entries.map((item, key) => (
              <li key={item.id}>
                ID: {item.input_id}; Time: {item.time_stamp}; Name: {item.name}; Email: {item.email}; Phone
                number: {item.phone}; Message: {item.content}
              </li>
            ))}
          </div>
        </section>
      </div>
    );
    
  
}
 
export default EntriesPage;