/** 
 *module that checks update profil
 * @param {object} formData
 *  @param {string} token
 * @return {Promise}

*/


 import { baseUrl } from '../baseUrl';

 import { fetchData } from "../helpers/fetchData";
 
    
 
 export function getMessages (data,token) {
 
     const url = `${baseUrl}/user_message`;
     
     return new Promise ((resolve)=>{

      console.log(data)
 
         return fetchData(url,'POST', data,token).then((result)=>{
 
             console.log(result)
             return resolve(result); 
 
 
         });
 
 
 
     });
 
 
 
 
 
 
 
 
    }