import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore";



function SinglePublicArticle(){
    const user = useAuthStore(state =>state.user);
    const token = useAuthStore(state => state.token);

    const [article,setArticle]= useState({})
    const params = useParams();

    
    const getSingleArticle = async() =>{
        try {
          const response = await fetch (`http://localhost:5000/api/blog/articles/public/${params.articleId}`)

          const data = await response.json();

         console.log(data);

          setArticle(data.article);

        } catch (error) {
        }
    }

    
    // const getOrder = async() =>{
    //     try {
    //       const response = await fetch (`http://localhost:5000/api/blog/orders/${params.articleId}`,{
    //           method:"GET",
    //          headers: {
    //              'Content-Type': 'application/json',
    //              Authorization:`Bearer ${token}`
    //          },
    //     })

    //       const data = await response.json();
    //       console.log(data);

    //       setArticle(data.order.article);

    //     } catch (error) {
    //     }
    // }

    useEffect(()=>{
      getSingleArticle()
    },[])












    //  const buyArticle = async ()=>{
    // try {
    //     const response = await fetch(`http://localhost:5000/api/blog/orders`,{
    //         method:"POST",
    //          headers: {
    //              'Content-Type': 'application/json',
    //              Authorization:`Bearer ${token}`

    //          },
    //        body:JSON.stringify({article:params.articleId})
    //       })  

    //     const data = await response.json();

    //     console.log(data);
    //      getOrder();
        
    // } catch (error) {
    //     console.log(error);
    // }
    // }




    return(
        <div className=" bg-stone-300" >
      <center>
          <img className="rounded-4xl pt-5 px-7 " width={'49%'}src={`http://localhost:5000/uploads/${article.image}`} alt="" />
   <b> <h1>{article.title}</h1></b>
    <i><p className="pb-36">{article.body}</p></i>
    
      </center>
    
    </div>
    )
}

export default SinglePublicArticle