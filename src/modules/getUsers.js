/** 
 *module that logout User
 * @param {object} token
 * @return {Promise}

*/


 import { baseUrl } from '../baseUrl';
 import { fetchData } from '../helpers/fetchData';
 
 
 export function getUsers( urlPage, token) {
 
     

 
     return new Promise((resolve)=>{

 
         return fetchData(urlPage,"GET", null, token).then((result)=>{

        

          return resolve(result);
 
 
         });
 
 
     });
 
 };
 
    
 