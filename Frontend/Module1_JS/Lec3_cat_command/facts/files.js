let fs = require("fs");

let fileKaData = fs.readFileSync("./f1.txt");
fileKaData += "" ;

let data = fileKaData.split("\r\n");

//-s
let removelines = [];
removeEnter(data)

function removeEnter(data){
    let isline = false;
    for(let i =0;i<data.length;i++ ){
        if(data[i] == '' && !isline ){
            removelines.push(data[i]);
            isline =true;
        }
        else if(!data[i]=='' ){
            removelines.push(data[i]);
        }
    }
    let joinedString = removelines.join("\n")
    console.log(joinedString);
}

//-b
addNumberToEmptyLine(data);

function addNumberToEmptyLine(data){
    let count=1;
    for(let i =0;i<data.length;i++){
        if(data[i] !=''){
            data[i] = `${count}.${data[i]}`
            count++;
        }
    }
    let addedNumberLine = data.join("\n");
console.log(addedNumberLine)
}

//-n 
addNumberToAllLine(data);

function addNumberToAllLine(data){
    for(let i =0;i<data.length;i++){
        
        data[i] = `${i+1}.${data[i]}`
    }
    let addedLineNumber = data.join("\n");
    console.log(addedLineNumber);
}
