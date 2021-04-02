let givenobj = {
    name: {
        first: "robin",
        last: "negi",
    },
    address: {
        city: {
        name: "Gwalior",
        },
        landmark: "Badri Marg",
        street: "22",
    },
    };


  let sortedObj = {};
  
  //console.log(givenobj.length);
  for(key in givenobj){
      for(key1 in key){
          console.log(givenobj[key][key1]);
      }
  }