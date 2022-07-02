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

eval("/**\n * charm  for CHarm  \n * copyright(c) , 2022 , Umar <jUmarB@protonmail.com  \n */\n\n\n__WEB_SOCKET_USER_AGENT__ :  \nua_socket_communication  =  io()  \n\nconst _ =  document ,  {log} =  console , \n[  \n    applycharm\n    ,form \n] = [\n    _.querySelector(\".autocorrect\")   // applycharm \n    ,_.getElementsByTagName(\"form\")       // form  \n]\n\n__DOM_MANIPULATION__  :   \nform[0].addEventListener(\"submit\" , async evt => {\n    evt.preventDefault()  \n    formetadata  = form[0] \n\n    const payload  =  { \n        method :\"POST\" , \n        body:new FormData(formetadata)  \n        \n    } \n    const  stat  = await fetch(\"/\", { ...payload})\n     \n    if ( stat.status == 200 )  \n    {\n        //!  send socket signal  to start processing  \n        ua_socket_communication.emit(\"apply::autocorrection\" , true ) \n        \n        //! TODO :  ADD  SOME SPINER ANIMATION  ...  \n    }\n   \n}) \n\n__SOCKET_COM_HANDLER__ :  \nua_socket_communication.emit(\"init\", navigator.userAgent)  \n\n\n\n\n\n\n//# sourceURL=webpack://CHarm/./assets/scripts/charm.js?");

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