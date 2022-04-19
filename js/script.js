const getData = async function () {
  try {
    const fetchData = await fetch("./data.json");
    const data = await fetchData.json();

    return data;
  } catch (err) {
    throw err;
  }
};

const data = await getData();
const viewType = document.querySelectorAll(".view-type");
const taskGroup = document.querySelectorAll(".task-content");
const viewBtn = document.querySelectorAll(".view-btn");

const updateData = function (viewType, description) {
  taskGroup.forEach((task, index) => {
    task.children[0].textContent = `${data[index].timeframes[viewType].current}hrs`;
    task.children[1].textContent = `${description} - ${data[index].timeframes[viewType].previous}hrs`;
  });
};

viewType.forEach((view) => {
  view.addEventListener("click", function () {
    viewBtn.forEach((btn) => btn.classList.remove("btn--active"));
    view.firstElementChild.classList.add("btn--active");
    const selectedView = view.firstElementChild.textContent.toLowerCase();
    let viewDescription;

    if (selectedView === "daily") {
      viewDescription = "Yesterday";
    }

    if (selectedView === "weekly") {
      viewDescription = "Last Week";
    }

    if (selectedView === "monthly") {
      viewDescription = "Last Month";
    }

    updateData(selectedView, viewDescription);
  });
});

updateData("weekly", "Last Week");
