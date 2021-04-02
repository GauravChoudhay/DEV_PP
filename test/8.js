let decn = 45;

let ans = decToBin(decn);
function decToBin(decn) {
    let binn = 0;

    let i = 0;
    while (decn != 0) {
        let rem = decn % 2;
        decn = decn / 2;
        binn = Math.pow(10, i) * rem + binn;
        i++;

    }
    return binn;
}
console.log(bin);