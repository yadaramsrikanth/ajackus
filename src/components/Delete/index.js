import React from "react"
import { MdDelete } from "react-icons/md";
import "./index.css"

const Delete=({eachUser,onhandleData,errorhandling})=>{
    
    const {id}=eachUser
    const onclickDelete=async()=>{
        try{
            const url=`https://jsonplaceholder.typicode.com/users/${id}`
            const options={
                method:"DELETE"
            }
            await fetch(url,options)
            onhandleData(id)
        }catch(e){
            console.log("Error Deleting User:",e.message)
            errorhandling("Failed to delete User")
        }
       
    }
    return <button type="button" className="delete-button" onClick={onclickDelete}><MdDelete size={25}/></button>
}

export default Delete