import { useState } from "react"
import { useNavigate } from "react-router"
import {useAuthStore} from "../../src/stores/authStore"
import toast from "react-hot-toast"



function CreateArticle (){
  const token = useAuthStore(state => state.token)

    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image,setImage]= useState('')
    const [status,setStatus] = useState('private')
    const [price,setPrice] = useState('')

    const navigate = useNavigate();

    const createFormsummited = async(e) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/blog/articles',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
               body: JSON.stringify({title,body,image,status,price})
            })
            const data = await response.json()

            if(!response.ok){
              console.log(data);
              

              if(Array.isArray(data.error)){
                data.error.map((err) =>{
                  toast.error(err);
                })
              }else{
                toast.error(data.error)
              }
              return 
            }

             console.log(data);
          navigate('/admin/blog')
    }
 

    //Image Upload function
    const uploadImage = async(e) =>{
    //conlog nalli image deatils display aguthe
      console.log(e.target.files[0]);
      const formdata = new FormData();
      formdata.append('image',e.target.files[0]);

      const response = await fetch('http://localhost:5000/api/uploads',{
             method: 'POST',
               body:formdata,
            })
            const data = await response.json();
            
            console.log(data);

            setImage(data.image)
            
    }

    return(
        <>
       <b> <p className="bg-blue-400 h-10 text-center">Create Article Here</p></b>
       <div className="pl-60  bg-stone-300 py-6  h-105" >
         <form className="bg-blue-200 rounded-4xl h-70 text-center py-6 border pl-19 w-150" onSubmit={createFormsummited}>
          <div>
              <label>Title: </label>
            <input  onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter article title"/>
          </div>
            <div>
              <label className="pr-2.5">Body: </label>
            <textarea  onChange={(e)=>setBody(e.target.value)}type="text" placeholder="Enter article title"> </textarea>
          </div>
          <div className="py-5.5 pr-26.5">
          <label>Status</label>
                <select value={status} onChange={(e) =>setStatus(e.target.value )}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
          </div>
          <div className=" pb-5.5 pr-43.5">
            <label htmlFor="">Image</label>
            <br></br>
            <input type="file" onChange={uploadImage}/>
          </div>
          <button className="bg-green-400 px-1.5 rounded-4xl" >Create Article</button>
       
        </form>
        </div>
        </>
    )

}
export default CreateArticle