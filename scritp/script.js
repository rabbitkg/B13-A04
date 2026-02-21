let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

let jobsCount = document.getElementById("jobs");

const allCardSection = document.getElementById("allCard");
console.log(allCardSection.children.length);

function calculateCount(){
    total.innerText = allCardSection.children.length;
    jobsCount.innerText = allCardSection.children.length;
}
calculateCount();