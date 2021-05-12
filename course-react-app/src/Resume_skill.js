import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";



const Resume_skill = (props) => {
  let id = props.match.params.id;
  
const { register, handleSubmit, reset } = useForm()     
const [resume, setResume] = useState({
  skills: []
});

        const [values, setValues] = useState({
          name: "",
          phone: "",
          email: "",
          street_address: "",
          country: "",
          province: "",
          city: ""
        })
        useEffect(() => {
          async function fetchData() {
          const res = await fetch("http://localhost:3008/resume");
          res.json().then((res) => setResume(res));
            //.catch((err) => setErrors(err));
          }
          fetchData();
      }, []);
      const data = resume.skills[0]
    useEffect(() => {
      if(data) {
        setValues({
          skill: data.skill
        })
      }
    }, [data])


    // If entry field is not touched by user submit returns empty value


const onSubmit = async data => {
  await data
  if (!data.skill) return alert ('Please modify entry field')
  const response = await fetch(`http://localhost:3008/resume/skill/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  alert('Skill field successfully updated!')
  return response.json();
}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="skill">Edit skill</label>
        <input {...register("skill")} Value={values.skill} />
    
        
        <input type="submit" />
      </form>
    );
}

export default Resume_skill