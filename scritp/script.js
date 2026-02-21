let interviewList = [];
let rejectedList = [];




let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

let jobsCount = document.getElementById("jobs");

const allCardSection = document.getElementById("allCard");

const mainContainer = document.querySelector('main');
console.log(mainContainer);

// const allFilterBtn = document.getElementById("all-filter-btn")
// allFilterBtn.addEventListener("click", function(){
//     alert("click from add even")
// })

function calculateCount(){
    total.innerText = allCardSection.children.length;
    jobsCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id){
    console.log("click");
}