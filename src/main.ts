import "./style.css";

const billInput = document.getElementById("bill") as HTMLInputElement;
const peopleInput = document.getElementById("people") as HTMLInputElement;
const errorMsg = document.getElementById("error-msg") as HTMLElement;
const tipBtns = document.querySelectorAll<HTMLButtonElement>(".grid button");
const customTipInput = document.querySelector<HTMLInputElement>('.grid input[type="number"]');

const asideDisplays = document.querySelectorAll<HTMLElement>("aside .text-3xl, aside .text-5xl");
const tipAmountDisplay = asideDisplays[0];
const totalDisplay = asideDisplays[1];
const resetBtn = document.querySelector<HTMLButtonElement>("aside button")!;

let billValue = 0;
let tipValue = 0; 
let peopleValue = 0;

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function clearActiveTipButtons() {
  tipBtns.forEach((btn) => {
    btn.classList.remove("bg-[hsl(172,67%,45%)]", "text-[hsl(183,100%,15%)]");
    btn.classList.add("bg-[hsl(183,100%,15%)]", "text-white");
  });
}

function updateResetButton() {
  const hasInput = billInput.value !== "" || peopleInput.value !== "" || (customTipInput && customTipInput.value !== "") || tipValue > 0;

  if (hasInput) {
    resetBtn.disabled = false;
    resetBtn.classList.remove("bg-[hsl(172,67%,45%)]/20", "cursor-not-allowed");
    resetBtn.classList.add("bg-[hsl(172,67%,45%)]", "cursor-pointer");
  } else {
    resetBtn.disabled = true;
    resetBtn.classList.add("bg-[hsl(172,67%,45%)]/20", "cursor-not-allowed");
    resetBtn.classList.remove("bg-[hsl(172,67%,45%)]", "cursor-pointer");
  }
}

function calculate() {
  // Validate number of people
  if (peopleValue <= 0) {
    if (peopleInput.value !== "") {
      errorMsg.classList.remove("hidden");
      peopleInput.classList.add("border-red-500");
      peopleInput.classList.remove("border-transparent");
    }
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
    updateResetButton();
    return;
  } else {
    errorMsg.classList.add("hidden");
    peopleInput.classList.remove("border-red-500");
    peopleInput.classList.add("border-transparent");
  }

  if (billValue >= 0 && tipValue >= 0 && peopleValue > 0) {
    const tipAmount = (billValue * tipValue) / peopleValue;
    const totalAmount = (billValue * (1 + tipValue)) / peopleValue;

    tipAmountDisplay.textContent = formatCurrency(tipAmount);
    totalDisplay.textContent = formatCurrency(totalAmount);
  }

  updateResetButton();
}

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value) || 0;
  calculate();
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearActiveTipButtons();

    btn.classList.remove("bg-[hsl(183,100%,15%)]", "text-white");
    btn.classList.add("bg-[hsl(172,67%,45%)]", "text-[hsl(183,100%,15%)]");

    if (customTipInput) customTipInput.value = "";

    const percentage = parseFloat(btn.textContent?.replace("%", "").trim() || "0");
    tipValue = percentage / 100;
    calculate();
  });
});

if (customTipInput) {
  customTipInput.addEventListener("input", () => {
    clearActiveTipButtons();
    const val = parseFloat(customTipInput.value);
    tipValue = isNaN(val) ? 0 : val / 100;
    calculate();
  });
}

peopleInput.addEventListener("input", () => {
  peopleValue = parseFloat(peopleInput.value) || 0;
  calculate();
});

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  if (customTipInput) customTipInput.value = "";

  billValue = 0;
  tipValue = 0;
  peopleValue = 0;

  clearActiveTipButtons();
  errorMsg.classList.add("hidden");
  peopleInput.classList.remove("border-red-500");
  peopleInput.classList.add("border-transparent");

  tipAmountDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";

  updateResetButton();
});
