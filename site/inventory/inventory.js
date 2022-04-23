const localStorageItems = JSON.parse(localStorage.getItem("listOfItems"));
const ul = document.querySelector(".inventory");
const form = document.querySelector("form");
const resetButton = document.querySelector("#reset");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const reportDate = formData.get("date");
  const completedInventory = localStorageItems.map(inventoryItem => {
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
  inventoryGenerator(completedInventory);
});

function inventoryGenerator(listOfItems) {
  listOfItems
  .filter(listItem => listItem.sellInDays <= listItem.startingSellinInDays)
  .forEach((item) => {
    const { itemCategory, itemName, sellInDays, dateAdded } = item;
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

function qualityAdjustor(item) {
  const {
    itemCategory,
    daysInSystem,
    sellInDays,
    startingSellinInDays,
    quality,
  } = item;
  const days = arrayGenerator(sellInDays, startingSellinInDays);
  let adjustedQuality

  switch (itemCategory) {
    case "None":
      adjustedQuality = quality + 1
      for (const day of days) {
        if (day > 0) {
          adjustedQuality = adjustedQuality - 1;
        } else {
          adjustedQuality = adjustedQuality - 2;
        }
      }
      return adjustedQuality;

    case "Conjured":
       adjustedQuality = quality + 2
      for (const day of days) {
        if (day > 0) {
          adjustedQuality = (adjustedQuality - 2);
        } else {
          adjustedQuality = (adjustedQuality - 4);
        }
      }
      return adjustedQuality;

    case "Backstage pass":
      if (sellInDays > 0) {
        adjustedQuality = quality - 1;
        for (const day of days) {
          if (day > 10) {
            adjustedQuality = adjustedQuality + 1;
          } else if (day <= 10 && day > 5) {
            adjustedQuality = adjustedQuality + 2;
          } else if (day <= 5 && day > 0) {
            adjustedQuality = adjustedQuality + 3;
          } else {
            adjustedQuality = 0;
          }
        }
        return adjustedQuality;
      } else {
        return 0;
      }

    case "Aged Brie":
      return quality + daysInSystem;

    case "Sulfuras":
      return 80;
  }
}


function qualityChecker(quality) {
  if (quality < 0) {
    return 0;
  } else if (quality > 50 && quality !== 80) {
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
  return array;
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
