var courseId = ""; /* Put the id of your course here (See README.md for instructions on how to find yours!!) */
fetch("https://raw.githubusercontent.com/rainbrot/js-smartbook-solver/refs/heads/main/solver.js").then(result => result.text()).then((solverCode) => {
    eval(solverCode.replace('var courseId = "', 'var courseId = "' + courseId));
});
