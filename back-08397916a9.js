!function(){"use strict";let e=[],n=null,t=null,o=null,r=null;if(window.isFirefox="undefined"!=typeof InstallTrigger,!window.browser&&!window.INTAB_DEMO_MODE&&window.isFirefox)try{browser&&(window.browser=browser)}catch(e){}window.isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),window.browser.runtime.onMessage.addListener((async e=>{if(e.rightClickEditWithInTab)u(!0,!1);else if(e.rightClickInspectWithInTab)u(!1,!0);else if(e.styleLinkToFetchForInTab){let n="";n=await fetch(e.styleLinkToFetchForInTab,{mode:"same-origin",credentials:"same-origin",headers:{"Cross-Origin-Resource-Policy":"*"}}).catch((e=>{console.log(e)}));try{n=await(await fetch(e.styleLinkToFetchForInTab)).text()}catch(t){n=await new Promise(((n,t)=>{const o=new XMLHttpRequest;o.onload=()=>n(o.responseText),o.onerror=()=>t(new TypeError("Local request failed")),o.open("GET",e.styleLinkToFetchForInTab),o.send(null)}))}return n}})),window.browser.tabs.onRemoved.addListener((n=>{b(n),e=e.filter((e=>e!==n))}));const s=(e,n,t)=>{n=n.toString(),t=t.toString();let o=e.responseHeaders?e.responseHeaders:e.requestHeaders;if(o){let e=o.find((e=>e.name.toLowerCase()===n.toLowerCase()));e?e.value=t:o.push({name:n,value:t})}return e},i=(e,n)=>{let t=e.responseHeaders?e.responseHeaders:e.requestHeaders;if(t)for(let o=0;o<t.length;o++)if(t[o]&&t[o].name.toLowerCase()===n.toLowerCase())return t.splice(o,1),e;return e},a=n=>(n&&n.tabId&&e.includes(n.tabId)&&(n=s(n,"Access-Control-Allow-Origin","*"),n=s(n,"Sec-Fetch-Mode","no-cors"),n=s(n,"Origin","*"),n=s(n,"Referrer-Policy","no-referrer"),n=s(n,"Content-Security-Policy","*"),n=i(n,"Content-Security-Policy"),n=i(n,"Cross-Origin-Resource-Policy"),n=s(n,"Content-Security-Policy-Report-Only","*"),n=i(n,"Content-Security-Policy-Report-Only"),n=s(n,"X-Frame-Options",""),n=s(n,"Strict-Transport-Security",""),n=i(n,"Strict-Transport-Security"),n=i(n,"X-Frame-Options"),n=s(n,"Cache-Control","max-age=31536000"),n=s(n,"X-XSS-Protection","0"),n=s(n,"Access-Control-Allow-Credentials",!1),n=i(n,"Access-Control-Allow-Credentials"),n=s(n,"X-Content-Type-Options",""),n=i(n,"X-Content-Type-Options"),n=i(n,"X-Permitted-Cross-Domain-Policies"),n=i(n,"Cross-Origin-Resource-Policy"),n=i(n,"Cross-Origin-Opener-Policy"),n=i(n,"Cross-Origin-Embedder-Policy"),n=s(n,"Access-Control-Allow-Methods","*"),n=s(n,"Access-Control-Expose-Headers","*"),n=s(n,"Access-Control-Allow-Headers","*"),n=s(n,"Accept","*/*"),n=s(n,"Access-Control-Allow-Origin","*"),n=i(n,"X-Region"),n=i(n,"Epik"),n=i(n,"Pin-Unauth")),{responseHeaders:n.responseHeaders}),c=async()=>{const e=await window.browser.tabs.query({active:!0,currentWindow:!0});return e&&e[0]?e[0].id:null},w=async(e,n,t)=>{window.browser.tabs&&window.browser.tabs.sendMessage&&(t||(t=await c()),window.browser.tabs.sendMessage(t,JSON.parse(JSON.stringify({[e]:n}))).catch((async()=>{const o=await c();"number"==typeof t&&window.browser.tabs.sendMessage(o,JSON.parse(JSON.stringify({[e]:n}))).catch((e=>{}))})))};window.browser.runtime.onInstalled.addListener((function(e){if("install"===e.reason.toString().trim().toLowerCase())o=!0;else if("update"===e.reason.toString()){window.browser.runtime.getManifest().version.toString().trim().toLowerCase()!==e.previousVersion.toString().trim().toLowerCase()&&(t=!0)}}));const d=async()=>{window.browser.webRequest.onHeadersReceived.hasListener(a)||window.browser.webRequest.onHeadersReceived.addListener(a,{urls:["*://*/*"],types:["main_frame","sub_frame"]},["blocking","responseHeaders"]),window.isSafari||await window.browser.browsingData.remove({},{cache:!0,serviceWorkers:!0}),window.browser.browserAction.setIcon({path:"../../asset/icon/active48-000ca10e10.png"})},l=async e=>{try{let n=!1;e?n=!0:(n=!1,e=await c()),await window.browser.tabs.executeScript(e,{file:"app-d1da2283aa.js",runAt:"document_start"}).catch((e=>{console.warn(e),console.log("InTab works only in the active tab")})),await w("refreshedInTab",n,e),"boolean"==typeof o&&(await w("firstTimeInstallInTab",o,e),o=null),"boolean"==typeof t&&(await w("updatedInTab",t,e),t=null)}catch(e){console.log("InTab works only in the active tab")}},b=async()=>{window.browser.webRequest.onHeadersReceived.removeListener(a,{urls:["*://*/*"]},["blocking","responseHeaders"]),window.browser.browserAction.setIcon({path:"../../asset/icon/icon48-49d2b1e943.png"})},u=async(n=!1,t=!1)=>{const o=await c();e.indexOf(o)>-1?(b(),await w("disableInTab",!0,o),e=e.filter((e=>e!==o))):(e.push(o),await d(),await l(),!0===n&&await w("rightClickEditWithInTab",!0,o),!0===t&&await w("rightClickInspectWithInTab",!0,o))};window.browser.browserAction.onClicked.addListener((e=>u(!1,!1))),window.browser.tabs.onUpdated.addListener((async function(n,t,o){e.indexOf(n)>-1&&"complete"===t.status?window.browser.tabs.sendMessage(n,JSON.parse(JSON.stringify({text:"are_you_there_content_script?"}))).catch((async e=>{await d(),await l(n)})):-1===e.indexOf(n)&&"complete"===t.status&&window.browser.browserAction.setIcon({path:"../../asset/icon/icon48-49d2b1e943.png"})})),window.browser.tabs.onActivated.addListener((n=>{e.indexOf(n.tabId)>-1?window.browser.browserAction.setIcon({path:"../../asset/icon/active48-000ca10e10.png"}):window.browser.browserAction.setIcon({path:"../../asset/icon/icon48-49d2b1e943.png"})}));const p=()=>r&&n?window.browser.runtime.setUninstallURL(`http://intab.io/goodbye?d=${r}&l=${n}`):null;window.browser.storage.onChanged.addListener((async e=>{e.licenseKey&&e.licenseKey.newValue&&(n=e.licenseKey.newValue,p()),e.deviceID&&e.deviceID.newValue&&(r=e.deviceID.newValue,p())})),window.browser.contextMenus.create({id:"InTab",title:"Edit Visually With InTab",contexts:["all"],checked:!1}),window.browser.contextMenus.onClicked.addListener((e=>u(!0,!1)))}();
