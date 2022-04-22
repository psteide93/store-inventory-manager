const form = document.querySelector("form");
const p = document.querySelector("p");
const localStorageContent = localStorage.getItem("listOfItems");
const itemNameField = document.querySelector("#item-name");


itemNameField.addEventListener("input", (event) => {
  const qualityInput = form.querySelector("#quality");
  if (itemNameField.value.includes("sulfuras")) {
    qualityInput.value = 80;
    qualityInput.max = 80;
    qualityInput.min = 80;
  } else {
    qualityInput.max = 50;
    qualityInput.min = 0;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const itemName = formData.get("item-name");
  const sellInDays = formData.get("sell-in");
  const quality = formData.get("quality");
  const dateAdded = formData.get("date");
  const itemCategory = categoryGenerator(itemName)
  const item = {
    itemName,
    sellInDays,
    itemCategory,
    quality,
    dateAdded,
  };
  console.log(item);
  if (localStorageContent === null) {
    listOfItems = [];
  } else {
    listOfItems = JSON.parse(localStorageContent);
  }
  listOfItems.push(item);
  localStorage.setItem("listOfItems", JSON.stringify(listOfItems));
  form.classList.add("hide");
  p.classList.remove("hide");
  setTimeout(function () {
    location.reload();
  }, 1000);
});

function categoryGenerator(name) {
  if (name.includes("sulfuras")) {
    return "Sulfuras";
  } else if (name.includes("aged brie")) {
    return "Aged Brie";
  } else if (name.includes("sulfuras")) {
    return "Sulfuras";
  } else if (name.includes("backstage pass")) {
    return "Backstage pass";
  } else if (name.includes("conjured")) {
    return "Conjured";
  } else {
    return "None";
  }
}
