import { invoke } from "@tauri-apps/api/tauri";

let licenseSelect: HTMLSelectElement | null;
let licenseParams: HTMLElement | null;
let addNameBtn: HTMLButtonElement | null;
let folderSelBtn: HTMLButtonElement | null;

window.addEventListener("DOMContentLoaded", () => {
  licenseSelect = document.querySelector("#licenses");
  licenseParams = document.querySelector("#license-params");
  addNameBtn = document.querySelector("#add-name");
  folderSelBtn = document.querySelector("#folder-select");

  licenseSelect?.addEventListener("change", () => {
    if (licenseParams !== null) {
      if (licenseSelect?.value == "gplv3") {
        var hcon = document.createElement("div");
        hcon.classList.add("hcontainer");

        var label = document.createElement("label");
        label.htmlFor = "copy-name";
        label.innerHTML = "Name(s) for copyright notices";
        hcon.appendChild(label);

        var btn = document.createElement("button");
        btn.id = "add-name";
        btn.innerHTML = "+";
        btn.onclick = addNameInput;
        hcon.appendChild(btn);

        licenseParams.appendChild(hcon);
        addNameInput();
      } else {
        licenseParams.innerHTML = "";
      }
    }
  });

  addNameBtn?.addEventListener("click", addNameInput);
  folderSelBtn?.addEventListener("click", selectFolder);
});

function addNameInput() {
  if (licenseParams !== null) {
    var ele = document.createElement("input");
    ele.name = "copy-name";
    ele.type = "text";
    ele.placeholder = "John Doe";
    licenseParams.appendChild(ele);
  }
}

async function selectFolder() {
  let files = await invoke("open_folder", {});
  console.log(files);
}
