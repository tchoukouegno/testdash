/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


   import { baseUrl } from '../baseUrl';
   import { fetchData } from '../helpers/fetchData';
   
   
   export function updatePercent(data, token) {
   
       const url = `${baseUrl}/rate/update`;
   
       return new Promise((resolve)=>{
   
           return fetchData(url,"POST", data, token).then((result)=>{
   
              return resolve(result);
   
           });
   
   
       });
   
   };
   
      
   