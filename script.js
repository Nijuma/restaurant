import { menuArray } from "/menu.js";

const orderItems = document.getElementById("order-items");
const totalPrice = document.getElementById("total-price");
const orderContainer = document.getElementById("order-container");
const paymentForm = document.getElementById("payment-form");
const starBox = document.getElementById("hidden");
const ratingStars = [...document.getElementsByClassName("rating__star")];

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.dataset.add) {
    addToOrder(Number(e.target.dataset.add));
  }
  if (e.target.dataset.remove) {
    remove(e.target.dataset.remove);
  }

  if (e.target.id == "btn-complete") {
    paymentForm.style.display = "block";
  }
  if (e.target.dataset.pay) {
    if (e.target.dataset.pay) {
      paymentForm.style.display = "none";
    }

    starBox.classList.remove("hidden");

    executeRating(ratingStars);
    orderComplete();
  }
});

function addToOrder(menuItem) {
  //   const targetItem = menuArray.filter((item) => {
  //     return item.id === menuItem;
  //   })[0];

  //   orderList.push(`${targetItem.name} $${targetItem.price}`);

  menuArray[menuItem].quantity += 1;
  getOrder();
}

function remove(item) {
  menuArray[item].quantity -= 1;
  getOrder();
}

function getOrder() {
  let totalCost = 0;
  orderItems.innerHTML = ``;
  menuArray.forEach((item) => {
    if (item.quantity > 0) {
      totalCost += item.price * item.quantity;
      orderItems.innerHTML += `
                    <div class="order-item">
                        <div class="order-item-info">
                            <p>${item.quantity}</p>
                            <h2>${item.name}</h3>
                            <button data-remove="${item.id}">-</button>
                        </div>
                        <h2 class="item-price">$${
                          item.quantity * item.price
                        }</p>
                    </div>  
                `;
    }
    if (totalCost == 0) {
      orderContainer.style.display = "none";
    } else {
      orderContainer.style.display = "block";
      totalPrice.innerHTML = `$${totalCost}`;
    }
  });
}

function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach((menu) => {
    menuHtml += `<div class="container">
            <div class="emoji">
                <span>${menu.emoji}</span>
                <div class="menu-items">
                    <p>${menu.name}</p>
                    <p>${menu.ingredients}</p>
                    <p>$${menu.price}</p>
                </div>
                
            </div>
            <div class="btn">
            <button class="add" data-add=${menu.id}>+</button>
            
            </div>
        </div>`;
  });
  return menuHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getMenuHtml();
}

let feedbackGiven = false;

function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;

  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
      feedbackGiven = true;
      displayFinalMessage();
    };
  });
}
orderContainer.classList.add("hidden");
function orderComplete() {
  const orderContainer = document.getElementById("order-container");
  const form = new FormData(document.getElementById("payment-form"));

  const fullName = form.get("name");
  let completeMsg = ``;

  completeMsg += `<div>
  <div class="completeOrder">
    <h2>Thanks ${fullName}! Your order is on its way!</h2>
    <h4>We hope you enjoy your meal!</h4>

    <h4>Please rate your experience with us!</h4>
    
  </div>
   
  

  </div>`;

  orderContainer.innerHTML = completeMsg;

  document.addEventListener("click", (e) => {
    if (e.target.dataset.star) {
      // starBox.classList.add("hidden");
    }
    if (e.target.dataset.star) {
      orderContainer.classList.add("hidden");
    }
  });
}

function displayFinalMessage() {
  if (feedbackGiven) {
    const finalMessage = document.getElementById("order-container");
    finalMessage.innerHTML = "Thanks for your feedback!";
  }
}

render();
