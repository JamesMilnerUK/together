(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Together = exports.Together = function () {
    function Together(parentNode, attribute, subtree) {
        var _this = this;

        _classCallCheck(this, Together);

        this.parentNode = parentNode;
        this.attribute = attribute;
        this.state = new WeakMap();

        var selector = '[data-' + this.attribute + '="*"]';
        var els = parentNode.querySelector(selector);
        if (els) {
            els.forEach(function (el) {
                _this.state.set(el, el.textContent);
            });
        }

        this.observer = new MutationObserver(this.observeDOM.bind(this));
        this.observer.observe(parentNode, {
            attributes: true,
            attributeFilter: ['data-' + this.attribute],
            childList: true,
            subtree: subtree !== false ? true : false // Required!
        });
    }

    _createClass(Together, [{
        key: 'attr',
        value: function attr() {
            return 'data-' + this.attribute;
        }
    }, {
        key: 'observeDOM',
        value: function observeDOM(mutationsList) {
            var _this2 = this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var mutation = _step.value;

                    switch (mutation.type) {
                        case 'childList':
                            mutation.removedNodes.forEach(function (el, i, obj) {
                                if (el.getAttribute !== undefined) {
                                    var stateProp = el.getAttribute(_this2.attr());
                                    if (stateProp) {
                                        _this2.delete(stateProp);
                                    }
                                }
                            });

                            mutation.addedNodes.forEach(function (el, i, obj) {
                                if (el.getAttribute !== undefined) {
                                    var stateProp = el.getAttribute(_this2.attr());
                                    if (stateProp) {
                                        _this2.set(stateProp, el.textContent);
                                    }
                                }
                            });
                            break;
                        case 'attributes':
                            var stateVar = mutation.target.getAttribute(this.attr());
                            mutation.target.textContent = this.get(stateVar);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'getElementByDOMState',
        value: function getElementByDOMState(stateProp) {
            return this.parentNode.querySelectorAll('[data-' + this.attribute + '=\'' + stateProp + '\']');
        }
    }, {
        key: 'set',
        value: function set(stateProp, text) {
            var _this3 = this;

            var els = this.getElementByDOMState(stateProp);
            if (els.length) {
                requestAnimationFrame(function () {
                    els.forEach(function (el) {
                        _this3.state.set(el, text);
                        el.textContent = text;
                    });
                });
            }
        }
    }, {
        key: 'get',
        value: function get(stateProp) {
            var els = this.getElementByDOMState(stateProp);
            if (els.length) {
                return this.state.get(els[0]) || "";
            }
        }
    }, {
        key: 'delete',
        value: function _delete(stateProp) {
            var _this4 = this;

            var els = this.getElementByDOMState(stateProp);
            if (els.length) {
                requestAnimationFrame(function () {
                    els.forEach(function (el) {
                        _this4.state.delete(el);
                        el.remove();
                    });
                });
            }
        }
    }, {
        key: 'upgrade',
        value: function upgrade(el, stateProp) {
            el.setAttribute(this.attr(), stateProp);
        }
    }]);

    return Together;
}();

/***/ })
/******/ ]);
});