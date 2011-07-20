// ==UserScript==
// @name           egtasks
// @namespace      egtasks
// @description    Extends google tasks canvas implementation
// @include        https://mail.google.com/tasks/canvas
// @description    Extends google tasks canvas implementation - Copyright (c) 2011, "Koen Martens" <gmc@sonologic.nl>
// ==/UserScript==

if(window.document.body.children[0].id=="") {
  console.log('run');

  //console.log(document.body.childNodes[0].childNodes.length);


function wait(check, callback){
  if (check()) callback()
  else window.setTimeout(wait, 300, check, callback);
}

function execute() {
  console.log('roll');

  var idocument = document.body.getElementsByTagName("iframe")[0].contentDocument;

  var newCol = idocument.createElement("td");

  newCol.setAttribute('class','egtasksWorklist');
  newCol.style.width="20%";
  newCol.innerHTML="work list";

  idocument.getElementsByTagName("table")[0].firstChild.firstChild.appendChild(newCol);

  var newHeader = idocument.createElement("div");
  newHeader.setAttribute('class','egtasksHeader');
  newHeader.style.height="1.2em";
  newHeader.innerHTML="egtasks 0.1 activated";
  newHeader.style.background="#B3B9FF";

  idocument.body.insertBefore(newHeader,idocument.getElementsByTagName('div')[0]);

  idocument.getElementById(':1.lt').style.top="1.22em";
}

wait(
  function(){ console.log("iterate"); return document.body.childNodes[0].childNodes.length != 0; },
  function() {
    console.log("wait1 done");
    execute();
/*    wait(
      function(){ console.log("iterate"); return document.body.getElementsByTagName("iframe")[0].contentDocument.childNodes.length == 2; },
      function() { console.log("wait2 done"); execute(); }
    );*/
  }
);



/*
var idocument = document.body.getElementsByTagName("iframe")[0].contentDocument;

var newCol = idocument.createElement("td");

newCol.setAttribute('class','egtasksWorklist');
newCol.style.width="20%";
newCol.innerHTML="work list";

idocument.getElementsByTagName("table")[0].firstChild.firstChild.appendChild(newCol);

var newHeader = idocument.createElement("div");
newHeader.innerHtml="egtasks 0.1 activated";

idocument.body.insertBefore(newHeader,idocument.body.firstChild);

//document.body.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("table")[0].firstChild;
*/
}
