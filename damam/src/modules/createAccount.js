/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


   import { baseUrl } from '../baseUrl';
   import { fetchData } from '../helpers/fetchData';
   
   
   export function createAccount (data, token) {
   
       const url = `${baseUrl}/accounts`;
   
       return new Promise((resolve)=>{
   
           return fetchData(url,"POST", data, token).then((result)=>{
   
   
              return resolve(result)
   
           });
   
   
       });
   
   };
   
      
   