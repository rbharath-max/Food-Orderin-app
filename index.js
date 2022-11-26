import { menuArray } from './data.js'
const tg = document.getElementById("tgf")
const newOrder = document.getElementById("secondcontainer")
let innerModal = document.getElementById("inner")
 const consentForm = document.getElementById("consent-form")

const cartArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleItems(e.target.dataset.add)
    }else if (e.target.dataset.add){
         handletoggle(e.target.dataset.add)
    }else if(e.target.id === "btn"){
        modalDisplay()
    }else if(e.target.dataset.rem){
        handleDelete(e.target.dataset.rem)
    }
    
})

function modalDisplay(){
    
    console.log("button clicked")
    innerModal.style.display='block'
}

function handletoggle(){
    tg.classList.toggle('hidden')
}

consentForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(consentForm) 
    const fullNameOfUser = consentFormData.get('fullName')
    
    innerModal.innerHTML = `<div>
               <img src="https://media.tenor.com/6gHLhmwO87sAAAAj/gg.gif" alt="gif">
               <p class="inner-text"> Please wait we are processin your order</p>
           </div>
    `
    setTimeout(function(){
        innerModal.innerHTML = ` <div>
               <p class="inner-text">Thanks!${fullNameOfUser}</p>
               <p class="inner-text">Your Order is on the way...</p>
               <img src="https://media.giphy.com/media/xUOrwk187iWrDuloas/giphy.gif" alt="gif">
           </div>`
    }, 2500)
})



function handleItems(food){
    const TargetObj = menuArray.filter(function(item){
        return item.id == food
    })[0]
    
    cartArr.push({
        name: TargetObj.name,
        price: TargetObj.price,
        id: TargetObj.id
    })
    getFoodHtml()
}
function handleDelete(food){
    const TargetObj = cartArr.filter(function(item){
        return item.id == food
    })[0]
   
        let itemIndex = cartArr.indexOf(TargetObj)
        cartArr.splice(itemIndex, 1)
        getFoodHtml()
    

    
}

 


function getFoodHtml(){
     let order = ""
     let totalPrice = 0
      order += `<h4 class="yourorder" id="yourorder">Your Order</h4>`
      
    if(cartArr.length > 0){
        cartArr.forEach(function(oderitem){
            totalPrice += oderitem.price
            order +=   `<div class="summary">
                <p3>${oderitem.name}<button class="remove" type="remove" data-rem="${oderitem.id}">Remove</button><span class="price">$${oderitem.price}</span></p3>
                
            </div>
            `
            
        })
        order += ` <div class="totalprice">
               <div class="subprice">
                <p5>Total Price<p6>$${totalPrice}</p6></p5>
                </div>
                <button class="btn" id="btn">Complete Order</button>
                
           </div>
           `
        newOrder.innerHTML = order
    }else {
        newOrder.innerHTML = ''
    }
    
    
    let item = ""
    menuArray.forEach(function(items){
         item += `  <section class="foods" id="food">
                <div class="food-inner">
                    <span>${items.emoji}</span>
                </div>
                <div>
                    <h2>${items.name}</h2>
                    <p2>${items.ingredients}</p2>
                    <h3>$${items.price}</h3>
                </div>
                <i class="fa-solid fa-circle-plus" data-add="${items.id}"></i>
                
                
            </section>`
    })
    return item
    
   
    
}

function render(){
    document.getElementById("food-container").innerHTML = getFoodHtml()
}
render()








