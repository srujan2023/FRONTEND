import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore";



function SinglePublicArticle(){
  //  const token = useAuthStore(store =>state.user);
    const token = useAuthStore(state => state.token);


    
    const [article,setArticles]= useState({})
    const params = useParams();

    //const navigate = useNavigate()

    
    const getSingleArticle = async() =>{
        try {
          const response = await fetch (`http://localhost:5000/api/blog/articles/public/${params.articleId}`)

          const data = await response.json();

         console.log(data);

          setArticles(data.article);

        } catch (error) {
           // console.log(error);
            
        }
    }
    useEffect(()=>{
        getSingleArticle()
    },[])

     const buyArticle = async ()=>{
    try {
        const response = await fetch(`http://localhost:5000/api/blog/orders`,{
            method:"POST",
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`

             },
           body:JSON.stringify({article:params.articleId})
          })  

        const data = await response.json();

        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
    }

    return(
        <div >
        <img className="image" width={'49%'}src={`http://localhost:5000/uploads/${article.image}`} alt="" />
    <h1>{article.title}</h1>
          {/* <p>Written By {article.userId?.name}</p> */}
          <button onClick={buyArticle}>Buy Now at Rs/-{article.price}</button>
    <p>{article.body}</p>
   
    
    </div>
    )
}

export default SinglePublicArticle