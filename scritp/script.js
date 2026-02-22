let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'

let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");
let jobsCount = document.getElementById("jobs");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCard");
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById("filtered-section");


function calculateCount(){

    const totaljobs = allCardSection.children.length;

    total.innerText = totaljobs;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if(currentStatus === 'interview-filter-btn'){
        jobsCount.innerText = `${interviewList.length} of ${totaljobs}`;
    }
    else if(currentStatus === 'rejected-filter-btn'){
        jobsCount.innerText = `${rejectedList.length} of ${totaljobs}`;
    }
    else{
        jobsCount.innerText = totaljobs;
    }

    const emmtyContainer = document.getElementById("empty-container");

    if(currentStatus === 'all-filter-btn'){
        if(totaljobs === 0){
            allCardSection.classList.add('hidden');
            filterSection.classList.add('hidden');
            emmtyContainer.classList.remove('hidden');
        }else{
            emmtyContainer.classList.add('hidden');
        }
    }
    else if(currentStatus === 'interview-filter-btn'){
        if(interviewList.length === 0){
            filterSection.classList.add('hidden');
            emmtyContainer.classList.remove('hidden');
        }else{
            emmtyContainer.classList.add('hidden');
        }
    }
    else if(currentStatus === 'rejected-filter-btn'){
        if(rejectedList.length === 0){
            filterSection.classList.add('hidden');
            emmtyContainer.classList.remove('hidden');
        }else{
            emmtyContainer.classList.add('hidden')
        }
    }
}

calculateCount();

function calculateJobs(){
    
}




function toggleStyle(id){
    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-black/50');
    interviewFilterBtn.classList.add('bg-white', 'text-black/50');
    rejectedFilterBtn.classList.add('bg-white', 'text-black/50');
    
    const selected = document.getElementById(id);
    currentStatus = id;
      
    selected.classList.remove('bg-white', 'text-black/50');
    selected.classList.add('bg-blue-500', 'text-white');

    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }else if(id== 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }else if(id=='rejected-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    calculateCount();
}



mainContainer.addEventListener('click', function(event){

    if(event.target.classList.contains('interview-btn')){
        const parenNode = event.target.parentNode.parentNode;

        const jobsName = parenNode.querySelector('.jobsName').innerText;
        const jobsDescription = parenNode.querySelector('.jobsDescription').innerText;
        const selary = parenNode.querySelector('.selary').innerText;
        const statu = parenNode.querySelector('.statu').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

         const statusModifid = parenNode.querySelector('.statu');
        statusModifid.innerText = 'INTERVIEW';
        statusModifid.className = 'statu px-3 py-2 rounded-sm inline-block';
        statusModifid.classList.add(
            'text-green-600',
            'bg-green-100',
            'border',
            'border-green-6000'
        )

        const cardInfo ={
            jobsName,
            jobsDescription,
            selary,
            statu:'INTERVIEW',
            notes
        }
        
        const jobsExist = interviewList.find(item=> item.jobsName == cardInfo.jobsName);

                
        if(!jobsExist){
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item=> item.jobsName != cardInfo.jobsName)
                
        calculateCount();

        if(currentStatus == "rejected-filter-btn"){
            renderRejected();
        }

        
    }else if(event.target.classList.contains('rejected-btn')){
        const parenNode = event.target.parentNode.parentNode;

        const jobsName = parenNode.querySelector('.jobsName').innerText;
        const jobsDescription = parenNode.querySelector('.jobsDescription').innerText;
        const selary = parenNode.querySelector('.selary').innerText;
        const statu = parenNode.querySelector('.statu').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        const statusModifid = parenNode.querySelector('.statu');
        statusModifid.innerText = 'REJECTED';
        statusModifid.className = 'statu px-3 py-2 rounded-sm inline-block';
        statusModifid.classList.add(
            'text-red-600',
            'bg-red-100',
            'border',
            'border-red-6000'
        )
        

        const cardInfo ={
            jobsName,
            jobsDescription,
            selary,
            statu:'REJECTED',
            notes
        }
        
        const jobsExist = rejectedList.find(item=> item.jobsName == cardInfo.jobsName);

                
        if(!jobsExist){
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item=> item.jobsName != cardInfo.jobsName)

        if(currentStatus == "interview-filter-btn"){
            renderInterview();
        }

        calculateCount();
    }else if(event.target.closest('.btn-delete')){
        const cart = event.target.closest('.cart');
        const jobsName = cart.querySelector('.jobsName').innerText;

        const isconfirmed = confirm(`Are you sure to delete "${jobsName}" ?`);

        if(!isconfirmed){
            return;
        }
        interviewList = interviewList.filter(item => item.jobsName !== jobsName);
        rejectedList = rejectedList.filter(item => item.jobsName !== jobsName);
        cart.remove();

        if(currentStatus === 'interview-filter-btn'){
            renderInterview();
        }else if(currentStatus === 'rejected-filter-btn'){
            renderRejected();
        }
        calculateCount();        
    }    
})



