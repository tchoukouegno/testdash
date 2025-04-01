/** 
 *module that logout User
 * @param {object} token
 * @return {Promise}

*/


 import { baseUrl } from '../baseUrl';
 import { fetchData } from '../helpers/fetchData';
 
 
 export function getCars( urlPage, token) {
 
     

 
     return new Promise((resolve)=>{

        console.log(urlPage)

 
         return fetchData(urlPage,"GET", null, token).then((result)=>{

        

          return resolve(result);
 
 
         });
 
 
     });
 
 };
 
    
 