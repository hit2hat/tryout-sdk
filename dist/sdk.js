!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react"),require("@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper"),require("@vkontakte/vkui/dist/components/FormLayout/FormLayout"),require("@vkontakte/vkui/dist/components/Textarea/Textarea"),require("@vkontakte/vkui/dist/components/Spinner/Spinner"),require("@vkontakte/vkui/dist/components/Button/Button")):"function"==typeof define&&define.amd?define(["react","@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper","@vkontakte/vkui/dist/components/FormLayout/FormLayout","@vkontakte/vkui/dist/components/Textarea/Textarea","@vkontakte/vkui/dist/components/Spinner/Spinner","@vkontakte/vkui/dist/components/Button/Button"],t):(e=e||self,e.sdk=t(e.React,e.PopoutWrapper,e.FormLayout,e.Textarea,e.Spinner,e.Button))}(this,function(e,t,n,o,r,a){"use strict";var i="default"in e?e.default:e;t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n,o=o&&o.hasOwnProperty("default")?o.default:o,r=r&&r.hasOwnProperty("default")?r.default:r,a=a&&a.hasOwnProperty("default")?a.default:a;!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===n&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}("@keyframes up_modal {\n    from {\n        margin-bottom: -300px;\n    }\n    to {\n        margin-bottom: 0;\n    }\n}\n\n.modal {\n    animation: up_modal 0.3s;\n    background-color: var(--background_light);\n    width: 100%;\n    max-width: 100%;\n    min-height: 150px;\n    border-radius: 12px 12px 0 0;\n    padding: 20px 20px;\n    padding-bottom: max(20px, env(safe-area-inset-bottom));\n    position: relative;\n    overflow: hidden;\n}\n\n.modal__header {\n    height: 24px;\n    margin-bottom: 10px;\n    font-weight: bold;\n    font-size: 20px;\n}\n\n.modal__title {\n    position: absolute;\n    color: var(--text_primary);\n    z-index: 1;\n    top: 14px;\n    left: 14px;\n    height: 24px;\n}\n\n.modal__close {\n    position: absolute;\n    z-index: 1;\n    top: 14px;\n    right: 14px;\n    background: url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3Cdefs%3E %3Cpath d='M12 10.727l3.464-3.463a.9.9 0 1 1 1.272 1.272L13.273 12l3.463 3.464a.9.9 0 1 1-1.272 1.272L12 13.273l-3.464 3.463a.9.9 0 1 1-1.272-1.272L10.727 12 7.264 8.536a.9.9 0 0 1 1.272-1.272L12 10.727z' id='a'/%3E %3C/defs%3E %3Cg fill='none' fill-rule='evenodd'%3E %3Ccircle fill='%23E8EAEE' cx='12' cy='12' r='12'/%3E %3Cuse fill='%23818C99' xlink:href='%23a'/%3E %3C/g%3E %3C/svg%3E\") no-repeat 50%/cover;\n    width: 24px;\n    height: 24px\n}\n\n.modal__image {\n    display: block;\n    margin: auto;\n}");let l=null,s=null,d="",p=!1,u="web";const c=({popout:popout})=>{const[p,c]=e.useState(!1);const[f,h]=e.useState(null);const[g,v]=e.useState("");const[x,k]=e.useState(!1);l=c.bind(p);s=h.bind(f);const w=()=>{c(!1);h("");v("");k(!1)};if(popout)return popout;if(!p)return null;return i.createElement(t,{v:"bottom",h:"center"},i.createElement("div",{className:"modal"},i.createElement("div",{className:"modal__header"},i.createElement("span",{className:"modal__title"},"TryOut отчёт"),i.createElement("div",{className:"modal__close",onClick:()=>w()})),i.createElement("div",null,i.createElement("div",{style:{textAlign:"center"}},i.createElement("img",{className:"modal__image",src:f?require("./assets/bug.svg"):require("./assets/inform.svg"),alt:"",width:"12%",height:"12%"}),i.createElement("h3",{style:{marginBottom:0,color:"let(--text_primary)"}},f?"Мы поймали ошибку!":"Сообщить о баге"),i.createElement("p",{style:{marginTop:0,marginBottom:10,color:"let(--text_secondary)"}},f?"Помогите разработчикам её исправить":"")),i.createElement(n,null,i.createElement(o,{top:"Ваше сообщение",value:g,placeholder:f?"Пожалуйста опишите то, что вы делали перед тем, как появилось это окно":"Что подозрительного вы заметили в приложении?",onChange:e=>v(e.currentTarget.value)}),x?i.createElement("div",{style:{paddingTop:10,paddingBottom:10,display:"flex",justifyContent:"center"}},i.createElement(r,null)):i.createElement(a,{size:"xl",onClick:()=>{k(!0);return m({product_id:d,error:f,message:g,platform:u},w)}},"Отправить")))))};window.console=function(e){return{log:t=>e.log(t),info:t=>e.info(t),warn:t=>e.warn(t),error:t=>{p&&(l(!0),s(JSON.stringify(t)||t.toString()));e.error(t)}}}(window.console);const m=({product_id:product_id,error:error,message:message,platform:platform},e)=>{const t={product_id:product_id,error:error,message:message,platform:platform};return fetch("https://tryout-vkapps.web.app/api/sendReport",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(()=>e()).catch(()=>e())};return{init:e=>{d=e.product_id||"";p=e.catcherEnabled||!1;const t=window.location.href.slice(window.location.href.indexOf("?")+1).split("&").reduce((e,t)=>{const n=t.split("=");e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]);return e},{});switch(t){case"mobile_android":return u="android";case"mobile_iphone":return u="ios";case"mobile_web":case"desktop_web":default:return u="web"}},renderReportForm:e=>c({popout:e}),showReportForm:()=>l(!0)}});
