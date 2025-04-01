import { fetchData } from "../helpers/fetchData";
import { validatePassword } from "../helpers/validatePassword";
import {validateEmail} from "../helpers/validateEmail";
import { baseUrl } from '../baseUrl';





export function checkChangePassword (dataModify,token) {



    const url = `${baseUrl}/change_password`;


    return new Promise ((resolve)=>{

       

    if(dataModify.email === "" || dataModify.oldPassword === "" || dataModify.newPassword === "" ) {

      return resolve({message:"veuillez remplire les champs"});

    };

   
    if(validateEmail(dataModify.email) === false){

      return  resolve({message:"Adresse email invalide"});

    };


    if(validatePassword(dataModify.oldPassword ) === false || validatePassword(dataModify.newPassword ) === false){

      return  resolve({message:"Mot de passe invalide"});

    };

    if(dataModify.oldPassword === dataModify.newPassword){

        return  resolve({message:"Entrez un nouveau mot de passe"});
  
      };

    //   if(dataModify.newPassword !== dataModify.confirmPassword){

    //     return  resolve({message:"Mauvaise confirmation du mot de passe"});
  
    //   };

      const data={email:dataModify.email , old_password:dataModify.oldPassword, new_password:dataModify.newPassword }
  

   
   return fetchData(url,"POST",data, token).then((result)=>{

        console.log(result)

        if(result.statut === 200) {

            return resolve({message:"mot de passe change"})


        }

        if(result.statut === 403) {

            return resolve({message:"Pas Autorise"})


        }



        return resolve(result)





   })











    })







}