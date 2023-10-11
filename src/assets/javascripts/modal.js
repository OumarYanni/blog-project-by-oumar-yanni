/*import { reject, resolve } from "core-js/fn/promise";
import { version } from "html-webpack-plugin";*/

const body = document.querySelector("body");
let calc;
let modal;
let cancel;
let confirm;


const createCalc = () => {
    calc = document.createElement("div");
    calc.classList.add("calc");
};


const createModal = question => {
    modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML =`<p>${question}</p>`;

    cancel = document.createElement("button");
    cancel.innerText = "Annuler";
    cancel.classList.add("btn", "btn-secondary");

    confirm = document.createElement("button");
    confirm.classList.add("btn", "btn-primary");
    confirm.innerText = "Confirmer";

    // We prevent the event from propagating so that the modal doesn't close when clicked:
    modal.addEventListener("click", event => {
        event.stopPropagation();
    });

    modal.append(cancel, confirm);
};


export function openModal(question) {
    createCalc();
    createModal(question);
    calc.append(modal);
    body.append(calc);

    // We return a new promise that will be kept
  // when the user clicks.
  // Either he clicks on the layer or cancel and the promise will be resolved with false.
  // Or click on confirm and the promise will be resolved with true.
  return new Promise((resolve, reject) => {
    calc.addEventListener("click", () => {
        resolve(false);
        calc.remove();
    });

    cancel.addEventListener("click", () => {
        resolve(false);
        calc.remove();
    });

    confirm.addEventListener("click", () => {
        resolve(true);
        calc.remove();
    });
  })
}