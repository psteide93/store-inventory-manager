console.log(JSON.parse(localStorage.getItem("listOfItems")))

const inventoryItems = JSON.parse(localStorage.getItem("listOfItems"))
const ul = document.querySelector("ul")

inventoryItems.forEach(item => {
    
    const li = document.createElement("li")
    li.innerHTML = `
         <h2>${item.itemName}</h2>
         <p>Category:${item.itemCategory}</p>
         <p>Sell in ${item.sellInDays} days</p>
         <p>Quality ${item.quality}</p>
         <p>Date added:${item.dateAdded}</p>
    `
   ul.append(li)

})