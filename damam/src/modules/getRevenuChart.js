/** 
 *module that logout User
 * @param {object} token
 * @return {Promise}

*/


import { baseUrl } from '../baseUrl';
import { fetchData } from '../helpers/fetchData';


export function getRevenuChart(token) {

    
    const url = `${baseUrl}/graphs `;

    return new Promise((resolve)=>{


        return fetchData(url,"GET", null, token).then((result)=>{  

         return resolve(result);


        });


    });

};

   
