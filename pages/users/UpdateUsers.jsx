import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore"

function UpdateSingleUser(){
    const token = useAuthStore(state => state.token)
  
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')
    const [user,setUser] = useState({})
  
    const params = useParams()
    const navigate = useNavigate()


   const getSingleUser = async() =>{
            try {
              const response = await fetch (`http://localhost:5000/api/blog/users/${params.userId}`,{
                    method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
          })  
              const data = await response.json();
    
              console.log(data);
    
                  setUser(data.user)
              setName(data.user.name)
              setEmail(data.user.email)
              setRole(data.user.role)

          
              
            } catch (error) {
                console.log(error);     
            }
        }
        useEffect(()=>{
            getSingleUser()
        },[])

        const UpdateUserFormSubmited = async(e) =>{
        e.preventDefault();
        console.log('form Submitted');
            const response = await fetch(`http://localhost:5000/api/blog/users/${params.userId}`,{
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`

             },
               body: JSON.stringify({name,email,role})
            })
            const data = await response.json();

            console.log(data);
             
            navigate('/admin/users')
        
    } 

   return(
        <div>
        Update Article

          <form onSubmit={UpdateUserFormSubmited}>
          <div>
              <label>Name</label>
            <input defaultValue={user.name} onChange={(e)=>setName(e.target.value)} type="text"/>
          </div>
          <br></br>
            <div>
              <label>Email</label>
            <input type="Email" defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <br></br>
          <br></br>
           <label>Role</label>
            <select  defaultValue={user.role}value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='user'>user</option>
               <option value='admin'>admin</option>
            </select>
           <br></br>
           <br/>
          <button >Update User</button>
        </form> 
    </div>
  )
}

export default UpdateSingleUser
