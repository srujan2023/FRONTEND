import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore"

function UpdateArticle(){
    const token = useAuthStore(state => state.token)
  
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image,setImage] = useState('')
    const [article,setArticles] = useState({})
    const [status,setStatus] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    const updateFormSubmited = async(e) =>{
        e.preventDefault();
        console.log('form Submitted');
            const response = await fetch(`http://localhost:5000/api/blog/articles/${params.articleId}`,{
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`

             },
               body: JSON.stringify({title,body,image,status})
            })
            const data = await response.json();

            console.log(data);
             
            navigate('/admin/blog')
        
    } 

   const getSingleArticle = async() =>{
            try {
              const response = await fetch (`http://localhost:5000/api/blog/articles/${params.articleId}`,{
                    method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
          })  
     
    
              const data = await response.json();
    
              console.log(data);
    
              setArticles(data.article)
              setTitle(data.article.title)
              setBody(data.article.body)
              setImage(data.article.image)
              setStatus(data.article.status)
              
            } catch (error) {
                console.log(error);     
            }
        }
        useEffect(()=>{
            getSingleArticle()
        },[])


        //Image Update Function
         const uploadImage = async(e) =>{
      console.log(e.target.files[0]);

      const formdata = new FormData();

      formdata.append('image',e.target.files[0]);

      const response = await fetch('http://localhost:5000/api/uploads',{
             method: 'POST',
               body:formdata,
             headers: {
                 Authorization:`Bearer ${token}`
             },
          })  

            const data = await response.json();
            
            console.log(data);

            setImage(data.image)
            
    }
    return(
        <>
        Update Article
        <br>
        </br>
        <br></br>
         <form onSubmit={updateFormSubmited}>
          <div>
              <label>Title</label>
            <input defaultValue={article.title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter article title"/>
          </div>
          <br></br>
            <div>
              <label>Body</label>
            <textarea defaultValue={article.body} onChange={(e)=>setBody(e.target.value)} placeholder="Enter article title"/>
          </div>
          <br></br>
          <br></br>
          <div>
            <label>Status</label>
            <select  defaultValue={article.status}value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='public'>Public</option>
               <option value='private'>Private</option>
            </select>
          </div>
          <br>
          </br>
           <div>
            <label htmlFor="">Image Uploads</label>
            <br></br>
            <input type="file" onChange={uploadImage}/>
          </div>
          <br></br>
          <button >Update Article</button>
        </form>
        </>
    )
}
export default UpdateArticle