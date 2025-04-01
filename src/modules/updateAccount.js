/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


   import { baseUrl } from '../baseUrl';
   import { fetchData } from '../helpers/fetchData';
   
   
   export function updateAccount(data, token) {
   
       const url = `${baseUrl}/accounts`;
   
       return new Promise((resolve)=>{
   
           return fetchData(url,"PUT", data, token).then((result)=>{
   
              return resolve(result)
   
           });
   
   
       });
   
   };
   
      
   