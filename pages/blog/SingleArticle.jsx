import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore";

function SingleArticle(){
          const token = useAuthStore(state => state.token)
    const [article,setArticles]= useState({})
    const params = useParams();

    const navigate = useNavigate()

    
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
          
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        getSingleArticle()
    },[])

    const deleteButtonClicked = async ()=>{
    try {
        const response = await fetch(`http://localhost:5000/api/blog/articles/${params.articleId}`,{
            method:"DELETE",
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
          })  

        const data = await response.json();

        console.log(data);
        

        navigate('/admin/blog')
    } catch (error) {
        console.log(error);
    }
    }
    return(
        <>
       <div className="bg-stone-300 h-130">

        <center>
         <img className="pt-5.5 rounded-4xl"  src={`http://localhost:5000/uploads/${article.image}`} alt="" />
       <b>  <h1>{article.title}</h1>
</b>    <p>{article.body}</p>
        </center>
   
    <br></br>
   <div className="px-95 ">
     <NavLink className='bg-green-400 px-1.5 rounded-4xl' to={`/admin/blog/article-edit/${article._id}`}>Update Article</NavLink>
    <button className='bg-red-500 px-1.5 rounded-4xl ' onClick={deleteButtonClicked}>Delete</button>
   </div>
       </div>
    </>
    )
}

export default SingleArticle