function renderInterview (){
    filterSection.innerHTML = ''

    for(let interview of interviewList ){
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'cart mt-4 flex justify-between bg-white py-6 px-6 rounded-xl border border-gray-200'
        div.innerHTML = `
        <div class="space-y-6">
                    <div>
                        <p class="jobsName text-[#002C5C] text-[18px] font-semibold leading-[26px]">${interview.jobsName}</p>
                        <p class="jobsDescription text-[#64748B] text-[16px] leading-5">${interview.jobsDescription}</p>
                    </div>
                    <div>
                        <p class="selary text-[#323B49] text-[14px] leading-5">${interview.selary}</p>
                    </div>
                    <p class="statu text-green-600 bg-green-100 border border-green-600 px-3 py-2 rounded-sm inline-block">${interview.statu}</p>
                    <p class="notes">${interview.notes}</p>
                    <div class="flex gap-5">
                        <button class="cursor-pointer interview-btn border border-green-500 font-semibold text-green-500 px-4 py-2 rounded-sm hover:bg-green-50">INTERVIEW</button>
                        <button class="cursor-pointer rejected-btn border border-red-500 font-semibold text-red-500 px-4 py-2 rounded-sm hover:bg-red-50">REJECTED</button>
                    </div>
                </div>
                <div>
                    <button class="btn-delete border border-gray-300 flex items-center justify-center rounded-full w-12 h-12 hover:border-red-300 transition cursor-pointer"><i class="fa-regular fa-trash-can text-lg"></i></button>
                </div>
        `
        filterSection.appendChild(div);
    }
}
function renderRejected (){
    filterSection.innerHTML = ''

    for(let rejected of rejectedList){

        let div = document.createElement('div');
        div.className = 'cart mt-4 flex justify-between bg-white py-6 px-6 rounded-xl border border-gray-200'
        div.innerHTML = `
        <div class="space-y-6">
                    <div>
                        <p class="jobsName text-[#002C5C] text-[18px] font-semibold leading-[26px]">${rejected.jobsName}</p>
                        <p class="jobsDescription text-[#64748B] text-[16px] leading-5">${rejected.jobsDescription}</p>
                    </div>
                    <div>
                        <p class="selary text-[#323B49] text-[14px] leading-5">${rejected.selary}</p>
                    </div>
                    <p class="statu text-red-600 bg-red-100 border border-red-600 px-3 py-2 rounded-sm inline-block">${rejected.statu}</p>
                    <p class="notes">${rejected.notes}</p>
                    <div class="flex gap-5">
                        <button class="cursor-pointer interview-btn border border-green-500 font-semibold text-green-500 px-4 py-2 rounded-sm hover:bg-green-50">INTERVIEW</button>
                        <button class="cursor-pointer rejected-btn border border-red-500 font-semibold text-red-500 px-4 py-2 rounded-sm hover:bg-red-50">REJECTED</button>
                    </div>
                </div>
                <div>
                    <button class="btn-delete border border-gray-300 flex items-center justify-center rounded-full w-12 h-12 hover:border-red-300 transition cursor-pointer"><i class="fa-regular fa-trash-can text-lg"></i></button>
                </div>
        `
        filterSection.appendChild(div);
    }
}

