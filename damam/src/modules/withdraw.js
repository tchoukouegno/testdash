/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


   import { baseUrl } from '../baseUrl';
   import { fetchData } from '../helpers/fetchData';
   
   
   export function withdraw(data, token) {
   
       const url = `${baseUrl}/retrait_argent`;
   
       return new Promise((resolve)=>{
   
           return fetchData(url,"POST", data, token).then((result)=>{
     
              return resolve(result)
   
           });
   
   
       });
   
   };
   
      
   