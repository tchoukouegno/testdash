/** 
   *module that logout User
   * @param {object} token
   * @return {Promise}

 */


import { baseUrl } from '../baseUrl';
import { fetchData } from '../helpers/fetchData';


export function deconnexion (token) {

    const url = `${baseUrl}/logout`;

    return new Promise((resolve)=>{

        return fetchData(url,"POST", null, token).then((result)=>{


            if(result.statut === 200) {
             
                return resolve({message:"logout"});

            };

        });


    });

};

   
