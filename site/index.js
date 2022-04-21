const form = document.querySelector("form");
const category = form.querySelector("#item-category");
const p = document.querySelector("p");
const localStorageContent = localStorage.getItem("listOfItems")

category.addEventListener("change", (event) => {
  const selector = form.querySelector("#item-category");
  const itemCategory = selector.value;
  const qualityInput = form.querySelector("#quality");
  if (itemCategory === "Sulfuras-Hand-of-Ragnaros") {
    qualityInput.value = 80;
    qualityInput.max = 80
    qualityInput.min = 80
  } else {
    qualityInput.max = 50;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const itemName = formData.get("item-name");
  const itemCategory = formData.get("item-category");
  const sellInDays = formData.get("sell-in");
  const quality = formData.get("quality");
  const dateAdded = formData.get("date");
  const item = {
    itemName,
    itemCategory,
    sellInDays,
    quality,
    dateAdded,
  };
  console.log(item);
  if (localStorageContent === null){
    listOfItems = [];
  }else {
    listOfItems = JSON.parse(localStorageContent)
  }
  listOfItems.push(item)
  localStorage.setItem("listOfItems", JSON.stringify(listOfItems))
  form.classList.add("hide")
  p.classList.remove("hide")
  setTimeout(function(){location.reload()}, 1000)
});
