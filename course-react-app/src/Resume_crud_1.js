import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

//import "./styles.css";

const Resume_crud_1 = () => {
const { register, handleSubmit, reset } = useForm()     
const [resume, setResume] = useState({
    personal_info : [],
    skills: [],
    qualifications: [],
    work_experience: [],
    education: [],
    training: []
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
        const data = resume.personal_info[0]
      useEffect(() => {
        if(data) {
          setValues({
            name: data.name,
            phone: data.phone,
            email: data.email,
            street_address: data.street_address,
            country: data.country,
            province: data.province,
            city: data.city
          })
        }
      }, [data])

// If field not touched submit returns empty value


// handleSubmit(async (data) => await
//     fetch(`http://localhost:3008/resume/personal`, {
//     method: "put",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },

//     //make sure to serialize your JSON body
//     body: JSON.stringify(data),
//   }).then((response) => response.json())

// )

const onSubmit = async data => {
    await data;
    console.log(data)
    //reset();



  };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
       
        <input {...register("name")} Value={values.name}/> 
        <input {...register("phone")} Value={values.phone}/>
        <input {...register("email")} Value={values.email}/>
        <input {...register("street_address")} Value={values.street_address}/>
        <input {...register("city")} Value={values.city}/>
        <input {...register("province")} Value={values.province}/>
        <input {...register("country")} Value={values.country}/>
    
        
        <input type="submit" />
      </form>
    );
}

export default Resume_crud_1