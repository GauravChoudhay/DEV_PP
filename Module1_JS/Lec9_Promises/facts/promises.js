const fs = require("fs");


let pendingPromise= fs.promises.readFile("./f1.txt");

console.log(pendingPromise);


//scb
pendingPromise.then(function(data){
    console.log(data+"");
    console.log(pendingPromise);
});

pendingPromise.catch(function(error){
    console.log(error);
})


//fcb