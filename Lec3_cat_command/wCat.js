let fs = require("fs");
let content = process.argv.slice(2);
//console.log(content);

let flags = [];
let files = [];

for(let i =0; i<content.length;i++){
    if(content[i].startsWith("-") ){
        flags.push(content[i]);
    }
    else{
        files.push(content[i]);
    }
}
//console.log(flags);
//console.log(files);
let fileKaData = "";
for(let i =0; i<files.length; i++){
    fileKaData += fs.readFileSync(files[i]) + "\r\n";
}

let data  = fileKaData.split("\r\n");

if(flags.includes("-s")){
    data = removeEnter(data);
}
function removeEnter(data){
    let isline = false;
    let removelines =[];
    for(let i =0;i<data.length;i++ ){
        if(data[i] == '' && !isline ){
            removelines.push(data[i]);
            isline =true;
        }
        else if(!data[i]=='' ){
            removelines.push(data[i]);
        }
    }
    return removelines;
}

if(flags.includes("-n") && flags.includes("-b") ){

    if( flags.indexOf("-n") > flags.indexOf("-b")   ){

        addNumberToEmptyLine(data);
    }
    else{

        addNumberToAllLine(data);

    }
}
else if(flags.includes("-b")){
    addNumberToEmptyLine(data);
}

else if(flags.includes("-n")){
    addNumberToAllLine(data);
}

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
function addNumberToAllLine(data){
    for(let i =0;i<data.length;i++){
        
        data[i] = `${i+1}.${data[i]}`
    }
    let addedLineNumber = data.join("\n");
    console.log(addedLineNumber);
}
