let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCol = document.querySelector(".top-left-cell");
let allCell = document.querySelectorAll(".cell");
let addressBox = document.querySelector("#address");
let formulaBox = document.querySelector("#formula")
let lastSelectedCell;

cellContentsDiv.addEventListener("scroll", function (e) {
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    topRow.style.top = top + "px";
    topLeftCol.style.top = top + "px";
    topLeftCol.style.left = left + "px";
    leftCol.style.left = left + "px";

})


for (let i = 0; i < allCell.length; i++) {
    allCell[i].addEventListener("click", function (e) {

        let rowid = Number(e.target.getAttribute("rowid"));
        let colid = Number(e.target.getAttribute("colid"));
        //console.log(rowid + colid);
        let address = String.fromCharCode(colid + 65) + (rowid + 1) + "";
        //console.log(address);
        let cellObj = db[rowid][colid];
        addressBox.value = address;
        formulaBox.value =  cellObj.formula;

        cellObj.fontStyle.bold
      ? document.querySelector(".bold").classList.add("active-font-style")
      : document.querySelector(".bold").classList.remove("active-font-style");

      cellObj.fontStyle.italic
      ? document.querySelector(".italic").classList.add("active-font-style")
      : document.querySelector(".italic").classList.remove("active-font-style");

      cellObj.fontStyle.underline
      ? document.querySelector(".underline").classList.add("active-font-style")
      : document.querySelector(".underline").classList.remove("active-font-style");
    })
    allCell[i].addEventListener("blur", function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let rowid = Number(e.target.getAttribute("rowid"));
        let colid = Number(e.target.getAttribute("colid"));
        let cellObj = db[rowid][colid];
        //console.log("before" , cellObj);
        if(cellObj.value == cellValue){
            return;
        }

        if(cellObj.formula){
            removeFormula(cellObj);
            formulaBox.value ="";
        }

        cellObj.value = cellValue;
        //console.log("after" , cellObj);

        updateChildren(cellObj);
        //console.log(sheetsDB);

        if(cellObj.visited){
            return;
        }
        cellObj.visited = true;
        visitedCells.push({rowId:rowid , colId:colid})
        console.log(sheetsDB);
    } )

    allCell[i].addEventListener("keydown" , function(e){
        if(e.key == "Backspace"){
            let cell = e.target;
            let  {rowid , colid} = getRowidColidFromElement(cell);
            let cellObj= db[rowid][colid];
            if(cellObj.formula){
                cellObj.formula = "";
                formulaBox.value = "";
                removeFormula(cellObj);     
                cell.textContent ="";      
            }


        }
    } )
}

formulaBox.addEventListener("blur" ,function(e){
    let formula = e.target.value;
    let {rowid ,colid } =getRowidColidFromElement(lastSelectedCell);
    let cellObj = db[rowid][colid];

    if(formula && cellObj.formula != formula){

        if(cellObj.formula){
            removeFormula(cellObj);
        }

        cellObj.formula = formula; 

        let computedVal = solveFormula(formula ,cellObj)

        cellObj.value = computedVal;

        lastSelectedCell.textContent = computedVal;
        updateChildren(cellObj);
        //console.log(db);

        if(cellObj.visited){
            return;
        }
        cellObj.visited = true;
        visitedCells.push({rowId:rowid , colId:colid})
        console.log(sheetsDB);
        
    }
})
