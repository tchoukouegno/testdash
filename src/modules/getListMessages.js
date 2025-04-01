/** 
 *module that checks update profil
 * @param {object} formData
 *  @param {string} token
 * @return {Promise}

*/


import { baseUrl } from '../baseUrl';

import { fetchData } from "../helpers/fetchData";

   

export function getListMessages (token) {

    const url = `${baseUrl}/discussion/admin`;
    
    return new Promise ((resolve)=>{

     
        return fetchData(url,'GET', null,token).then((result)=>{

            console.log(result)
            return resolve(result); 


        });



    });








   }