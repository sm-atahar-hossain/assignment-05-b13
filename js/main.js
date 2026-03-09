let allIssues = [];

const controlSpinner = (status) => {
  const spinner = document.querySelector('#spinner');
  if (status == true) {
    spinner.classList.remove("hidden");
    document.querySelector('#displayIssues').classList.add('hidden');
  }
  else {
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
    })
    .catch(error => {
    console.error("Search Error:", error);
  });
};
const loadIssuesDetails =(id)=>{
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  .then(res=> res.json())
  .then(json=> displayIssuesDetails(json.data))
  .catch(error => {
    console.error("Search Error:", error);
  });
}

const displayIssuesDetails = (obj) => {
  const detailsDiv = document.querySelector('#detailsDiv');
  detailsDiv.innerHTML = `
  <div class="w-full bg-white rounded-md flex flex-col items-start space-y-2 p-3">

    <!-- Title -->
    <div class="text-lg font-bold">${obj.title}</div>

    <!-- Status & Author info -->
    <div class="flex items-center justify-between w-full">
     <button class="btn rounded-3xl px-4 py-1 ${ obj.status.toLowerCase() === "open" ? "btn-success text-white" : "bg-purple-500 text-white"}">${obj.status.toUpperCase()}</button>
     <div class="text-[12px] text-gray-500 flex gap-5">
      <span>Opened by ${obj.author}</span>
      <span>${new Date(obj.createdAt).toLocaleDateString()}</span>
     </div>
    </div>

    <!-- Labels -->
    <div class="flex gap-3">${
      !obj.labels[0] || obj.labels[0].toLowerCase() === "bug"
      ? `
        <button class="btn rounded-2xl bg-pink-500 text-white">BUG</button>
        <button class="btn rounded-2xl bg-yellow-500 text-white">HELP WANTED</button>
      `
      : (obj.labels[0].toLowerCase() === "enhancement" || obj.labels[0].toLowerCase() === "documentation")
        ? `<button class="btn rounded-2xl bg-green-500 text-white">${obj.labels[0].toUpperCase()}</button>`
        : `<button class="btn rounded-2xl bg-gray-200 text-black">${obj.labels[0].toUpperCase()}</button>`
      }
    </div>

    <!-- Description -->
    <div class="text-sm text-gray-500">
      ${obj.description}
    </div>

    <!-- Assignee & Priority -->
    <div class="bg-gray-100 flex w-full justify-between p-3 rounded-lg text-sm">
      <div class="w-1/2">
        <p class="text-gray-500">Assignee:</p>
        <p class="font-bold">${obj.assignee || "N/A"}</p>
      </div>
      <div class="flex flex-col w-1/2">
        <p class="text-gray-500">Priority:</p>
        <button class="btn rounded-2xl w-fit ${
          obj.priority.toLowerCase() === "high" ? "bg-purple-500 text-white" :
          obj.priority.toLowerCase() === "medium" ? "bg-yellow-500 text-white" :"bg-gray-500 text-white"
        }">
        ${obj.priority.toUpperCase()}
        </button>
      </div>
    </div>

  </div>
  `;
  document.querySelector('#my_modal').showModal();
};

const activeBtn = () => {
  const activeBtns = document.querySelectorAll(".activeBtn");
  activeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeBtns.forEach(b => b.classList.remove("btn-primary"));
      btn.classList.add('btn-primary');
    });
  });
}

const displayIssues = (arr) => {
  let count = 0;
  const issuesDiv = document.querySelector('#issuesDiv');
  const issueCount = document.querySelector('#issuesCount');
  issuesDiv.innerHTML = '';

  for (let obj of arr) {
    const card = document.createElement('div');
    card.innerHTML = `
        <div onclick="loadIssuesDetails(${obj.id})" class="w-[320px] h-[420px] bg-white flex flex-col gap-4 p-10 rounded-lg ${obj.status === "open"
        ? "shadow-green-600"
        : "shadow-purple-500"}  shadow-inner">
        
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

const searchIt = () => {
  const searchInput = document.querySelector('#searchInput');
  let value = searchInput.value.trim();
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`)
    .then(res => res.json())
    .then(json => {
      displayIssues(json.data);
    })
    .catch(error => {
    console.error("Search Error:", error);
  });
}
loadAllIssues();

