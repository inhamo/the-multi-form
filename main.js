const personalInput = Array.from(document.getElementsByClassName('js-personal-input'));
const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');
const checkbox = Array.from(document.querySelectorAll('.checkbox-add-on'));
const errorMessage = Array.from(document.querySelectorAll('.error'));

let addOnAmount = 0;
let currentperiod = 'monthly';
let total ;
let html = '';

const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
const validPhone = /^\+\d{10}$/;

function validateForm() {
    for(let index = 0 ; index < personalInput.length ; index++){
        input = personalInput[index];
        
        if(input.value.trim() === ""){
            errorMessage[index].style.opacity = '1';
        }else {
            errorMessage[index].style.opacity = '0';
            errorMessage[index].innerText = '';
            
                if(index === 1 && !validEmail.test(input.value)){
                    errorMessage[index].innerText = 'Please enter a valid email address';
                    errorMessage[index].style.opacity = '1';
                } else if( index ===2 && !validPhone.test(input.value)){
                    errorMessage[index].innerText = 'Please enter a valid phone number';
                    errorMessage[index].style.opacity = '1';
                };
         };
    }
}

let pages = 0;

function moveToNextPage() {
    pages++

    const showPages = Array.from(document.querySelectorAll('.page-slide'));

    if(pages < showPages.length){
        showPages[pages].style.display = 'block';
        showPages[pages -1].style.display = 'none'

        if(pages === 4){
            showPages[pages].style.display = 'flex';
            showPages[pages - 1].style.display = 'none' 

            document.querySelector('footer').style.display = 'none';
        };

        if(pages === 3){
            nextBtn.innerText = 'Confirm';
            nextBtn.style.backgroundColor = 'var(--purplish-blue)';
        }else {
            nextBtn.innerText = 'Next Step';
            nextBtn.style.backgroundColor = '';
        };
    };

    pages < showPages.length - 1 ? moveToNextCount() : '';
};
function moveToNextCount(){
    const slides = document.querySelectorAll('.pagination');

    slides[pages].classList.add('active');
    slides[pages - 1].classList.remove('active');
};
function moveToPrevPage() {
    pages--

    const showPages = Array.from(document.querySelectorAll('.page-slide'));
    
    if(pages >= 0){
        showPages[pages].style.display = 'block';
        showPages[pages + 1].style.display = 'none';

        if( pages < 3){
            nextBtn.innerText = 'Next Step';
            nextBtn.style.backgroundColor = '';
        }
        moveToPrevCount();
    };
};
function moveToPrevCount(){
    const slides = document.querySelectorAll('.pagination');

    slides[pages].classList.add('active');
    slides[pages + 1].classList.remove('active');
};
function changePackage(){
        pages = 1;
        const showPages = Array.from(document.querySelectorAll('.page-slide'));
        const slides = document.querySelectorAll('.pagination');

        showPages[pages].style.display = 'block';
        showPages[pages + 2].style.display = 'none';

        slides[pages].classList.add('active');
        slides[pages + 2].classList.remove('active');

        nextBtn.innerText = 'Next Step';
        nextBtn.style.backgroundColor = '';

        html += `
                <div class="add-on-sum-info">
                    <p class="add-sum-name"></p>
                    <p class="add-sum-price"></p>
                </div>
                `;
        
        document.querySelector('.add-summary').innerHTML = html;
};

const packageArr = [
    {
        name : 'Arcade',
        monthly : 9,
        yearly : 90
    },
    {
        name : 'Advance',
        monthly : 12,
        yearly : 120
    },
    {
        name : 'Pro',
        monthly :15,
        yearly : 150
    }
];

const addOnArr = [
    {
        name: 'Online services',
        monthly : 1,
        yearly : 10
    },
    {
        name: 'Large storage',
        monthly : 2,
        yearly : 20
    },
    {
        name: 'Customizable profile',
        monthly : 2,
        yearly : 20
    }
];

