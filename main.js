

var item_budgets_input = document.getElementsByClassName("item-budget-input");
var item_percentages_divs = document.getElementsByClassName("item-percentage");

var budget_total = document.getElementById("budget-total");

var total_sum = document.getElementById("total-sum");

var budget_left = document.getElementById("budget-left-over");



var sum = 0;
var budget_max; 

var current_budget = 70000000;

var budget_history = [];

console.log(item_budgets_input);

setDefaultBudgets();


function setDefaultBudgets(){

budget_total.innerHTML = current_budget;

for(var i = 0; i < item_budgets_input.length; i++){
item_budgets_input[i].value = 0;
item_budgets_input[i].setAttribute("onchange", "checkSum(); updatePercentages();");
item_budgets_input[i].setAttribute("step", "0.01");

}

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
    item_budgets_input[i].value = Number(item_budgets_input[i].value).toFixed(2);
    sum += Number(item_budgets_input[i].value);    
    }
total_sum.innerHTML = sum.toFixed(2);

temp_budget = (sum - current_budget).toFixed(2);

if ( temp_budget < 0 ){
    budget_left.innerHTML = "(" + temp_budget*-1 + ")";

} else {
    budget_left.innerHTML = temp_budget;

}

}