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
    <center className="PublicArticles">
      <h2>Blog</h2>
    
    

      {articles ? (
        <div className="Articles">{articles.map((article)=>(
        <div key={article._id}>
           <p>Written By {article.user?.name}</p>
          <img  width={"50%"}src={`http://localhost:5000/uploads/${article.image}`} />
          <h2>{article.title}</h2>
          <NavLink to={`/blog/articles/${article._id}`}>Read More</NavLink>
        </div>
      ))}</div>):(<div>
        <p>No Articles</p>
      </div>)}
    </center>
    </>
  )
}
export default PublicArticles