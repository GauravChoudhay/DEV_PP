let menu = document.querySelector(".menu");
let fileMenuOptions = document.querySelector(".file-menu-options");
let homeMenuOptions = document.querySelector(".home-menu-options");

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

menu.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu")) {
    return;
  }

  let selectedMenu = e.target;
  if (selectedMenu.classList.contains("active-menu")) {
    return;
  }

  document.querySelector(".active-menu").classList.remove("active-menu");

  selectedMenu.classList.add("active-menu");
  let menuName = selectedMenu.classList[0];
  if (menuName == "home") {
    homeMenuOptions.classList.remove("hide");
    fileMenuOptions.classList.add("hide");
  } else {
    homeMenuOptions.classList.add("hide");
    fileMenuOptions.classList.remove("hide");
  }
});

bold.addEventListener("click", function (e) {
 setFontStyle("bold" , bold);
});
italic.addEventListener("click", function (e) {
 setFontStyle("italic" , italic);
});
underline.addEventListener("click", function (e) {
 setFontStyle("underline" , underline);
});

function setFontStyle(styleName , element){
  if (lastSelectedCell) {
    let { rowid, colid } = getRowidColidFromElement(lastSelectedCell);
    let cellObject = db[rowid][colid];
    // pehle se true tha
    if (cellObject.fontStyle[styleName]) {
      // UI pe changes krdia
      if(styleName == "bold"){
        lastSelectedCell.style.fontWeight = "normal";
      }
      else if(styleName == "italic"){
        lastSelectedCell.style.fontStyle = "normal";
      }
      else{
        lastSelectedCell.style.textDecoration = "none"
      }
      element.classList.remove("active-font-style");
    } else {
      if(styleName == "bold"){
        lastSelectedCell.style.fontWeight = "bold";
      }
      else if(styleName == "italic"){
        lastSelectedCell.style.fontStyle = "italic";
      }
      else{
        lastSelectedCell.style.textDecoration = "underline"
      }
      element.classList.add("active-font-style");
    }
    // change in db
    cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
  }
}