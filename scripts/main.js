/* 
TO DO: 

- Make the back button work to view previous budgets
- Disable textboxes when going to a previous year 
- Add lose condition, and end screen

*/
var big_table = document.getElementById("big-table");

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

setUp(); //runs the set up for the first time when initializing the game 

function setUp(){ //sets up a new year when you select "submit"


if (!year){
    year = 1;
} else {
    year++;
}


page_year = year;
sum = 0;
this_year_info = {};

setUpYear();
setDefaultBudgets();
}

function setDefaultBudgets(){ //sets the Anticipated Costs of all the items to the set anticipated costs for "this year"
    document.getElementById("year-ID").innerHTML = year;

budget_total.innerHTML = toLocal(this_year_info.budget_total);

for(var i = 0; i < item_budgets_input.length; i++){

item_budgets_input[i].setAttribute("onchange", "checkSum(); updatePercentages();"); //when the budget for a specific box is changed, update the sums and percentages
item_budgets_input[i].setAttribute("step", "0.01"); //display all numbers as two decimal points
item_budgets_input[i].setAttribute("min", "0"); //no negative numbers allowed

anticipated_spans[i].innerHTML = toLocal(this_year_info.anticipated[i]);
item_budgets_input[i].value = (this_year_info.anticipated[i]).toFixed(2);
}

checkSum();
updatePercentages();

}

function updatePercentages(){ //checks all the text boxes numbers as a percentage of the total text box numbers
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

function checkSum(){ //adds up all the text boxes numbers and displays it as the "TOTAL" at the bottom
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

function getRandomDecimal(min, max, decimals){

   return Number(Math.random() * (max - min) + min).toFixed(decimals)

}

function getRandomInteger(min, max) {
//https://www.w3schools.com/js/js_random.asp
    return Number(Math.floor(Math.random() * (max - min + 1) ) + min);
  }


function decidePercentage(){
    randomPicker = getRandomInteger(0,100);
    
    if(randomPicker < 10){ //BIG reduction
        randPercent = getRandomDecimal(0.70, 1, 3);
    
    } else if (randomPicker < 20){ //BIG ask
        randPercent = getRandomDecimal(1.0, 1.3, 3);
  
    } else {
        randPercent = getRandomDecimal(0.9, 1.1, 3);
    }
  

    return Number(randPercent);
}

function setUpYear(){ //sets up to display a new year
    this_year_info.year = year;
    this_year_info.multiplier = [];
    this_year_info.anticipated = [];

    if(year == 1){
        this_year_info.budget_total = 86389995;
        
        this_year_info.multiplier[0] = 0.021;
        this_year_info.multiplier[1] = 0.023;

        this_year_info.multiplier[2] = 0.65;
        this_year_info.multiplier[3] = 0.073;
    
        this_year_info.multiplier[4] = 0.032;
        this_year_info.multiplier[5] = 0.019;

        this_year_info.multiplier[6] = 0.024;
        this_year_info.multiplier[7] = 0.066;
        this_year_info.multiplier[8] = 0.055;
        this_year_info.multiplier[9] = 0.077;

        document.getElementById("previous-button").style.display = "none";

        for(var i = 0; i < this_year_info.multiplier.length; i++){
            this_year_info.anticipated[i] = Number(this_year_info.budget_total) * Number(this_year_info.multiplier[i]);
            }

        return;
    } 
        // console.log("last year's budgte total: " + budget_history[year-2].budget_total + " | " + year);
        this_year_info.budget_total = budget_history[year-2].budget_total * decidePercentage();

        for(var i = 0; i < item_budgets_input.length; i++){ //there will always be the same amount of anticipated budgets and multipliers as there are input boxes
            this_year_info.multiplier[i] = decidePercentage();
        }
    
var checkAnticipated = 0;
   
    for(var i = 0; i < this_year_info.multiplier.length; i++){
    this_year_info.anticipated[i] = Number(budget_history[year-2].actual[i]) * Number(this_year_info.multiplier[i]);
    checkAnticipated += this_year_info.anticipated[i];
    }

    console.log(checkAnticipated);

}

function toLocal(num){ //converts the int into a readable number with commas, and 2 decimals places 
return num.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
}

function submitBudget(){ //Goes to the next year
// Save all the information from this year
this_year_info.actual = [];
for(var i = 0; i < item_budgets_input.length; i++){
    this_year_info.actual[i] = item_budgets_input[i].value;
}

budget_history.push(this_year_info);

// Move to the information screen with results from this year 

big_table.style.animation = "move 2400ms 1";

setTimeout(() => {
    setUp();
}, 1200);

}


big_table.addEventListener("animationend", function() {
    big_table.style.animation = "none";
});

