function funfirst(fullname){
    fullname  = fullname.split(" ");
    return fullname[0];

}
function funlast(fullname){
    fullname  = fullname.split(" ");
    return fullname[01];

}
function sayhi(fullname, fun){
    let name = fun(fullname);
    console.log(name);
}

sayhi("tonny stark" , funfirst);
sayhi("thor singh" , funfirst);

//split
let name = "tonny stark kumar"
console.log(name.split("") )
