/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


   import { baseUrl } from '../baseUrl';
   import { fetchData } from '../helpers/fetchData';
   
   
   export function getUser(token,) {
   
       const url = `${baseUrl}/users`;

   
       return new Promise((resolve)=>{

   
           return fetchData(url,"POST", null, token).then((result)=>{

          

            return resolve(result);
   
   
           });
   
   
       });
   
   };
   
      
   