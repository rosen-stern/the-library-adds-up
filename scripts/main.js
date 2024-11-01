/* 
TO DO: 

-Make budgets go UP AND DOWN, not just UP lmao 

- Anticipated costs become NaN after year 1??


- Make the back button work to view previous budgets
- Disable textboxes when going to a previous year 
- Add "alerts" / plot to areas that are going up or down
- Add lose condition, and end screen
- Add "alerts" to the history

*/

var item_budgets_input = document.getElementsByClassName("item-budget-input");
var item_percentages_divs = document.getElementsByClassName("item-percentage");

var anticipated_spans = document.getElementsByClassName("anticipated");

var budget_total = document.getElementById("budget-total");

var total_sum = document.getElementById("total-sum");

var budget_left = document.getElementById("budget-left-over");

var submit_button = document.getElementById("submit-button");

var library_name = localStorage.getItem("library_name");

document.getElementById("library-name").innerHTML = localStorage.getItem("library_name");


var budget_history = [];

var year;
var page_year = year;
var sum = 0;
var this_year_info = {};

setUp();


function setUp(){
    console.log("setting up " + year)

if (!year){
    year = 1;
} else {
    year++;
}


console.log("setting up " + year)

page_year = year;
sum = 0;
this_year_info = {};

setUpYear();
setDefaultBudgets();
}

function setDefaultBudgets(){
    document.getElementById("year-ID").innerHTML = year;

budget_total.innerHTML = toLocal(this_year_info.budget_total);

for(var i = 0; i < item_budgets_input.length; i++){
item_budgets_input[i].value = 0;
item_budgets_input[i].setAttribute("onchange", "checkSum(); updatePercentages();"); //when the budget for a specific box is changed, update the sums and percentages
item_budgets_input[i].setAttribute("step", "0.01"); //display all numbers as two decimal points
item_budgets_input[i].setAttribute("min", "0"); //no negative numbers allowed
}


anticipated_spans[0].innerHTML = this_year_info.books_anticipated;
anticipated_spans[1].innerHTML = this_year_info.collection_anticipated;

anticipated_spans[2].innerHTML = this_year_info.public_anticipated;
anticipated_spans[3].innerHTML = this_year_info.departments_anticipated;

anticipated_spans[4].innerHTML = this_year_info.rent_anticipated;
anticipated_spans[5].innerHTML = this_year_info.maintenance_anticipated;

anticipated_spans[6].innerHTML = this_year_info.programming_anticipated;
anticipated_spans[7].innerHTML = this_year_info.city_anticipated;
anticipated_spans[8].innerHTML = this_year_info.software_anticipated;
anticipated_spans[9].innerHTML = this_year_info.other_anticipated;

checkSum();
updatePercentages();

}

function updatePercentages(){
    for(var i = 0; i < item_percentages_divs.length; i++){ 
        if ( !(item_budgets_input[i].value / sum)){
            item_percentages_divs[i].innerHTML = "0%";
        } else if( (item_budgets_input[i].value / sum) < 0.01) {
            item_percentages_divs[i].innerHTML = "< 1%";
    } else {
            item_percentages_divs[i].innerHTML = Math.round((item_budgets_input[i].value / sum) * 100) + "%";
        }
    }
}

function checkSum(){
sum = 0;

for(var i = 0; i < item_budgets_input.length; i++){
    x = Number(item_budgets_input[i].value);
    if(x < 0){
        x = 0;
    } 

    item_budgets_input[i].value = x;
    sum += x;    
    }
total_sum.innerHTML = toLocal(sum);

temp_budget = (this_year_info.budget_total - sum);

if ( temp_budget < 0 ){
    budget_left.innerHTML = "(" + toLocal(temp_budget) + ") ⚠️";
    budget_left.classList.add("red");
    budget_left.title = "You're over budget."
    submit_button.classList.add("off");

} else {
    budget_left.title = "";
    budget_left.innerHTML = toLocal(temp_budget);
    budget_left.classList.remove("red");
    submit_button.classList.remove("off");
}

}

function setUpYear(){
    this_year_info.year = year;


    if(year == 1){
        this_year_info.budget_total = 86389995;
        this_year_info.books_multiplier = 0.021;
        this_year_info.collection_multiplier = 0.023;

        this_year_info.public_multiplier = 0.65;
        this_year_info.departments_multiplier = 0.073;
        
        this_year_info.rent_multiplier = 0.032;
        this_year_info.maintenance_multiplier = 0.019;

        this_year_info.programming_multiplier = 0.024;
        this_year_info.city_multiplier = 0.066;
        this_year_info.software_multiplier = 0.055;
        this_year_info.other_multiplier = 0.077;

        document.getElementById("previous-button").style.display = "none";
    } else {
        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.budget_total = budget_history[year-2].budget_total * randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.books_multiplier = 0.021 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.collection__multiplier = 0.023 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.public_multiplier = 0.65 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.departments_multiplier = 0.073 + randPercent;
        
        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.rent_multiplier = 0.032 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.maintenance_multiplier = 0.019 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.programming_multiplier = 0.024 + randPercent;
        
        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.city_multiplier = 0.066 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.software_multiplier = 0.055 + randPercent;

        randPercent = (Math.random() * (0.1 - 0.005) + 0.005).toFixed(3);
        this_year_info.other_multiplier = 0.077 + randPercent;
    }


    this_year_info.books_anticipated = toLocal(this_year_info.budget_total * this_year_info.books_multiplier);
    this_year_info.collection_anticipated =  toLocal(this_year_info.budget_total * this_year_info.collection_multiplier);

    this_year_info.public_anticipated =  toLocal(this_year_info.budget_total * this_year_info.public_multiplier);
    this_year_info.departments_anticipated =  toLocal(this_year_info.budget_total * this_year_info.departments_multiplier);
    
    this_year_info.rent_anticipated = toLocal(this_year_info.budget_total * this_year_info.rent_multiplier);
    this_year_info.maintenance_anticipated = toLocal(this_year_info.budget_total * this_year_info.maintenance_multiplier);

    this_year_info.programming_anticipated =  toLocal(this_year_info.budget_total * this_year_info.programming_multiplier);
    this_year_info.city_anticipated =  toLocal(this_year_info.budget_total * this_year_info.city_multiplier);
    this_year_info.software_anticipated =  toLocal(this_year_info.budget_total * this_year_info.software_multiplier);
    this_year_info.other_anticipated =  toLocal(this_year_info.budget_total * this_year_info.other_multiplier);


}

function toLocal(num){
return num.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
}

function submitBudget(){
// Save all the information from this year

this_year_info.books_anticipated =       item_budgets_input[0].value;
this_year_info.collection_anticipated =  item_budgets_input[1].value;
this_year_info.public_anticipated =      item_budgets_input[2].value;
this_year_info.departments_anticipated = item_budgets_input[3].value;
this_year_info.programming_anticipated = item_budgets_input[4].value;
this_year_info.city_anticipated =        item_budgets_input[5].value;
this_year_info.software_anticipated =    item_budgets_input[6].value;
this_year_info.other_anticipated =       item_budgets_input[7].value;

budget_history.push(this_year_info);

// Move to the information screen with results from this year 
setUp();

console.log("Budget approved!");

}