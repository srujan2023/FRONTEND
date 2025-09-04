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
    < >
   <div className=" bg-stone-300">
     <b> <h1 className="text-center bg-blue-400 h-12 pt-3">List All Articles</h1></b>
    <NavLink className='px-3.5  bg-green-500 rounded-4xl' to={"/admin/blog/create"}>Create Article</NavLink>
     {articles ? (
             <div className="text-center">
         {articles.map((article)=>(
            <div key={article._id}>
        <center>  <img className="rounded-2xl h-74 py-1.5" src={`http://localhost:5000/uploads/${article.image}`} />
</center>                <h2>{article.title}</h2>
                <p>Created By {article.user?.name}</p>
                <NavLink className='bg-green-400 rounded-4xl px-1.5' to={`/admin/blog/articles/${article._id}`}>View Article</NavLink>
            </div>

         ))}
             </div> )
             :(
              <div>
            <p>No Articles</p>
            </div>
        )}

   </div>

    </>
  )
}
export default ListArticles