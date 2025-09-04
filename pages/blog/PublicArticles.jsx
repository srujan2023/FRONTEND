import { useEffect, useState } from "react"
import { NavLink } from "react-router"

function PublicArticles(){
  const [articles,serArticles] = useState([]);

  const ListPublicArticles = async()=>{
    try {
      const response = await fetch('http://localhost:5000/api/blog/articles/public')

      const data = await response.json();

      console.log(data);

      serArticles(data.articles)
      
    } catch (error) {
        console.log(error);
              
    }
  }

  useEffect(()=>{
    ListPublicArticles()
  },[])

  return(
    <>
    <center className=" bg-stone-300">
      <h2 className="text-2xl bg-pink-400 h-13.5 py-2.5"><b>Blog Page</b></h2>
      {articles ? (
        <div className="py-2.5">{articles.map((article)=>(
        <div className="" key={article._id}>
           <p className="pr-74.5 pt-8 text-fuchsia-900  h-14 " >Written By {article.user?.name}</p>
          <img className="rounded-2xl w-130 " src={`http://localhost:5000/uploads/${article.image}`} />
          <h2 className="w-5xl">{article.title}</h2>
          <NavLink className= '  bg-green-400 rounded-2xl ' to={`/blog/articles/${article._id}`}> Read more  </NavLink>
        </div>
      ))}</div>):(<div>
        <p>No Articles</p>
      </div>)}
    </center>
    </>
  )
}
export default PublicArticles