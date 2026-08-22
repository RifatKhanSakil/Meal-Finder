var allArrayData = [];


function connect(){

    var search = document.getElementById("userInput").value;

    var oldContent = document.getElementById("displayArea");

    var showAllArea = document.getElementById("showAllArea");

    var resultInfo = document.getElementById("resultInfo");


    oldContent.textContent = "";

    showAllArea.textContent = "";

    resultInfo.textContent = "";


    if(search == ""){

        resultInfo.innerHTML = `
            <div class="message">
                Please enter a meal name to search.
            </div>
        `;

        return;

    }


    resultInfo.innerHTML = `
        <div class="loading">
            Searching for delicious meals...
        </div>
    `;


    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;


    fetch(url)

    .then( res => res.json() )

    .then( data => display(data) )

    .catch( error => {

        resultInfo.innerHTML = `
            <div class="message">
                Something went wrong. Please try again.
            </div>
        `;

    });

}



function display(data){

    var oldContent = document.getElementById("displayArea");

    var showAllArea = document.getElementById("showAllArea");

    var resultInfo = document.getElementById("resultInfo");


    oldContent.textContent = "";

    showAllArea.textContent = "";


    allArrayData = data.meals;


    if(allArrayData == null){

        resultInfo.innerHTML = `
            <div class="message">
                No meals found. Please try another search.
            </div>
        `;

        return;

    }


    var resultNumber = allArrayData.length;

    var showNumber = resultNumber;


    resultInfo.innerHTML = `
        <p class="resultText">
            Found <b>${resultNumber}</b> meal result(s)
        </p>
    `;


    if(resultNumber > 5){

        showNumber = 5;

        resultInfo.innerHTML = `
            <p class="resultText">
                Found <b>${resultNumber}</b> meals.
                Showing the first <b>5</b> results.
            </p>
        `;

    }


    for(var i=1; i<=showNumber; i++){

        var newDiv = document.createElement("div");


        newDiv.innerHTML = `

            <img
                src="${allArrayData[i-1].strMealThumb}"
                alt="${allArrayData[i-1].strMeal}"
            >

            <div class="mealContent">

                <span class="mealId">
                    Meal ID: ${allArrayData[i-1].idMeal}
                </span>

                <h2>
                    ${allArrayData[i-1].strMeal}
                </h2>

                <h4>
                    Cooking Instructions
                </h4>

                <p>
                    ${allArrayData[i-1].strInstructions}
                </p>

            </div>

        `;


        newDiv.classList.add("innerStyle");

        oldContent.appendChild(newDiv);

    }


    if(resultNumber > 5){

        var showAllButton = document.createElement("button");

        showAllButton.textContent = "SHOW ALL MEALS";

        showAllButton.classList.add("showAllButton");

        showAllButton.onclick = showAll;

        showAllArea.appendChild(showAllButton);

    }

}



function showAll(){

    var oldContent = document.getElementById("displayArea");

    var showAllArea = document.getElementById("showAllArea");

    var resultInfo = document.getElementById("resultInfo");


    oldContent.textContent = "";

    showAllArea.textContent = "";


    resultInfo.innerHTML = `
        <p class="resultText">
            Showing all <b>${allArrayData.length}</b> meal results.
        </p>
    `;


    for(var i=1; i<=allArrayData.length; i++){

        var newDiv = document.createElement("div");


        newDiv.innerHTML = `

            <img
                src="${allArrayData[i-1].strMealThumb}"
                alt="${allArrayData[i-1].strMeal}"
            >

            <div class="mealContent">

                <span class="mealId">
                    Meal ID: ${allArrayData[i-1].idMeal}
                </span>

                <h2>
                    ${allArrayData[i-1].strMeal}
                </h2>

                <h4>
                    Cooking Instructions
                </h4>

                <p>
                    ${allArrayData[i-1].strInstructions}
                </p>

            </div>

        `;


        newDiv.classList.add("innerStyle");

        oldContent.appendChild(newDiv);

    }

}



/* Back to Home */

function goHome(){

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

}