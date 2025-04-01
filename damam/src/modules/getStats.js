/** 
 *module that logout User
 * @param {object} token
 * @return {Promise}

*/


 import { baseUrl } from '../baseUrl';
 import { fetchData } from '../helpers/fetchData';
 
 
 export function getStats(token) {
 
     const url = `${baseUrl}/stats`;

 
     return new Promise((resolve)=>{

 
         return fetchData(url,"GET", null, token).then((result)=>{

        

          return resolve(result);
 
 
         });
 
 
     });
 
 };
 
    
 