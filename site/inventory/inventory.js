console.log("local storage", JSON.parse(localStorage.getItem("listOfItems")));

const inventoryItems = JSON.parse(localStorage.getItem("listOfItems"));
const ul = document.querySelector(".inventory");
const form = document.querySelector("form");
const resetButton = document.querySelector("#reset");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const reportDate = formData.get("date");
  const inventoryWithDays = inventoryItems.map((inventoryItem) => {
    const daysInSystem =
      (new Date(inventoryItem.dateAdded) - new Date(reportDate)) / 86400000;
    return {
      ...inventoryItem,
      daysInSystem,
    };
  });
  inventoryGenerator(inventoryWithDays);
});

function inventoryGenerator(listOfItems) {
  listOfItems.forEach((item) => {
    const { itemCategory, itemName, sellInDays, quality, dateAdded, daysInSystem } = item   
    const li = document.createElement("li");
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    const itemHeader = document.createElement("h3");
    const itemBody = document.createElement("div");
    itemBody.classList.add("item-body");
    itemHeader.textContent = upperCaseFirstLetter(itemName);
    itemBody.innerHTML = `
         <p>Category: ${itemCategory}</p>
         <p>Sell in ${sellInDaysReductor(sellInDays, daysInSystem)} days</p>
         <p>Quality: ${qualityAdjustor(daysInSystem, itemCategory, quality)}</p>
         <p>Date added: ${dateFormater(dateAdded)}</p>
    `;
    itemContainer.append(itemHeader);
    itemContainer.append(itemBody)

    li.append(itemContainer);
    ul.append(li);
  });
}



resetButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function dateFormater(dateString) {
  return new Date(dateString).toString().slice(3, 15);
}

function sellInDaysReductor(sellInDays, daysInSystem){
     return +sellInDays + +daysInSystem
}


function qualityAdjustor(daysInSystem, category, quality){
     
   if(category === "None"){
     return  +quality + +daysInSystem
}else if(category === "Aged Brie"){
     return  +quality - +daysInSystem
}else if(category === "Conjured"){
     return  +quality + (+daysInSystem*2)
}else if(category === "Backstage pass"){
     return  +quality - +daysInSystem
}else if(category === "Sulfuras"){
     return  80
}

}