const form = document.querySelector("form");
const category = form.querySelector("#item-category");
const p = form.querySelector("p");

category.addEventListener("change", (event) => {
  const selector = form.querySelector("#item-category");
  const itemCategory = selector.value;
  const qualityInput = form.querySelector("#quality");
  if (itemCategory === "Sulfuras-Hand-of-Ragnaros") {
    qualityInput.value = 80;
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
});
