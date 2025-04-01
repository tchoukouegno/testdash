/** 
   * function that sends the data to a server  
   * @param {string} url
   * @param {object} data
   * @param {string} token
   * @param {string} methodName
   * @return {JSON} 

 */ 




export function fetchData(url, methodName, data = null, token) {


    return new Promise((resolve)=>{

        console.log(url)

        const options = {method: methodName, headers: {'Content-Type': 'application/json','Accept': 'application/json','Authorization': `Bearer ${token}`}, }

        if(data !== null){ options.body = JSON.stringify(data);}

        return fetch(url,options).then((response)=>{

            console.log(response)

           
    
            return response.json();

        }).then((result)=>{
    
            return resolve(result);

        }).catch((error)=>{
    
          return  resolve(error);

        })


    })


}