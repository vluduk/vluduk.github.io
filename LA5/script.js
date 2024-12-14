const cookieExists = document.cookie
  .split("; ")
  .find((row) => row.startsWith("minValue="));
if (cookieExists) {
  const minValue = cookieExists.split("=")[1];
  alert(
    `Stored min value: ${minValue}; After pressing OK, cookie will be deleted`
  );
  document.cookie = "minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

loadCSSInstructions();

const sideBar = document.querySelector(".box3");
const fontWeight = localStorage.getItem("fontWeight");
if (fontWeight) {
  sideBar.style.fontWeight = fontWeight;
}

const x = document.getElementById("x");
const y = document.getElementById("y");
const temp = x.innerHTML;
x.innerHTML = y.innerHTML;
y.innerHTML = temp;

const a = 10;
const b = 15;
const area = a * b;

const areaElement = document.getElementById("area");
areaElement.innerHTML = `Area of rectangle with sides ${a} and ${b} is ${area}`;

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("form-input").value;
  const splittedValues = input.split(",");
  const minValue = Math.min(...splittedValues);
  const count = splittedValues.filter((value) => value == minValue).length;
  alert("Min value is: " + minValue + " and it occurs " + count + " times");

  document.cookie = "minValue=" + minValue;
});

const checkBox = document.getElementById("check");
let saveToLocalStorage = false;
checkBox.addEventListener("change", () => {
  saveToLocalStorage = !saveToLocalStorage;
});

window.addEventListener("keydown", () => {
  const sideBar = document.querySelector(".box3");
  sideBar.style.fontWeight = "bold";
  if (saveToLocalStorage) {
    localStorage.setItem("fontWeight", "bold");
  }
});

window.addEventListener("keyup", () => {
  const sideBar = document.querySelector(".box3");
  sideBar.style.fontWeight = "normal";
  if (saveToLocalStorage) {
    localStorage.removeItem("fontWeight");
  }
});

const staticContent = document.querySelector(".box5").innerHTML;
let toggle = false;

x.addEventListener("dblclick", () => {
  if (toggle) {
    document.querySelector(".box5").innerHTML = staticContent;
    toggle = false;
    return;
  }
  toggle = true;
  const block5 = document.querySelector(".box5");

  const form = document.createElement("form");
  form.id = "css-form";
  form.className = "css-form";

  const tagInput = document.createElement("input");
  tagInput.placeholder = "Введіть тег (наприклад, div або p)";
  tagInput.id = "tagInput";

  const cssPropertyInput = document.createElement("input");
  cssPropertyInput.placeholder = "Введіть CSS-властивість (наприклад, color)";
  cssPropertyInput.id = "cssPropertyInput";

  const cssValueInput = document.createElement("input");
  cssValueInput.placeholder = "Введіть значення CSS (наприклад, red)";
  cssValueInput.id = "cssValueInput";

  const addButton = document.createElement("button");
  addButton.textContent = "Додати CSS інструкцію";

  form.onsubmit = addCSSInstruction;

  block5.appendChild(form);
  form.appendChild(tagInput);
  form.appendChild(cssPropertyInput);
  form.appendChild(cssValueInput);
  form.appendChild(addButton);
});

function addCSSInstruction(e) {
  e.preventDefault();
  const tag = document.getElementById("tagInput").value;
  const property = document.getElementById("cssPropertyInput").value;
  const value = document.getElementById("cssValueInput").value;

  if (tag && property && value) {
    const cssInstruction = { tag, property, value };
    let instructions =
      JSON.parse(localStorage.getItem("cssInstructions")) || [];
    instructions.push(cssInstruction);
    localStorage.setItem("cssInstructions", JSON.stringify(instructions));
    applyCSSInstruction(cssInstruction);
    addDeleteButton(cssInstruction);
  }
}

function applyCSSInstruction(instruction) {
  const elements = document.getElementsByTagName(instruction.tag);
  for (let element of elements) {
    element.style[instruction.property] = instruction.value;
  }
}

function addDeleteButton(instruction) {
  const deleteContainer = document.querySelector(".box2");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = `Видалити ${instruction.tag} { ${instruction.property}: ${instruction.value} }`;
  deleteButton.onclick = function () {
    deleteCSSInstruction(instruction);
  };
  deleteContainer.appendChild(deleteButton);
}

function deleteCSSInstruction(instruction) {
  let instructions = JSON.parse(localStorage.getItem("cssInstructions")) || [];
  instructions = instructions.filter(
    (inst) =>
      !(
        inst.tag === instruction.tag &&
        inst.property === instruction.property &&
        inst.value === instruction.value
      )
  );
  localStorage.setItem("cssInstructions", JSON.stringify(instructions));
  resetCSS(instruction);
}

function resetCSS(instruction) {
  const elements = document.getElementsByTagName(instruction.tag);
  for (let element of elements) {
    element.style[instruction.property] = "";
  }
  document.querySelector(".box2").innerHTML = "";
  loadDeleteButtons();
}

function loadCSSInstructions() {
  const instructions =
    JSON.parse(localStorage.getItem("cssInstructions")) || [];
  for (let instruction of instructions) {
    applyCSSInstruction(instruction);
    addDeleteButton(instruction);
  }
}

function loadDeleteButtons() {
  const instructions =
    JSON.parse(localStorage.getItem("cssInstructions")) || [];
  for (let instruction of instructions) {
    addDeleteButton(instruction);
  }
}
