import React,{useEffect,useState} from "react";
import Popup from "reactjs-popup";
import  Delete from "../Delete"
import AddUser from "../AddUser"
import Edit from "../Edit"

import "reactjs-popup/dist/index.css"
import { RxCross2 } from "react-icons/rx";

import "./index.css"
const Home=()=>{
    const [users,setUsers]=useState([])
    const [error,setError]=useState("")
    

    

const onClickEditUserDetails=(data)=>{
   console.log(data)
   setUsers((prevUser)=>prevUser.map((eachuser)=>eachuser.id===data.id?{...eachuser,...data}:eachuser))
}    

//GET REQUEST

const getUsersData=async()=>{
    try{
    const url="https://jsonplaceholder.typicode.com/users"
    const options={method:"GET"}
    const response=await fetch(url,options)
    const responsedata=await response.json()
    console.log(responsedata)
    const usersdata=responsedata.map((eachUser)=>({
        id:eachUser.id,
        name:eachUser.name,
        email:eachUser.email,
        department:"Not Assigned"
   
}))
    setUsers(usersdata)

}catch(e){
    console.log("Error Fetching Users: ",e.message)
    setError("Failed to Fetch Users")    
}
}

const addNewUserData=(data)=>{
    console.log(data)
    setUsers((prevdata)=>[...prevdata,data])
}

const onhandleData=(id)=>{
    const filteredData=users.filter((eachUser)=>eachUser.id!==id)
    setUsers(filteredData)
}

const errorhandling=(error)=>{
    setError(error)
}



    useEffect(()=>{
        getUsersData()
    },[])

    return (<div className="home-container">
        
        <h1 className="user-management-heading">User Management Dashboard</h1>
        <Popup trigger={<button className="add-user-button-home">ADD NEW USER</button>} modal>
        {(close)=>(
            <div className="pop-up-container">
            <button type="button" onClick={close} className="cancel-button">
            <RxCross2 />
              </button>
            <AddUser addNewUserData={addNewUserData}/>
           
              </div>
        )}
        </Popup>
        
        <div className="table-headings">
            <h1 className="table-column">ID</h1>
            <h1 className="table-column">USERNAME</h1>
            <h1 className="table-column">EMAIL</h1>
            <h1 className="table-column">DEPARTMENT</h1>
            <h1 className="table-column">ACTIONS</h1>
        </div>
        <ul className="users-unordered-list">
            {users.map((eachUser,index)=>{
                return <li key={eachUser.id} className="users-list-card">
                    {error!==""?<p>{error}</p>:<>
                    <p className="user-id">{index+1}</p>
                    <p className="user-name">{eachUser.name}</p>
                    <p className="user-email">{eachUser.email}</p>
                    <p className="user-department">{eachUser.department}</p>
                    <Edit eachUser={eachUser} onClickEditUserDetails={onClickEditUserDetails}/>
                    <Delete onhandleData={onhandleData} eachUser={eachUser} errorhandling={errorhandling}/>
                    
                    </>}
                    </li>
            })}
        </ul>
        
    </div>)
}

export default Home