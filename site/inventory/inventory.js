console.log("local storage", JSON.parse(localStorage.getItem("listOfItems")));

const inventoryItems = JSON.parse(localStorage.getItem("listOfItems"));
const ul = document.querySelector(".inventory");
const form = document.querySelector("form");
const resetButton = document.querySelector("#reset");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const reportDate = formData.get("date");
  const completedInventory = inventoryItems.map((inventoryItem) => {
    const daysInSystem =
      (new Date(reportDate) - new Date(inventoryItem.dateAdded)) / 86400000;
    return {
      ...inventoryItem,
      startingSellinInDays: +inventoryItem.sellInDays,
      sellInDays: +inventoryItem.sellInDays - daysInSystem,
      quality: +inventoryItem.quality,
      daysInSystem,
    };
  });
  // .map(inventoryItemWithDaysPassed => {
  //   const { sellInDays, daysInSystem} = inventoryItemWithDaysPassed
  //   const timePassed = timePassedCalculator(sellInDays, daysInSystem)
  //   return {
  //     ...inventoryItemWithDaysPassed,
  //     timePassed
  //   }
  // })
  console.log(completedInventory);
  inventoryGenerator(completedInventory);
});

function inventoryGenerator(listOfItems) {
  listOfItems.forEach((item) => {
    const {
      itemCategory,
      itemName,
      sellInDays,
      quality,
      dateAdded,
      daysInSystem,
    } = item;
    console.log(item);
    const li = document.createElement("li");
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    const itemHeader = document.createElement("h3");
    const itemBody = document.createElement("div");
    itemBody.classList.add("item-body");
    itemHeader.textContent = upperCaseFirstLetter(itemName);
    itemBody.innerHTML = `
         <p>Category: ${itemCategory}</p>
         <p>Sell in ${sellInDays} days</p>
         <p>Quality: ${qualityChecker(qualityAdjustor(item))}</p>
         <p>Date added:</p> 
         <p>${dateFormater(dateAdded)}</p>
    `;
    itemContainer.append(itemHeader);
    itemContainer.append(itemBody);

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

// function timePassedCalculator(sellInDays, daysInSystem) {
//   console.log(sellInDays, daysInSystem)
//   console.log(sellInDays - daysInSystem)
//   return  sellInDays - daysInSystem;
// }

function qualityAdjustor(item) {
  const {
    itemCategory,
    daysInSystem,
    sellInDays,
    startingSellinInDays,
    quality,
  } = item;
  let adjustedQuality = quality + 1;

  switch (itemCategory) {
    case "None":
      const days = arrayGenerator(sellInDays, startingSellinInDays);
      for (const day of days) {
        if(day > 0){
          console.log(day)
          adjustedQuality = adjustedQuality - 1
          console.log(adjustedQuality)

        }else{
          console.log(day)
          adjustedQuality = adjustedQuality - 2
          console.log(adjustedQuality)
        }

       
}}return adjustedQuality
}


// case "Aged Brie":
//   return quality + daysInSystem;

// case "Conjured":
//   return quality - daysInSystem * 2;

// case "Sulfuras":
//   return 80;

// case "Backstage pass":
//   if(daysPassed >= 10){
//    return quality
//   }else if(){

//   }else{

//   }

function qualityChecker(quality) {
  console.log(quality);
  if (quality < 0) {
    return 0;
  } else if (quality > 50) {
    return 50;
  } else if (quality === 80) {
    return 80;
  } else {
    return quality;
  }
}

function arrayGenerator(startingPoint, endingPoint) {
  const array = [];
  for (let counter = startingPoint; counter <= endingPoint; counter++) {
    array.push(counter);
  }
  console.log(array);
  return array;
}

// [
//   {
//     itemName: "Snake",
//     sellInDays: 7,
//     itemCategory: "None",
//     quality: 43,
//     dateAdded: "2022-04-01",
//     daysInSystem: 8,
//   },
// ][
//   {
//     itemName: "Snake",
//     sellInDays: -7,
//     itemCategory: "None",
//     quality: 43,
//     dateAdded: "2022-04-01",
//     startingSellinInDays: 15,
//     daysInSystem: 22,
//   }
// ];

// if (sellInDays < 0) {
//   console.log("yikes")
//   return quality - (daysInSystem * 2);
// } else {
//   return quality - daysInSystem;
// }
