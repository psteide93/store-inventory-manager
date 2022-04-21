const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
event.preventDefault()
const formData = new FormData(event.target)
const itemName = formdata.get("item-name")
const itemCategory = formdata.get("item-category")
const sellInDays = formdata.get("sell-in")
const quality = formdata.get("quality")
const dateAdded = formdata.get("date")  


}




)