
const cards = document.querySelectorAll('.card');


const couponSection = document.getElementById('couponSection');
const couponList = couponSection.querySelector('.coupon-list');
const totalElement = document.getElementById('totalPrice');


let clickedItems = [];
let totalMoney = 0;


const couponCodeInput = document.getElementById('couponCode');
const discountButton = document.getElementById('discountButton');


const makePurchaseButton = document.getElementById('makePurchaseButton');


cards.forEach(card => {
  card.addEventListener('click', function(event) {
    
    const cardTitle = card.querySelector('.card-title').textContent;
    const cardPrice = parseFloat(card.querySelector('#cardPrice').textContent);

    
    clickedItems.push({ title: cardTitle, price: cardPrice });

    
    totalMoney += cardPrice;

    
    updateCouponList();

    
    updateMakePurchaseButton();
  });
});

function updateCouponList() {
  couponList.innerHTML = '';
  let clickCounter = 1;

  clickedItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${clickCounter++}. ${item.title} - Tk ${item.price.toFixed(2)}`;
    couponList.appendChild(listItem);
  });

  totalElement.textContent = totalMoney.toFixed(2);
}

function updateMakePurchaseButton() {
  makePurchaseButton.disabled = totalMoney <= 0;
}


discountButton.addEventListener('click', applyDiscount);


couponCodeInput.addEventListener('input', function() {
  const enteredCode = couponCodeInput.value;

  
  discountButton.disabled = enteredCode !== 'Sell200';
});

function applyDiscount() {
    console.log("Button Clicked"); 
    
    const CCode = couponCodeInput.value;
    
    if (CCode === 'Sell200' && totalMoney >= 200) {
        const discountPercentage = 0.20; 
        const discountAmount = totalMoney * discountPercentage;
        const priceAfterDiscount = totalMoney - discountAmount;

        
        const discountPriceElement = document.getElementById('discountPrice');
        const priceAfterDiscountElement = document.getElementById('PD');
        
        discountPriceElement.textContent = discountAmount.toFixed(2);
        priceAfterDiscountElement.textContent = priceAfterDiscount.toFixed(2);
        
        couponCodeInput.value='';
        makePurchaseButton.disabled = false;
    } else {
        
        alert('Invalid coupon code or minimum purchase requirement not met.');
    }
}


makePurchaseButton.addEventListener('click', function() {
  const modal = document.getElementById('my_modal_5');
  modal.showModal();
});

const closeButton = document.querySelector('.modal-action button');
closeButton.addEventListener('click', function() {
  const modal = document.getElementById('my_modal_5');
  modal.close();
  resetCart();
});


function resetCart() {
  clickedItems = [];
  totalMoney = 0;
  
  couponCode='';
  updateCouponList();
  updateMakePurchaseButton();
  discountPriceElement.textContent = '0.00';
  priceAfterDiscountElement.textContent = '0.00';