function switchPeriod() {
    let isYearly = currentperiod === 'yearly';
    currentperiod = isYearly ? 'monthly' : 'yearly';

    const freePeriod = Array.from(document.querySelectorAll('.free-month'));
    const planPrice = Array.from(document.querySelectorAll('.plan-price'));

    if (currentperiod === 'yearly') {
        document.querySelector('.toggle-button').style.marginLeft = '2rem';
        freePeriod.forEach( (index) => {
            index.style.display = 'block';
        });
        planPrice.forEach( (plan, index) => {
            plan.innerText = `$${packageArr[index][currentperiod]}/yr`;
        })
    } else {
        document.querySelector('.toggle-button').style.marginLeft = '';
        freePeriod.forEach( (index) => {
            index.style.display = 'none';
        });
        planPrice.forEach( (plan, index) => {
            plan.innerText = `$${packageArr[index][currentperiod]}/mo`;
        });
    };

    changeAddOnPrices();
    showTotal();
};

function changeAddOnPrices() {
    const addOnPrice = Array.from(document.querySelectorAll('.package-price'));

    if(currentperiod === 'yearly') {
        addOnPrice.forEach ( (addOnPrice, index) => {
            addOnPrice.innerText = `+$${addOnArr[index][currentperiod]}/yr`
        });
    } else {
        addOnPrice.forEach ( (addOnPrice, index) => {
            addOnPrice.innerText = `+$${addOnArr[index][currentperiod]}/mo`
        });    
    }
}

let pickpackage = '';

function pickedPlan(event){
    const pickPlan = event.target.dataset.package;
    pickpackage = pickPlan;
    packageArr.forEach( (planeName, index) => {
        if(pickPlan && pickPlan === planeName.name){
            total = Number(planeName[currentperiod]);
            
            document.querySelector('.sum-package-name').innerText = `${pickPlan} (${currentperiod})`;

            currentperiod === 'yearly' ? document.querySelector('.package-summary-price').innerText = `$${packageArr[index][currentperiod]}/yr`
            : document.querySelector('.package-summary-price').innerText = `$${packageArr[index][currentperiod]}/mo`
        };
    });
}

function addonTotal(checkbox,index) {
    if(checkbox.checked){
        addOnAmount = 0;
        addOnAmount += addOnArr[index][currentperiod];

        html += `
                <div class="add-on-sum-info">
                    <p class="add-sum-name">${addOnArr[index].name}</p>
                    <p class="add-sum-price">+$${addOnArr[index][currentperiod]}/${currentperiod === 'yearly' ? 'yr' : 'mo'}</p>
                </div>
                `;
        
        document.querySelector('.add-summary').innerHTML = html;

    } else if (!checkbox.checked) {
        addOnAmount = 0;
        addOnAmount -= addOnArr[index][currentperiod];

        html += `
                <div class="add-on-sum-info">
                    <p class="add-sum-name"></p>
                    <p class="add-sum-price"></p>
                </div>
                `;
        
        document.querySelector('.add-summary').innerHTML = html;
    };

    total += addOnAmount;

    const totalPrice = document.querySelector('.total-price');
    totalPrice.innerText = currentperiod === 'yearly' ? `$${total}/yr`: `$${total}/mo`;
};

function showTotal() {
    const period = currentperiod === 'yearly' ? currentperiod.slice(0,4): currentperiod.slice(0,5);
    document.querySelector('.total-name').innerText = `Total (per ${period})`;
}


nextBtn.addEventListener('click', () => {
    validateForm();

    const hasErrors = errorMessage.some((errorMessage) => errorMessage.style.opacity === '1');

    if (!hasErrors) {
        moveToNextPage();
    }
});

backBtn.addEventListener('click', () => {
    moveToPrevPage();
});

document.querySelector('.change').addEventListener( 'click', changePackage);

document.querySelector('.toggle').addEventListener('click', switchPeriod);

window.addEventListener('click', (e) => {
    pickedPlan(e);
});

checkbox.forEach( (checkbox, index) => {
    checkbox.addEventListener('change', () => {
        addonTotal(checkbox,index);
    });
});