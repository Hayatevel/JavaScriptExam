const setYear = function () {
    let yearElement = document.getElementById("current_year");
    let thisYear = new Date().getFullYear();
    yearElement.innerHTML = thisYear;
}

setYear();