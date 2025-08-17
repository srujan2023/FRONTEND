import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { Navigate, NavLink, useNavigate } from 'react-router'
import toast from 'react-hot-toast';


const authStore = (set,get) => ({
    token:localStorage.getItem('token') || null,
    user:null,

    //GetProfile Function
    getProfile:  async() =>{
         try {        
                      const response = await fetch (`http://localhost:5000/api/auth/profile`,{
                          method:"GET",
                           headers: {
                         'Content-Type': 'application/json',
                         "Authorization":`Bearer ${get().token}`
                       }
                      })  
            
                      const data = await response.json();
            
                       if(response.ok){
                        
                          console.log(data)
        
                      set({user:data})
                      
                      }
            
                    
                    } catch (error) {
                       console.log(error);  
                   }
    },

    //Register Function
    register:async(name,email,password) =>{
         try {
              const response = await fetch('http://localhost:5000/api/auth/register',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
               body: JSON.stringify({name,email,password})
            })
            const data = await response.json()

             if(!response.ok){
             console.log(data);

             if(Array.isArray(data.error)){
              data.error.map((err) =>{
                toast.error(err);
              });
             }else{
             toast.error(data.error)
            }
              return;
            }

             localStorage.setItem('token',data.token)

             set({token:data.token})

             get().getProfile();

          } catch (error) {
           //  console.log(data);
          }
           
    },

    //Login Function
    login:async(email,password) =>{
         try {
              const response = await fetch('http://localhost:5000/api/auth/login',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
               body: JSON.stringify({email,password})
            })
            const data = await response.json()
            if(!response.ok){
            console.log(data);
             toast.error(data.error)
              return;
            }


              //LocalStorge nalli token na save maduthe
             localStorage.setItem('token',data.token)

              set({token:data.token})

             get().getProfile();

          } catch (error) {
              console.log(data);
          }
    },

    //UpdateProfile Function
    updateProfile:async(name) =>{
          try {        
                      const response = await fetch (`http://localhost:5000/api/auth/profile`,{
                          method:"PUT",
                           headers: {
                         'Content-Type': 'application/json',
                         "Authorization":`Bearer ${get().token}`
                     },
                     body:JSON.stringify({name}),
                      })  
            
                      const data = await response.json();

                    
                      console.log(data)
        
                      get().getProfile()

      Navigate('/myprofile')

                      
                    } catch (error) {
                       console.log(error);  
                   }
                 },

  //Logout Function
    logout:() =>{
        localStorage.removeItem('token');
        set({token:null,user:null})
    },
});

export const useAuthStore = create(devtools(authStore,{name:'AuthStore'}))