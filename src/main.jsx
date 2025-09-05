import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter,Routes,Route} from 'react-router'
import ListArticles from '../pages/blog/ListArticles.jsx'
import SingleArticle from '../pages/blog/SingleArticle.jsx'
import CreateArticle from '../pages/blog/CreateArticle.jsx'
import UpdateArticle from '../pages/blog/UpdateArticle.jsx'
import PublicArticles from '../pages/blog/PublicArticles.jsx'
import SinglePublicArticle from '../pages/blog/SinglePublicArticle.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Myprofile from '../pages/Myprofile.jsx'
import Editprofile from '../pages/Editprofile.jsx'
import Home from '../Home.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import ProtectedAuth from './ProtectedAuth.jsx'
import ListUsers from '../pages/users/ListUsers.jsx'
import ListSingleUsers from '../pages/users/ListSingleUsers.jsx'
import UpdateUsers from '../pages/users/UpdateUsers.jsx'
import ProtectedAdmin from './ProtectedAdmin.jsx'
import About from '../pages/blog/About.jsx'
import Servers from '../pages/blog/Servers.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
         <Route  path='/' element={<App />} >
       <Route path='/' element={<Home />} />
       <Route path='/Servers' element={<Servers />} />
 
       <Route path='/About' element={<About />} />

      <Route path='/blog' element={<PublicArticles />} />
       <Route path='/blog/articles/:articleId' element={<SinglePublicArticle />} />



    
        

      <Route element={<ProtectedAuth/>}>
        <Route path='/blog/login' element={<Login/>} />
        <Route path='/blog/Register' element={<Register/>} />
          <Route path='/admin/blog/article-edit/:articleId' element={<UpdateArticle />} />

      </Route>


        <Route element={<ProtectedRoutes/>}>
     <Route path='/myprofile' element={<Myprofile/>} />
        <Route path='/myprofile/edit' element={<Editprofile/>} />


        <Route element={<ProtectedAdmin/>}>
          <Route path='/admin/users' element={<ListUsers/>} />
        <Route path='/admin/users/:userId' element={<ListSingleUsers/>} />
        <Route path='/admin/users/:userId/edit' element={<UpdateUsers/>} />
        <Route path='/admin/blog' element={<ListArticles />} />
         <Route path='/admin/blog/articles/:articleId' element={<SingleArticle />} />
          <Route path='/admin/blog/create' element={<CreateArticle />} />
      </Route>
      </Route>
</Route>
     </Routes>
    </BrowserRouter>
  </StrictMode>,
)
