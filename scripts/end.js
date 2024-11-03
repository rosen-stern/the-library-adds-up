var library_name = localStorage.getItem("library_name");
var game_end_reason = localStorage.getItem("game_end_reason");
var budget_history = localStorage.getItem("budget_history");

document.getElementById("newspaper-headline").innerHTML = library_name + " PUBLIC LIBRARY CLOSES BECAUSE " + game_end_reason;

function playAgain(){
    window.location.href = "index.html";
}


