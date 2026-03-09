let allIssues = [];

const controlSpinner= (status)=>{
  const spinner = document.querySelector('#spinner');
  if(status == true){
    spinner.classList.remove("hidden");
    document.querySelector('#displayIssues').classList.add('hidden');
  }
  else{
    document.querySelector('#displayIssues').classList.remove("hidden");
    spinner.classList.add('hidden');
  }
}

const loadAllIssues = () => {
  controlSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      allIssues = json.data;
      displayIssues(allIssues);
    });
};

const activeBtn= ()=>{
  const activeBtns = document.querySelectorAll(".activeBtn");
  activeBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
      activeBtns.forEach(b=> b.classList.remove("btn-primary"));
      btn.classList.add('btn-primary');
    });
  });
}

const displayIssues = (arr) => {
  let count = 0;
  controlSpinner(true);
  const issuesDiv = document.querySelector('#issuesDiv');
  const issueCount = document.querySelector('#issuesCount');
  issuesDiv.innerHTML = '';

  for (let obj of arr) {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="w-[320px] h-[420px] bg-white flex flex-col gap-4 p-10 rounded-lg ${obj.status === "open"
              ? "shadow-green-600"
              :"shadow-purple-500"}  shadow-inner">
        
         <div class="flex justify-between">
            <img class="w-6 h-6"
             src="${obj.status === "open"
              ? "../assets/Open-Status.png"
              : "../assets/Closed- Status .png"}" />
            <button class=" btn rounded-4xl bg-white
              ${obj.priority === "high"
              ? "!bg-pink-50 text-pink-500 border border-pink-500"
              : obj.priority === "medium"
              ? " !bg-yellow-50 text-yellow-500 border-yellow-500"
              : "!bg-gray-50 text-gray-500 border-gray-500"}">
              ${obj.priority.toUpperCase()}
            </button>
           </div>

          <div class="text-lg md:text-xl font-semibold">
          ${obj.title}
          </div>

          <div class="text-gray-400 text-sm">
          ${obj.description}
          </div>

          <div class="flex justify-center gap-2">
             ${!obj.labels[0] || obj.labels[0] === "bug"
            ? `<button class="btn bg-pink-50 text-pink-500 border-pink-500 text-[10px] rounded-4xl flex gap-1">
               <i class="fa-solid fa-bug"></i>
               <span>BUG</span> 
               </button>`
            : `<button class="btn bg-green-50 text-green-500 border-green-500 text-[10px] rounded-4xl">
            ${obj.labels[0].toUpperCase()}</button>`}

            ${!obj.labels[0] || obj.labels[0] === "bug"
            ? `<button class="btn bg-yellow-50 text-yellow-500 border-yellow-500 text-[10px] rounded-4xl">
            HELP WANTED</button>`: ""}
          </div>

          <div class="mt-5 flex flex-col justify-center items-start text-sm border-gray-300 border-t-1 pt-4">
            <p>#${obj.id} by ${obj.author}</p>
            <p>${new Date(obj.createdAt).toLocaleDateString()}</p>
          </div>

      </div>
        `
    issuesDiv.appendChild(card);
    count++;
  }
  issueCount.innerText = count;
  activeBtn();
  controlSpinner(false);

}

const filterIssues = (status) => {
  let newArr = allIssues.filter(issue => issue.status === status);
  displayIssues(newArr);
  activeBtn();
}

loadAllIssues();