/** 
 *module that logout User
 * @param {object} token
 * @return {Promise}

*/


 import { baseUrl } from '../baseUrl';
 import { fetchData } from '../helpers/fetchData';
 
 
 export function getLitiges( urlPage, token) {
 
     
    console.log(urlPage)
 
     return new Promise((resolve)=>{

 
         return fetchData(urlPage,"GET", null, token).then((result)=>{

            console.log(result)

        

          return resolve(result);
 
 
         });
 
 
     });
 
 };
 
    
 