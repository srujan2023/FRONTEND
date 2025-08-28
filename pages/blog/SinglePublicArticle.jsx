import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"


function SinglePublicArticle(){

    
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

    return(
        <div >
        <img className="image" width={'49%'}src={`http://localhost:5000/uploads/${article.image}`} alt="" />
    <h1>{article.title}</h1>
          {/* <p>Written By {article.userId?.name}</p> */}
          <button>Buy Now at Rs/-{article.price}</button>
    <p>{article.body}</p>
   
    
    </div>
    )
}

export default SinglePublicArticle