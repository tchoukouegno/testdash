/** 
   * component that manages the view manager
   * @param {} 
   * @return {html} jsx

 */
import { useEffect, useState} from 'react';
import {  NavLink, useNavigate, Outlet } from "react-router-dom";
import damamLogo2 from '../assets/logo/damamLogo2.png';
import acceuilDash from '../assets/img/acceuilDash.png';
import headerLogin from '../assets/img/headerLogin.png';
import Vector from '../assets/img/Vector.png'
import info from '../assets/icons/info.svg'
import { checkAuthentification } from '../modules/checkAuthentification';
import { snackbar } from '../widgets/snackbar';




export function Login() {

    let navigate = useNavigate();

    const[dataConnect, setDataConnect]= useState({email : "", password:"",});
    
    const handleSbumit= (e)=>{


        e.preventDefault();

        return checkAuthentification(dataConnect).then((result)=>{



            if(result.message === "veuillez remplire les champs") {


                return snackbar(document.querySelector("#root"),info, result.message, 3000);
       
            };

            if(result.message === "Adresse email invalide") {

         
                return snackbar(document.querySelector("#root"),info, 'Votre adresse email est incorrect', 3000);
       
            };

            if(result.message === "Mot de passe invalide") {

         
                return snackbar(document.querySelector("#root"),info, "Mot de passe invalide", 3000);
       
            };

            if(result.message === "Pas autorisé") {
         
                return snackbar(document.querySelector("#root"),info, 'Email ou Mot de Passe Incorrect ', 3000);

       
            };

            if(result.message === "connexion réussie") {

                return setDataConnect({email : "", password:"",}), snackbar(document.querySelector("#root"),info, 'Connexion réussie', 3000),setTimeout(()=>{return navigate('/manager/dashboard')},4000);       
       
            };
      

        })


        

    }

    const handleChange = (e)=>{

        const newdataConnect = {...dataConnect};
    
        newdataConnect[e.target.id]=e.target.value;       
    
        return setDataConnect(newdataConnect);
    
        };

    



    return(

        <div className='damam-login'>

                <img src={headerLogin} className='header-login'/>  


                <div className='login-content'>


                    <div className='picture-container'>

                        <img src={damamLogo2} className='damamLogo2'/>
                        <img src={acceuilDash} className='acceuilDash'/>




                    </div>

                    <div className='login-container'>

                        <h2 className='welcome'>Bienvenue sur <span className='login-name'>Damam</span></h2>
                        <h3 className='connexion-title'>Connexion</h3>

                            <form action="submit" onSubmit={handleSbumit} >

                           

                                <div className="input-wrapper">
                                    <label htmlFor="name">Entrer votre Adresse mail</label>
                                    <input autoFocus id='email' type="text" value={dataConnect.email} onChange={handleChange} className='input-login'   />
                                    {/*  autocomplete="off" */}
                                    {/* <input type="text" className='inputLogin' id="name" value={dataSign.name} onChange={handleChange} /> */}
                                </div>


                                <div className="input-wrapper">
                                    <label htmlFor="password">Entrer votre mot de passe</label>
                                    <input  id='password' value={dataConnect.password} onChange={handleChange} className='input-login'   />
                                    {/* <input type={isShowPassword ?  "text": "password"} className='inputLogin' id="password" value={dataSign.password}  onChange={handleChange} /> */}
                                    {/* <img src={isShowPassword ? eyeSolid : eyeSlash} className= {isShowPassword ? 'eyeSolid': 'eyeSlash'} onClick={handleShowPassword}     /> */}
                                    {/* autocomplete="new-password" */}
                                </div>

                                <button className="login-button">connexion</button>


                            </form>



                        
                    </div>






                </div>


                <img src={Vector} className='vector-login'/> 

            

           
        </div>




    )





}