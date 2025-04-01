/** 
   * function that sends the data to a server  
   * @param {string} url
   * @param {object} data
   * @return {html} json

 */ 



export function uploadData(url, methodName, data = null, token) {


    return new Promise((resolve)=>{

        const options = {method: methodName, headers: {'Content-Type': 'multipart/form-data','Accept': 'application/json','Authorization': `Bearer ${token}`}, }

        if(data !== null){ options.body = data;}

        return fetch(url,options).then((response)=>{

            console.log(response)
            
    
            return response.json();

        }).then((result)=>{

            console.log(result)
    
            return resolve(result);

        }).catch((error)=>{

            console.log(result)
    
           return resolve(error);
        })


    })


}