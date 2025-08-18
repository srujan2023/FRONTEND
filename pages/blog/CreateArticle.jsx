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

    const navigate = useNavigate();

    const createFormsummited = async(e) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/blog/articles',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
               body: JSON.stringify({title,body,image,status})
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
        <p>Create Articles</p>
        <form onSubmit={createFormsummited}>
          <div>
              <label>Title</label>
            <input  onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter article title"/>
          </div>
          <br></br>
            <div>
              <label>Body</label>
            <textarea  onChange={(e)=>setBody(e.target.value)}type="text" placeholder="Enter article title"> </textarea>
          </div>
          <br></br>
          <div>
                <label>Status</label>
                <select value={status} onChange={(e) =>setStatus(e.target.value )}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
          </div>
          <br></br>
          <div>
            <label htmlFor="">Image Uploads</label>
            <br></br>
            <input type="file" onChange={uploadImage}/>
          </div>
          <br></br>
          <button >Create Article</button>
        </form>
        </>
    )

}
export default CreateArticle