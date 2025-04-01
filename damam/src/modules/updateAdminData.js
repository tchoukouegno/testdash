import { validatePassword } from '../helpers/validatePassword';
import { baseUrl } from '../baseUrl';


export function updateAdminData(userMail, passwords) {


    const url = `${baseUrl}/password/update`;


    return new Promise ((resolve)=>{


    if(passwords === "") {

      return resolve({message:"veuillez remplire les champs"});

    };

   
    if(validatePassword(passwords ) === false){

        return  resolve({message:"Mot de passe invalide"});
  
      };

      console.log(userMail, passwords)

    const data = {email:userMail , password:passwords}

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

        return  resolve(result);

      })
      .catch((error) => {
        
        return resolve(error);

      });












    })









}