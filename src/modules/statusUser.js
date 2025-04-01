/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


   import { baseUrl } from '../baseUrl';
   import { fetchData } from '../helpers/fetchData';
   
   
   export function statusUser (data, token) {
   
       const url = `${baseUrl}/accounts/status`;
   
       return new Promise((resolve)=>{
   
           return fetchData(url,"POST", data, token).then((result)=>{
   
   
              return resolve(result)
   
           });
   
   
       });
   
   };
   
      
   