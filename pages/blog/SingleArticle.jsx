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
        <img width={'100%'}src={`http://localhost:5000/uploads/${article.image}`} alt="" />
    <h1>{article.title}</h1>
    <p>{article.body}</p>
    <br></br>
    <NavLink to={`/admin/blog/article-edit/${article._id}`}>Update Article</NavLink>

    <br />
    <br></br>
    <button onClick={deleteButtonClicked}>Delete</button>
    </>
    )
}

export default SingleArticle