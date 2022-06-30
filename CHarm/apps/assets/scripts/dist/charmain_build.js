/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/charm.js":
/*!*********************************!*\
  !*** ./assets/scripts/charm.js ***!
  \*********************************/
/***/ (() => {

eval("\n\nconst _ =  document \n\nconst  [  \n    applycharm\n    ,form\n\n] = [\n    _.querySelector(\".autocorrect\")   // applycharm  \n    ,_.getElementsByTagName(\"form\")      // form  \n    ]\n\n\n\n\nconst   charm    = {  \n\n    main  () {  \n        applycharm.addEventListener(\"submit\" , evt => {\n            evt.preventDefault()  \n            const payload  =  { \n                method :\"POST\" , \n                body:new FromData(form) \n            }\n            const  status = fetch(\"/\", { ...payload}) \n            console.log(status) \n        }) \n    } \n}\n\n\n\n\n\n//# sourceURL=webpack://CHarm/./assets/scripts/charm.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/scripts/charm.js"]();
/******/ 	
/******/ })()
;