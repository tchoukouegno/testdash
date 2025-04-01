/** 
   *module that checks connexion
   * @param {object} data
   * @return {Promise}

 */

import { validateEmail } from "../helpers/validateEmail";
import { validatePassword } from "../helpers/validatePassword";
import { baseUrl } from '../baseUrl';





export function checkAuthentification (data) {



    const url = `${baseUrl}/login_admin`;


    return new Promise ((resolve)=>{


    if(data.email === "" || data.password === "") {

      return resolve({message:"veuillez remplire les champs"});

    };

   
    if(validateEmail(data.email) === false){

      return  resolve({message:"Adresse email invalide"});

    };


    if(validatePassword(data.password ) === false){

      return  resolve({message:"Mot de passe invalide"});

    };

    const dataToSend = {
      method: "POST",
      headers: {'Content-Type': 'application/json','Accept': 'application/json'},
      body: JSON.stringify(data)
      
    };

   return fetch(url, dataToSend)

      .then((response) => {

        console.log(response)

        return response.json();

      })
      .then((result) => {

        if(result.message === "Invalid login credentials") {

          return resolve({message:"Pas autorisé"});       
 
        };


        if(result.status === 200) {

          console.log(result)

          return localStorage.setItem('userId',JSON.stringify(result?.user_id)), localStorage.setItem('token',JSON.stringify(result?.access_token)),localStorage.setItem('role',JSON.stringify(result?.role)), resolve({message:"connexion réussie",});       
 
        };

      })
      .catch((error) => {
        
        return resolve(error);

      });












    })

















}