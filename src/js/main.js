const dialog = document.getElementById("maBoiteDialogue");
const ouvrirBtn = document.getElementById("ouvrirDialog");
const fermerBtn = document.getElementById("fermerDialog");

ouvrirBtn.addEventListener("click", () => {
    if (dialog.open) {
        dialog.close();
        return;
    }

    dialog.showModal();
});

fermerBtn.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});
