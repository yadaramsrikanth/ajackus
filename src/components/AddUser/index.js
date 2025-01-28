import React,{useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./index.css"
const AddUser=({addNewUserData})=>{
    const [formData,setFormdata]=useState({firstName:"",lastName:"",email:"",department:""})
    const [userResponse,setUserResponse]=useState("")
const onhandleInputChnage=(e)=>{
    const {name,value}=e.target
    setFormdata((prevData)=>({
        ...prevData,
        [name]:value
    }))
}

    const handleSubmit=async(event)=>{
        event.preventDefault()
        console.log(formData)
        
        const name=`${formData.firstName} ${formData.lastName}`;
        const updatedFormData={...formData,name,id:uuidv4(),lastName:undefined,firstName:undefined}
        const url="https://jsonplaceholder.typicode.com/users"
        const options={method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({formData:updatedFormData})
        }
        try{
            const response=await fetch(url,options)
            const responsedata=await response.json()
            console.log(responsedata)
            const {name,email,department,id}=responsedata.formData
            setUserResponse("User added successfully")
            setFormdata({firstName:"",lastName:"",email:"",department:""})
            addNewUserData({name,email,department,id})

        }catch(e){
            console.log("Error: ",e.message)
            setUserResponse("Failed")
        }
    }


    return <div className="add-user-container">
        <h1 className="add-new-user">Add New User</h1>
        <form className="form-data-container" onSubmit={handleSubmit}>
            <label className="label-element" htmlFor="first-name">First Name: </label>
            <input name="firstName" onChange={onhandleInputChnage} value={formData.firstName} type="text" required className="input-element" id="first-name" placeholder="Enter First Name..."/>
            <label className="label-element" htmlFor="last-name">Last Name: </label>
            <input name="lastName" onChange={onhandleInputChnage} value={formData.lastName} type="text" required className="input-element" id="last-name" placeholder="Enter Last Name..."/>
            <label className="label-element" htmlFor="email">Email: </label>
            <input name="email" onChange={onhandleInputChnage} value={formData.email} type="email" required className="input-element" id="email" placeholder="Enter Email..."/>
            <label className="label-element" htmlFor="department">Department: </label>
            <input  value={formData.department} name="department" onChange={onhandleInputChnage} type="text" required className="input-element" id="department" placeholder="Enter Department..."/>
            <button type="submit" className="add-user-button">ADD USER</button>
            <p style={{"color":"red","fontSize":"18px","textAlign":"center"}}>{userResponse}</p>
        </form>
    </div>
}

export default AddUser