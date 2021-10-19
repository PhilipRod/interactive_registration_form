
// VARIABLES
const nameInput = document.getElementById('name');
const title = document.getElementById('title');
const otherJob = document.getElementById('other-job-role');
const design = document.getElementById('design');
const color = document.getElementById('color');
const registerActivities = document.getElementById('activities')
const activitiesCost = document.getElementById('activities-cost')
const payOption = document.getElementById('payment')
const creditCard = document.getElementById('credit-card')
const paypal = document.getElementById('paypal')
const bitcoin = document.getElementById('bitcoin')
const form = document.querySelector('form')
const emailInput = document.getElementById('email')
const checkboxes = registerActivities.querySelectorAll("input");
const cardNum = document.getElementById('cc-num')
const zip = document.getElementById('zip')
const cvv = document.getElementById('cvv')

//SETTING NAME FIELD TO FOCUS
nameInput.focus()

//VARIABLE TO STORE TOTAL AMOUNT OF REGISTERED ACTIVITIES  
totalCost = 0;

otherJob.style.display = 'none';
color.disabled = true;


//EVENT LISTENER TO DISPLAY OTHER JOB ROLE OR NOT
title.addEventListener('change', e => {
    if (e.target.value === "other") {
        otherJob.style.display = 'initial';
    } else {
        otherJob.style.display = 'none'
    }
})

//EVENT LISTENER TO DISPLAY COLOR OPTION OR NOT 
design.addEventListener('change', e => {
    const colorOption = color.children;
    color.disabled = false;
    for (let i = 0; i < colorOption.length; i++) {
        const val = e.target.value;
        const attr = colorOption[i].getAttribute("data-theme");

        if (val === attr) {
            colorOption[i].hidden = false;
            colorOption[i].setAttribute('selected', "")
        }
        else {
            colorOption[i].hidden = true;
            colorOption[i].removeAttribute('selected', "")
        }

    }
})

//EVENT LISTENER TO CALCULATE AND DISPLAY TOTAL AMOUNT OF REGISTERED ACTIVITIES
registerActivities.addEventListener('change', e => {
    const btn = e.target;
    let cost = btn.getAttribute('data-cost');
    cost = +cost;

    if (btn.checked) {
        totalCost += cost;
    }
    else {
        totalCost -= cost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
})



paypal.style.display = 'none';
bitcoin.style.display = 'none';

//DEFAULT SELECTION OF CREDIT CARD
payOption.children[1].setAttribute('selected', "");

//EVENT LISTENER TO LISTEN FOR USER PAYMENT OPTION  
payOption.addEventListener('change', e => {
    btn = e.target
    if (btn.value === 'paypal') {
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
        paypal.style.display = 'block';
    }
    else if (btn.value === 'bitcoin') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
    else {
        creditCard.style.display = 'initial';
        bitcoin.style.display = 'none';
        paypal.style.display = 'none';
    }
})

//FUNCTION TO VALIDATE NAME
function validateName(name) {
    const Vname = /^[A-Za-z]+$/.test(name);
    if (Vname) {
        nameInput.parentElement.classList.add('valid')
        nameInput.parentElement.classList.remove('not-valid')
        nameInput.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
    else {
        nameInput.parentElement.classList.add('not-valid')
        nameInput.parentElement.classList.remove('valid')
        nameInput.parentElement.lastElementChild.style.display = 'block';
        return false;
    }
}

//FUNCTION TO VALIDATE EMAIL
function validateEmail(email) {
    const Vemail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    if (Vemail) {
        emailInput.parentElement.classList.add('valid')
        emailInput.parentElement.classList.remove('not-valid')
        emailInput.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
    else {
        emailInput.parentElement.classList.add('not-valid')
        emailInput.parentElement.classList.remove('valid')
        emailInput.parentElement.lastElementChild.style.display = 'block';
        return false;
    }
}

//FUNCTION TO VALIDATE Activities
function validateActivities(activities) {
    for (let i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {
            registerActivities.firstElementChild.classList.add('valid')
            registerActivities.firstElementChild.classList.remove('not-valid')
            registerActivities.lastElementChild.style.display = 'none';
            return true;
        }
    }
    registerActivities.firstElementChild.classList.add('not-valid')
    registerActivities.firstElementChild.classList.remove('valid')
    registerActivities.lastElementChild.style.display = 'block';
    return false;
}

//FUNCTIONS TO CHECK CREDIT CARD VALIDITY 
function validateCardNum(num) {
    const Vcard = /^[0-9]{13}([0-9]{3})?/.test(num)
    if (Vcard) {
        cardNum.parentElement.classList.add('valid')
        cardNum.parentElement.classList.remove('not-valid')
        cardNum.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
    else {
        cardNum.parentElement.classList.add('not-valid')
        cardNum.parentElement.classList.remove('valid')
        cardNum.parentElement.lastElementChild.style.display = 'block';
        return false;
    }
}

function validatzipCode(code) {
    const Vzip = /^\d{5}$/.test(code)
    if (Vzip) {
        zip.parentElement.classList.add('valid')
        zip.parentElement.classList.remove('not-valid')
        zip.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
    else {
        zip.parentElement.classList.add('not-valid')
        zip.parentElement.classList.remove('valid')
        zip.parentElement.lastElementChild.style.display = 'block';
        return false;
    }
}

function validatCvv(num) {
    const Vcvv = /^\d{3}$/.test(num)
    if (Vcvv) {
        cvv.parentElement.classList.add('valid')
        cvv.parentElement.classList.remove('not-valid')
        cvv.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
    else {
        cvv.parentElement.classList.add('not-valid')
        cvv.parentElement.classList.remove('valid')
        cvv.parentElement.lastElementChild.style.display = 'block';
        return false;
    }
}

//EVENT LISTENER TO LISTEN FOR FORM SUBMISSION  
form.addEventListener('submit', event => {
    const validName = validateName(nameInput.value);
    const validEmail = validateEmail(emailInput.value)
    let validActivity = validateActivities(checkboxes)
    const validcardNum = validateCardNum(cardNum.value)
    const validZipCode = validatzipCode(zip.value)
    const validCvv = validatCvv(cvv.value)

    if (payOption.value === 'credit-card') {
        if (validName && validEmail && validActivity === true && validcardNum && validZipCode && validCvv) {

        }
        else {
            event.preventDefault()
        }
    }
    else if (validName && validEmail && validActivity === true) {

    }
    else {
        event.preventDefault()
    }

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        checkbox.addEventListener('focus', e => {
            checkbox.parentElement.classList.add('focus')

        })

        checkbox.addEventListener('blur', e => {
            checkbox.parentElement.classList.remove('focus')
        })
    }
})

