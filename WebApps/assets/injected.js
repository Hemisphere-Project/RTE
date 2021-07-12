// BLOCK KEYS
document.onkeydown = function(e) {
    console.log(e.keyCode);
    if (e.keyCode >= 112 && e.keyCode <= 123) return false; // Block F1->F12
    if (e.keyCode == 18) return false; // Block Alt
};