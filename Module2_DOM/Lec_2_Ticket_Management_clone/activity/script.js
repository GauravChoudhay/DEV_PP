let filterCodes = {
    "red": "#e22324",
    "blue": "#39a1f1",
    "green": "#00b894",
    "yellow": "#f9ca24"
}
let filterBoxes = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".ticket-container");
let openModalBtn = document.querySelector(".open-modal");
let closeModalBtn = document.querySelector(".close-modal");





function loadTickets() {

    if (localStorage.getItem("allTickets")) {
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        ticketContainer.innerHTML = "";
        for (let i = 0; i < allTickets.length; i++) {
            let ticketObject = allTickets[i];
            //console.log(ticketObject);

            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = `<div class="ticket-filter ${ticketObject.ticketFilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">#${ticketObject.ticketId}</div>
            <div class="ticket-delete">
            <i class="fas fa-trash" id =${ticketObject.ticketId} ></i>
            </div>
            </div>
            <div class="ticket-content">${ticketObject.ticketContent}</div>`;

            ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handelDeleteTicket);
            ticketDiv.querySelector(".ticket-filter").addEventListener("click" , toggleTicketFilter);

            ticketContainer.append(ticketDiv);
        }
    }

}

loadTickets();

function toggleTicketFilter(e){
    let filters = ["red" , "blue" , "green" , "yellow"];
    let currentFilter = e.target.classList[1];
    let idx = filters.indexOf(currentFilter);
    idx++;
    idx = idx%filters.length;
  
    let currentTicket = e.target;
    currentTicket.classList.remove(currentFilter);
    currentTicket.classList.add(filters[idx]);
  
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let id = currentTicket.nextElementSibling.children[0].textContent.split("#")[1];
    console.log(id);
  
    for(let i=0 ; i<allTickets.length ; i++){
      if(allTickets[i].ticketId == id){
        allTickets[i].ticketFilter = filters[idx];
        break;
      }
    }
  
    localStorage.setItem("allTickets" , JSON.stringify(allTickets));
  }


function handelDeleteTicket(e){
    console.log("clicked");
    let ticketToBeDeleted  = e.target.id;

    let allTickets  = JSON.parse(localStorage.getItem("allTickets"));   
    filteredTickets = allTickets.filter(function(tObj){
        return tObj.ticketId !=ticketToBeDeleted;

    })
     localStorage.setItem("allTickets" , JSON.stringify(filteredTickets));
     loadTickets();
}

let selectedFilter = "yellow";
openModalBtn.addEventListener("click", openModalBox);
closeModalBtn.addEventListener("click", closeModalBox);

function closeModalBox(e) {
    if (document.querySelector(".modal")) {
        document.querySelector(".modal").remove();
    }
}

function openModalBox(e) {
    let modal = document.querySelector(".modal");
    if (modal) {
        return;
    }
    let modalDiv = createModal();

    ticketContainer.append(modalDiv);
}

function createModal() {
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    modalDiv.innerHTML = `<div class="modal-textbox" data-typed = "false" contenteditable="true">
    Enter your task here!!!!
</div>
<div class="modal-filter-options">
    <div class="modal-filter red"></div>
    <div class="modal-filter blue"></div>
    <div class="modal-filter green"></div>
    <div class="modal-filter yellow active-filter"></div>
</div>`

    modalDiv.querySelector(".modal-textbox").addEventListener("click", clearModalTextBox);
    modalDiv.querySelector(".modal-textbox").addEventListener("keypress", addTickets);

    let allModalFilters = modalDiv.querySelectorAll(".modal-filter");

    for (let i = 0; i < allModalFilters.length; i++) {
        allModalFilters[i].addEventListener("click", chooseModalFilter)
    }

    return modalDiv;
}

function chooseModalFilter(e) {
    //console.log(e);
    let selecetdModalFilter = e.target.classList[1];
    if (selecetdModalFilter == selectedFilter) {
        return;
    }

    selectedFilter = selecetdModalFilter;
    document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
    e.target.classList.add("active-filter");
}

function addTickets(e) {

    if (e.key == "Enter") {
        // console.log(e);
        let ticketId = uid();
        let modalText = e.target.textContent;
        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        ticketDiv.innerHTML = `<div class="ticket-filter ${selectedFilter}"></div>
        <div class="ticket-info">
        <div class="ticket-id">#${ticketId}</div>
        <div class="ticket-delete">
        <i class="fas fa-trash" id =${ticketId} ></i>
        </div>
        </div>
        <div class="ticket-content">${modalText}</div>`

        ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handelDeleteTicket);
        ticketDiv.querySelector(".ticket-filter").addEventListener("click" , toggleTicketFilter);
        
        if (!document.querySelector(".filter.active-filter")) {
            
            ticketContainer.append(ticketDiv);
        }
        else if (document.querySelector(".filter.active-filter").classList[1] == selectedFilter) {
            
            ticketContainer.append(ticketDiv);
        }
        
        e.target.parentNode.remove();
        
        let allTickets;
        if (!localStorage.getItem('allTickets')) {
            
            allTickets = [];
        }
        else {
            
            allTickets = JSON.parse(localStorage.getItem("allTickets"));
            
        }
        let ticketObject = {};
        ticketObject.ticketId = ticketId;
        ticketObject.ticketFilter = selectedFilter;
        ticketObject.ticketContent = modalText;
        allTickets.push(ticketObject);
        
        localStorage.setItem("allTickets", JSON.stringify(allTickets));
        
        selectedFilter = "yellow";
    }
    
    
    
}
function clearModalTextBox(e) {
    if (e.target.getAttribute("data-typed") == "true") {
        return;
    }
    e.target.innerHTML = "";
    e.target.setAttribute("data-typed", "true");
}


for (let i = 0; i < filterBoxes.length; i++) {
    filterBoxes[i].addEventListener("click", changeContainerClr);
    //console.log(i);
}

function changeContainerClr(e) {
    //console.log(e);

    if (e.target.classList.contains("active-filter")) {
        e.target.classList.remove("active-filter");
        loadTickets();
        return;
    }
    if (document.querySelector(".filter.active-filter")) {

        document.querySelector(".filter.active-filter").classList.remove("active-filter");
    }

    e.target.classList.add("active-filter");

    let ticketFilter = e.target.classList[1];

    loadSelectedTickets(ticketFilter);

}

function loadSelectedTickets(ticketFilter) {


    if (localStorage.getItem("allTickets")) {
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        ticketContainer.innerHTML = "";
        for (let i = 0; i < allTickets.length; i++) {
            let ticketObject = allTickets[i];
            //console.log(ticketObject);
            if (ticketObject.ticketFilter != ticketFilter) {
                continue;
            }
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = `<div class="ticket-filter ${ticketObject.ticketFilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">#${ticketObject.ticketId}</div>
            <div class="ticket-delete">
            <i class="fas fa-trash" id =${ticketObject.ticketId} ></i>
            </div>
            </div>
        
            <div class="ticket-content">${ticketObject.ticketContent}</div>`;

            ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handelDeleteTicket);
            ticketDiv.querySelector(".ticket-filter").addEventListener("click" , toggleTicketFilter);

            ticketContainer.append(ticketDiv);
        }
    }
}
