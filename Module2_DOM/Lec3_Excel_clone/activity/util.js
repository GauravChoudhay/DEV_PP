function solveFormula(formula ,selfCellObj){
    let formulaComps = formula.split(" ");

    for(let i=0;i<formulaComps.length;i++){

        let formComp = formulaComps[i];

        if(formComp[0] >= "A" && formComp[0] <= "Z" ){
            let {rowid , colid} = getRowidColidFromAddress(formComp);
            let cellObj = db[rowid][colid];

            let value = cellObj.value;

            if(selfCellObj){
                cellObj.children.push(selfCellObj.name);
                selfCellObj.parent.push(cellObj.name);
            }


            formula = formula.replace(formComp,value);

        }
    }
    return eval(formula);
}

function updateChildren(cellObj){

    for(let i =0 ; i<cellObj.children.length ;i++){
        let {rowid , colid} = getRowidColidFromAddress(cellObj.children[i]);
        let childrenCellObj = db[rowid][colid];

        let newValue = solveFormula(childrenCellObj.formula);

        document.querySelector(`div[rowid = '${rowid}'][colid = '${colid}']`).textContent = newValue;

        childrenCellObj.value = newValue;

        updateChildren(childrenCellObj);
    }
}

function removeFormula(cellObj){
    cellObj.formula = "";

    for(let i =0;i<cellObj.children.length;i++){
        let {rowid , colid} = getRowidColidFromAddress(cellObj.parent[i]);
        let parentCellObj = db[rowid][colid];

        let updatedChildren = parentCellObj.children.filter(function(children){
            return children != cellObj.name;
        })

        parentCellObj.children = updatedChildren;

    }
    cellObj.parent = [];
}

function getRowidColidFromAddress(address){
    let rowid = Number(address.substring(1)) - 1;
    let colid = address.charCodeAt(0) - 65;
    return{
        rowid,colid
    }

}

function getRowidColidFromElement(element){
    let rowid = element.getAttribute("rowid");
    let colid = element.getAttribute("colid");
    return{
        rowid,colid
    }

}
