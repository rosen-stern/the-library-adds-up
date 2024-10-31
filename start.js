var library_name_input = document.getElementById("library-name");
var submit_button = document.getElementById("submit-button");

// https://www.reddit.com/r/dataisbeautiful/comments/xuje1c/common_city_name_suffixes_in_the_united_states_oc/#lightbox
library_names = [
["Green", "Blue","Purple","Flora","Ash","Redding","Penn", "Page", "Turner", "Daisy","Twilight", "New", "Olde", "Sky","Arch",],
["wood"," forest", "ville", "shire", "land"," House", " Memorial", " Community", "ton","boro","burg"," Beach", " City", "creek", " Creek", " Wood", "dale","field","hills","lake","land","mont","park","port"," Springs"," Valley"]
];

setUpPage();

function setUpPage(){

submit_button.classList.add("off");
library_name_input.setAttribute("onkeyup", "updateSubmit()");
}

function updateSubmit(){

    if(library_name_input.value){
        submit_button.classList.remove("off");
    }

}


function generateName(){
randomIndex0 = Math.floor(Math.random() * library_names[0].length);
randomIndex1 = Math.floor(Math.random() * library_names[1].length);
    library_name_input.value = library_names[0][randomIndex0] + library_names[1][randomIndex1];

    updateSubmit();
}

function startGame(){

    let library_name = library_name_input.value;
    window.location.href = "main.html";
}