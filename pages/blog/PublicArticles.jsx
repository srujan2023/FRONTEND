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
    <center className="bg-sky-300">
      <h2 className="text-2xl"><b>Blog Page</b></h2>
      {articles ? (
        <div className="py-2.5">{articles.map((article)=>(
        <div key={article._id}>
           <p className="pr-170.5">Written By {article.user?.name}</p>
          <img className="rounded-2xl w-230 h-120" src={`http://localhost:5000/uploads/${article.image}`} />
          <h2>{article.title}</h2>
          <NavLink  to={`/blog/articles/${article._id}`}>Read More</NavLink>
        </div>
      ))}</div>):(<div>
        <p>No Articles</p>
      </div>)}
    </center>
    </>
  )
}
export default PublicArticles