import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore";



function SinglePublicArticle(){
    const user = useAuthStore(state =>state.user);
    const token = useAuthStore(state => state.token);

    const [article,setArticles]= useState({})
    const params = useParams();

    
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

    
    const getOrder = async() =>{
        try {
          const response = await fetch (`http://localhost:5000/api/blog/articles/public/${params.articleId}`,{
              method:"GET",
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`

             },
        })

          const data = await response.json();

         console.log(data);

         if(!data.order){
            getSingleArticle()
         }

          setArticles(data.order.article);

        } catch (error) {
           // console.log(error);
            
        }
    }
    useEffect(()=>{
        if(user){
        getOrder()
        }else{
            getSingleArticle()
        }
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

        getOrder();
        
    } catch (error) {
        console.log(error);
    }
    }

    return(
        <div >
        <img className="image" width={'49%'}src={`http://localhost:5000/uploads/${article.image}`} alt="" />
    <h1>{article.title}</h1>
          {/* <p>Written By {article.userId?.name}</p> */}
          {
            article.price > 0 ? (!article.body &&  <button onClick={buyArticle}>Buy Now at Rs/-{article.price}</button>)
             : null
          }
        
    <p>{article.body}</p>
   
    
    </div>
    )
}

export default SinglePublicArticle