import React,{useEffect, useState} from "react"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"
import { RxCross2 } from "react-icons/rx";

import "./index.css"

const Edit=({onClickEditUserDetails,eachUser})=>{
     const [edituserdata,setedituserdata]=useState({firstName:"",lastName:"",email:"",department:""})
    const [error,setError]=useState("")
    
    const onchnageEditUserDetails=(e)=>{
        const {name,value}=e.target
        setedituserdata((prevdata)=>({
            ...prevdata,[name]:value
        }))
    }
    
        const onhandleedituseData=async(e)=>{
            e.preventDefault()
            const url=`https://jsonplaceholder.typicode.com/users/${eachUser.id}`
            const name=`${edituserdata.firstName} ${edituserdata.lastName}`
            const updateduserdata={...edituserdata,name,firstName:undefined,lastName:undefined}
            const options={
                method:"PUT",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(updateduserdata)
            }
            try{
                const response=await fetch(url,options)
                const responsedata=await response.json()
                console.log(responsedata)
                onClickEditUserDetails(responsedata)
                setError("User Details Edited Successfully")
                setedituserdata({firstName:"",lastName:"",email:"",department:""})
                
            }catch(e){
                console.log("Error: ",e.message)
            }
        }
    
    
    

        useEffect(() => {
            // Set form data only if the fields are not already populated (on initial load)
              setedituserdata({
                firstName: eachUser.name.split(" ")[0] || "",
                lastName: eachUser.name.split(" ")[1] || "",
                email: eachUser.email || "",
                department: eachUser.department || "",
              });
            }, [eachUser]);

    return <Popup trigger={<button className="edit-button">EDIT</button>} modal>
            {(close)=>(
                <div className="edit-popup-container">
                <button type="button" onClick={close} className="cancel-button">
                            <RxCross2 />
                              </button>
                
                <div className="edit-user-details-container">
                <h1 className="edit-user-heading">EDIT USER DETAILS</h1>
                <form className="edit-user-form-container" onSubmit={onhandleedituseData}>
                <label  className="edit-label-element" htmlFor="edit-first-name">First Name:</label>
                <input value={edituserdata.firstName} name="firstName" onChange={onchnageEditUserDetails} type="text" placeholder="Edit User First Name..." id="edit-first-name" className="edit-input-element"/>
                <label className="edit-label-element" htmlFor="edit-last-name">Last Name:</label>
                <input value={edituserdata.lastName}  name="lastName" onChange={onchnageEditUserDetails} type="text" placeholder="Edit User Last Name..." id="edit-last-name" className="edit-input-element"/>
                <label className="edit-label-element" htmlFor="edit-email">Email:</label>
                <input value={edituserdata.email} name="email" onChange={onchnageEditUserDetails} type="email" placeholder="Edit User Email..." id="edit-email" className="edit-input-element"/>
                <label className="edit-label-element" htmlFor="edit-department">Department:</label>
                <input value={edituserdata.department} name="department"  onChange={onchnageEditUserDetails} type="text" placeholder="Edit User Department..." id="edit-department" className="edit-input-element"/>
                <button type="submit" className="save-button-in-edit-form">SAVE</button>
                <p style={{"color":"red","fontSize":"15px","textAlign":"center"}}>{error}</p>
                </form>
            </div>
            </div>
            )}
        </Popup>
}

export default Edit