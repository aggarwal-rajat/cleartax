const ScreenData = {
    selectedSeats:["A-2", "C-8"],
    Cateogries: [
        {
            name: "Club",
            price: "236",
            maxRowCapacity: 15,
            rows: [{
                name: "A",
                seats: 15
            },
            {
                name: "B",
                seats: 14
            }]
        },
        {
            name: "Executive",
            price: "350",
            maxRowCapacity: 15,
            rows: [{
                name: "C",
                seats: 9
            },
            {
                name: "D",
                seats: 9
            },
            {
                name: "E",
                seats: 9
            },
            {
                name: "F",
                seats: 9
            },
            {
                name: "G",
                seats: 13
            },
            {
                name: "H",
                seats: 13
            },
            {
                name: "I",
                seats: 13
            },
            {
                name: "J",
                seats: 13
            }]
        }
    ]
};

const screenLayout = document.getElementById('screenLayout');
const seats = document.getElementsByClassName("seatBox");
let numberOfSeats = 3;
let currentSelection = [];

function renderUi(){
    ScreenData.Cateogries.forEach(category => {
        screenLayout.appendChild(populateSection(category));
    });
    for (var i = 0; i < seats.length; i++) {
        seats[i].addEventListener('click', updateSeats, false);
    }
}

function populateSection(category){
    const cotainerClub = document.createElement("section");
    const labelHeader = document.createElement("div");
    labelHeader.className="labelHeader";
    labelHeader.innerText = `${category.name} - Rs ${category.price}`
    cotainerClub.appendChild(labelHeader);
    category.rows.forEach(row => {
        cotainerClub.appendChild(populateRow(row, category.maxRowCapacity));
    });
    return cotainerClub;
}

function populateRow(row, maxSeats){
    const rowSection = document.createElement("div");
    rowSection.className= "rowSection";
    const rowName = document.createElement("div");
    rowName.className="rowName";
    rowName.innerText = row.name;
    rowSection.appendChild(rowName);
   for(let i=maxSeats; i>maxSeats- row.seats; i--){
    const seatBox = document.createElement("div");
    seatBox.innerText = i;
    seatBox.className = "seatBox";
    const seatNumber = row.name+"-"+i;
    seatBox.id = seatNumber;
    seatBox.setAttribute("seat-number", seatNumber);
    if(ScreenData.selectedSeats.indexOf(seatNumber) > -1){
        seatBox.classList.add("selected");
    }
    rowSection.appendChild(seatBox)
   }
  return rowSection;
}

function updateSeats(){
const selectedSeats = this.getAttribute("seat-number");
if(ScreenData.selectedSeats.indexOf(selectedSeats) > -1){
    return false;
}else{
    const index = currentSelection.indexOf(selectedSeats);
    if(currentSelection.length == numberOfSeats){
       const firstItem =  currentSelection.shift();
        console.log(currentSelection);
        document.getElementById(firstItem).classList.remove("selected");
    }
    if(index > -1){
        this.classList.remove("selected");
        currentSelection.splice(index, 1)
    }else{
        this.classList.add("selected");
        currentSelection.push(selectedSeats)
    }
}

document.getElementById("totalPrice").innerText = `Total Price : Rs ${currentSelection.length * 236}`
}

function changeNumberOfSeats(){
    let x = document.getElementById("numberOfSeats").value;
    numberOfSeats = parseInt(x);
}

renderUi();