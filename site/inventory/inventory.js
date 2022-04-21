console.log(JSON.parse(localStorage.getItem("listOfItems")))

const inventoryItems = JSON.parse(localStorage.getItem("listOfItems"))
const ul = document.querySelector("ul")

inventoryItems.forEach(item => {
    
    const li = document.createElement("li")
    li.innerHTML = `
         <h2>${item.itemName}</h2>
         <p>${item.itemCategory}</p>
         <p>${item.sellInDays}</p>
         <p>${item.quality}</p>
         <p>${item.dateAdded}</p>
    `
   ul.append(li)

})