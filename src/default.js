var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: {
        name: "java",
        singleLineStringErrors: false
    },
    lineNumbers: true,
    indentUnit: 4,
    matchBrackets: true
});
var input = document.getElementById("select");
function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    if (theme == 'Night') {
        theme = '3024-night'
    }
    editor.setOption("theme", theme);
    location.hash = "#" + theme;
}
var choice = (location.hash && location.hash.slice(1)) ||
    (document.location.search &&
        decodeURIComponent(document.location.search.slice(1)));
if (choice) {
    input.value = choice;
    editor.setOption("theme", choice);
}
CodeMirror.on(window, "hashchange", function () {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
});