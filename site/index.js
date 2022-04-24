const form = document.querySelector("form");
const p = document.querySelector("p");
const localStorageContent = localStorage.getItem("listOfItems");
const itemNameField = document.querySelector("#item-name");
const qualityFields = document.querySelectorAll(".quality");

itemNameField.addEventListener("input", (event) => {
  qualityFields.forEach((qualityField) => {
    qualityField.classList.remove("hide");
  });
  const qualityInput = form.querySelector("#quality");
  if (itemNameField.value.toLowerCase().includes("sulfuras")) {
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
  const itemCategory = categoryGenerator(itemName);
  const item = {
    itemName,
    sellInDays,
    itemCategory,
    quality,
    dateAdded,
  };
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
    form.reset()
    location.reload();
  }, 500);
});

function categoryGenerator(name) {
  if (name.toLowerCase().includes("sulfuras")) {
    return "Sulfuras";
  } else if (name.toLowerCase().includes("aged brie")) {
    return "Aged Brie";
  } else if (name.toLowerCase().includes("backstage pass")) {
    return "Backstage pass";
  } else if (name.toLowerCase().includes("conjured")) {
    return "Conjured";
  } else {
    return "None";
  }
}
