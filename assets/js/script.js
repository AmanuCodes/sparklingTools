const copy = document.querySelector("#copy");
const dateSpan = document.createElement("span");
dateSpan.textContent = new Date().getUTCFullYear();
copy.prepend(dateSpan);