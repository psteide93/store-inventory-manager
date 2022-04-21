console.log(JSON.parse(localStorage.getItem("listOfItems")))

const inventoryItems = JSON.parse(localStorage.getItem("listOfItems"))
     //.sort((a,b) => a.quality - b.quality )

const ul = document.querySelector(".inventory")

inventoryItems.forEach(item => {
    //change this from innerHTML to text content
    const li = document.createElement("li")
    const itemHeader = document.createElement("h2")
    const div = document.createElement("div")
    itemHeader.textContent = item.itemName
    div.innerHTML = `
         <p>Category:${item.itemCategory}</p>
         <p>Sell in ${item.sellInDays} days</p>
         <p>Quality ${item.quality}</p>
         <p>Date added:${item.dateAdded}</p>
    `
    itemHeader.append(div)
li.append(itemHeader)
   ul.append(li)

})