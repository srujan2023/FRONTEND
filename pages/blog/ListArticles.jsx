import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { useAuthStore } from "../../src/stores/authStore"

function ListArticles(){
      const token = useAuthStore(state => state.token)
    
    const [articles,setArticles] = useState([])


    const getArticles = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/blog/articles",{
                  method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
        })

            const data = await response.json()

            console.log(data);

            setArticles(data.articles)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getArticles()
    },[])
    
  return(
    <>
     <h1>List All Articles</h1>
     <NavLink to={"/admin/blog/create"}>Create Article</NavLink>
     {articles ? (
             <div>
         {articles.map((article)=>(
            <div key={article._id}>
                <h2>{article.title}</h2>
                <p>Created By {article.user?.name}</p>
                <NavLink to={`/admin/blog/articles/${article._id}`}>View Article</NavLink>
            </div>

         ))}
             </div> )
             :(
              <div>
            <p>No Articles</p>
            </div>
        )}


    </>
  )
}
export default ListArticles