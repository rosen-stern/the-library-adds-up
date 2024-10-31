/* 
TO DO: 
- Only submit budget when you're under or at the limit
- Make the back button work to view previous budgets
- Show the left over from bduget in RED if it's over the budget (in the red)
- Successfully navigate to the next screen and set up the next year's budget
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


var year = 1; 
var page_year = year;

var sum = 0;

var budget_history = [];

var this_year_info = {};

setUpYear();
setDefaultBudgets();


function setDefaultBudgets(){

budget_total.innerHTML = toLocal(this_year_info.budget_total);

for(var i = 0; i < item_budgets_input.length; i++){
item_budgets_input[i].value = 0;
item_budgets_input[i].setAttribute("onchange", "checkSum(); updatePercentages();");
item_budgets_input[i].setAttribute("step", "0.01");
}


anticipated_spans[0].innerHTML = this_year_info.books_anticipated;
anticipated_spans[1].innerHTML = this_year_info.collection_anticipated;

anticipated_spans[2].innerHTML = this_year_info.public_anticipated;
anticipated_spans[3].innerHTML = this_year_info.departments_anticipated;

anticipated_spans[4].innerHTML = this_year_info.rent;
anticipated_spans[5].innerHTML = this_year_info.maintenance;

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
    item_budgets_input[i].value = Number(item_budgets_input[i].value);
    sum += Number(item_budgets_input[i].value);    
    }
total_sum.innerHTML = toLocal(sum);

temp_budget = (this_year_info.budget_total - sum);

if ( temp_budget < 0 ){
    budget_left.innerHTML = "(" + toLocal(temp_budget*-1) + ")";

} else {
    budget_left.innerHTML = toLocal(temp_budget);

}

}

function setUpYear(){
    this_year_info.year = year;
    if(year == 1){
        this_year_info.budget_total = 86389995;
        this_year_info.books_anticipated = toLocal(this_year_info.budget_total * 0.021);
        this_year_info.collection_anticipated =  toLocal(this_year_info.budget_total * 0.023);

        this_year_info.public_anticipated =  toLocal(this_year_info.budget_total * 0.65);
        this_year_info.departments_anticipated =  toLocal(this_year_info.budget_total * 0.073);
        
        this_year_info.rent = toLocal(this_year_info.budget_total * 0.032);
        this_year_info.maintenance = toLocal(this_year_info.budget_total * 0.019);

        this_year_info.programming_anticipated =  toLocal(this_year_info.budget_total * 0.024);
        this_year_info.city_anticipated =  toLocal(this_year_info.budget_total * 0.066);
        this_year_info.software_anticipated =  toLocal(this_year_info.budget_total * 0.055);
        this_year_info.other_anticipated =  toLocal(this_year_info.budget_total * 0.077);

        document.getElementById("previous-button").style.display = "none";
    } else {
        randPercent = (Math.random() * (0.1 - 0.01) + 0.01).toFixed(3);

    }
}

function toLocal(num){
return num.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
}


function submitBudget(){
// YOU SHOULD ONLY BE ABLE TO SUBMIT THE BUDGET WHEN YOU'RE WITHIN THE BUDGET LIMIT !! 

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

}