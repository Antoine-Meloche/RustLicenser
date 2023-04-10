import { invoke } from "@tauri-apps/api/tauri";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;
let licenseSelect: HTMLSelectElement | null;
let licenseParams: HTMLElement | null;
let addNameBtn: HTMLButtonElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  licenseSelect = document.querySelector("#licenses");
  licenseParams = document.querySelector("#license-params");
  addNameBtn = document.querySelector("#add-name");

  licenseSelect?.addEventListener("change", () => {
    if (licenseParams !== null) {
      if (licenseSelect?.value == "gplv3") {
        licenseParams.innerHTML = `
          <div class="hcontainer">
            <label for="copy-name">Name(s) for copyright notices</label>
            <button id="add-name">+</button>
          </div>
        `;
      } else {
        licenseParams.innerHTML = "";
      }
    }
  });

  addNameBtn?.addEventListener("click", () => {
    if (licenseParams !== null) {
      licenseParams.innerHTML += `
        <input name="copy-name" type="text" placeholder="John Doe" />
      `;
    }
  });

});
