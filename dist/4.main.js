(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{30:function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}n.d(t,"a",function(){return r});var r=function(){function e(t){var n,o,r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=a.onopen,i=a.onmessage,u=a.onclose;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=void 0,(o="wsInstance")in(n=this)?Object.defineProperty(n,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[o]=r,this.wsInstance=new WebSocket("ws://".concat(window.location.host).concat(t)),this.wsInstance.onopen=c,this.wsInstance.onmessage=i,this.wsInstance.onclose=u}var t,n,r;return t=e,(n=[{key:"send",value:function(e){this.wsInstance.send("string"==typeof e?e:JSON.stringify(e))}}])&&o(t.prototype,n),r&&o(t,r),e}()},33:function(e,t,n){var o=n(34);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(27)(o,r);o.locals&&(e.exports=o.locals)},34:function(e,t,n){(t=e.exports=n(26)(!1)).push([e.i,"._3AyOzmErdcLQ2od47oxxDA {\n    padding: 5px 0;\n}\n\n._15QI4SK-h-sjvipMAnALD5 {\n    margin-left: 50px;\n}\n\n._3uHSTkr5DuTtUGya_xoqBk {\n    background: rgb(255, 255, 1);\n}\n",""]),t.locals={listItem:"_3AyOzmErdcLQ2od47oxxDA",pending:"_15QI4SK-h-sjvipMAnALD5",button:"_3uHSTkr5DuTtUGya_xoqBk"}},42:function(e,t,n){var o=n(43);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(27)(o,r);o.locals&&(e.exports=o.locals)},43:function(e,t,n){(t=e.exports=n(26)(!1)).push([e.i,".swmR1juuJdECkJNEWClS- {\n    width: 100%;\n    height: 30px;\n    display: flex;\n    justify-content: space-between;\n}\n\n._3h65MPJ1dkbpi8jzYJBdQo {\n    display: flex;\n}\n\n._1Y4rYhI7PJGoCcqDEBng-U {\n    width: 50%;\n    flex: 0 0 auto;\n}\n\n._1N7JgzTwxfu8ccl1SEZdmm {\n    padding: 10px 0 0 5px;\n    font-family: helvetica;\n    background: #000;\n    color: #fff;\n    height: 600px;\n    overflow-y: scroll;\n    overflow-x: hidden;\n    overflow-wrap: normal;\n}\n",""]),t.locals={controlPanel:"swmR1juuJdECkJNEWClS-",main:"_3h65MPJ1dkbpi8jzYJBdQo",flexItem:"_1Y4rYhI7PJGoCcqDEBng-U",output:"_1N7JgzTwxfu8ccl1SEZdmm"}},48:function(e,t,n){"use strict";n.r(t);var o=n(9),r=n(3),a=n(28),c=n.n(a),i=n(0),u=n.n(i),l=n(33),s=n.n(l),p=n(30);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){function t(e){var n,o,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,a=d(t).call(this,e),n=!a||"object"!==f(a)&&"function"!=typeof a?h(o):a,m(h(h(n)),"handleBuild",function(){n.setState({pending:!0});var e=new p.a("/api/build-dependency",{onopen:function(){document.title="Pending...",e.send({copyToRoot:n.props.copyToRoot,dependencyPath:n.props.dependencyPath,platformPath:n.props.platformDirectoryPath})},onmessage:function(e){var t=e.data;n.props.dispatch(Object(r.j)(t))},onclose:function(){document.title="Booey - Done!",n.setState({pending:!1})}})}),n.state={pending:!1},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,u.a.PureComponent),n=t,(o=[{key:"render",value:function(){return u.a.createElement("div",{className:s.a.listItem},u.a.createElement("input",{type:"checkbox"}),this.props.dependencyPath,u.a.createElement("button",{onClick:this.handleBuild,disabled:this.state.pending,className:c()(m({},s.a.button,this.state.pending))},this.state.pending?"pending":"build & copy -> build & start"))}}])&&y(n.prototype,o),a&&y(n,a),t}(),g=Object(o.b)(function(e){return{copyToRoot:e.shouldCopyDependenciesToRoot}})(v);var w=Object(o.b)(function(e){return{localDependencies:e.localDependencies,platformDirectoryPath:e.platformDirectoryPath}})(function(e){var t=e.localDependencies,n=e.platformDirectoryPath,o=e.className;return u.a.createElement("div",{className:o},t.map(function(e){return u.a.createElement(g,{key:e,dependencyPath:e,platformDirectoryPath:n})}))}),O=n(6),j=n(35);function P(e){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function E(e,t){return!t||"object"!==P(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function x(e){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var S,C,T,D=new(n.n(j).a),I=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=E(this,x(t).call(this,e))).outputElement=u.a.createRef(),n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(t,u.a.PureComponent),n=t,(o=[{key:"componentDidUpdate",value:function(e){var t=this;e.stdOut.length<this.props.stdOut.length&&Object(O.defer)(function(){var e=t.outputElement.current;e.scrollTop=e.scrollHeight-e.clientHeight})}},{key:"render",value:function(){var e=this.props,t=e.stdOut,n=e.className;return u.a.createElement("div",{className:n,ref:this.outputElement},t.map(function(e,t){return u.a.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:D.toHtml(e.replace(/(\?)?25l/g,"\n"))}})}))}}])&&_(n.prototype,o),r&&_(n,r),t}();T={stdOut:[]},(C="defaultProps")in(S=I)?Object.defineProperty(S,C,{value:T,enumerable:!0,configurable:!0,writable:!0}):S[C]=T;var J=Object(o.b)(function(e){return{stdOut:e.stdOut}})(I),N=n(42),R=n.n(N);function B(e){return(B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function z(e){return(z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e,t){return(H=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var Y=function(e){function t(){var e,n,o,a,c,i,u;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var l=arguments.length,s=new Array(l),p=0;p<l;p++)s[p]=arguments[p];return o=this,a=(e=z(t)).call.apply(e,[this].concat(s)),n=!a||"object"!==B(a)&&"function"!=typeof a?Q(o):a,c=Q(Q(n)),u=function(e){n.props.dispatch(Object(r.f)(!n.props.copyToRoot))},(i="handleCheckboxChange")in c?Object.defineProperty(c,i,{value:u,enumerable:!0,configurable:!0,writable:!0}):c[i]=u,n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&H(e,t)}(t,u.a.PureComponent),n=t,(o=[{key:"render",value:function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:R.a.controlPanel},u.a.createElement("button",{disabled:!0},"Build & Copy selected"),u.a.createElement("div",null,u.a.createElement("input",{value:"true",name:"root-copy",type:"checkbox",checked:this.props.copyToRoot,onChange:this.handleCheckboxChange}),u.a.createElement("label",{htmlFor:"root-copy"},"Check to copy dependencies to the root @nui dir of each experience's node_modules."))),u.a.createElement("div",{className:R.a.main},u.a.createElement(w,{className:R.a.flexItem}),u.a.createElement(J,{className:c()(R.a.flexItem,R.a.output)})))}}])&&A(n.prototype,o),a&&A(n,a),t}();t.default=Object(o.b)(function(e){return{copyToRoot:e.shouldCopyDependenciesToRoot}})(Y)}}]);