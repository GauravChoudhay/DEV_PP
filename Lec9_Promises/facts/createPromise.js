const fs = require("fs");


function mypromisifiedfun(filePath){
    return new Promise(function(resolve,reject){
        fs.readFile(filePath , function(error,data){
            if(error){
                reject(error);
            }
            else if(data){
                resolve(data);
            }
        })
    })
}





let pendingPromise = mypromisifiedfun("./f1.txt");

pendingPromise.then(function(data){
    console.log(data+"");
})

pendingPromise.catch(function(error){
    console.log(error);
})