const dialog = document.getElementById("maBoiteDialogue");
const ouvrirBtn = document.getElementById("ouvrirDialog");
const fermerBtn = document.getElementById("fermerDialog");

ouvrirBtn.addEventListener("click", () => {
    dialog.showModal(); // Rend la boîte modale (le reste de la page devient inerte)
});

fermerBtn.addEventListener("click", () => {
    dialog.close(); // Ferme la boîte
});
