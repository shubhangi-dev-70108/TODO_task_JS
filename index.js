const checkBoxlist = document.querySelectorAll(".custom-checkbox");
const inputFeild = document.querySelectorAll(".goal-input");
const progressbar = document.querySelector(".progress-bar");
const errorBar = document.querySelector(".error-label");
const progressvalue = document.querySelector(".progress-value");
const progresslabel = document.querySelector(".progresslabel");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// Get all the completed goal count
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed,
).length;

// Fills the progress bar with completion percentage
progressvalue.style.width = `${
  (completedGoalsCount / inputFeild.length) * 100
}% `;
progressvalue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFeild.length} completed`;
progresslabel.innerText = allQuotes[completedGoalsCount];

// Every checkbox must have user filled input text
checkBoxlist.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInputFilled = [...inputFeild].every(function (input) {
      return input.value;
    });

    // When all the 3 input field filled then progress bar completed having allquote
    if (allInputFilled) {
      checkbox.parentElement.classList.toggle("completed");
      const inputid = checkbox.nextElementSibling.id;
      allGoals[inputid].completed = !allGoals[inputid].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed,
      ).length;
      progressvalue.style.width = `${
        (completedGoalsCount / inputFeild.length) * 100
      }% `;
      progressvalue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFeild.length} completed`;
      progresslabel.innerText = allQuotes[completedGoalsCount];

      // When all the checkbox has the input it saves in local storage
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressbar.classList.add("show-error");
    }
  });
});

inputFeild.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressbar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    // Updating the local storage
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
