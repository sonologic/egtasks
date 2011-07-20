// ==UserScript==
// @name           egtasks
// @namespace      egtasks
// @description    Extends google tasks canvas implementation
// @include        https://mail.google.com/tasks/canvas
// @description    Extends google tasks canvas implementation - Copyright (c) 2011, "Koen Martens" <gmc@sonologic.nl>
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



function wait(check, callback){
  if (check()) callback()
  else window.setTimeout(wait, 100, check, callback);
}

function egtToggleSubTasks() {
  alert('toggle');
}

// the main body of the script
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
  newHeader.style.background="#B3B9FF";
  newHeader.style.padding="0 0 0 0.5em";

  newHeader.appendChild(idocument.createTextNode("egtasks 0.1 activated"));

  link1=idocument.createElement('a');
  link1.setAttribute('href','javascript:egtToggleSubTasks()');
  link1.appendChild(idocument.createTextNode("hide subtasks"));
  link1.style.padding="0 0 0 0.5em";
  
  newHeader.appendChild(link1);

  idocument.body.insertBefore(newHeader,idocument.getElementsByTagName('div')[0]);

  idocument.getElementById(':1.lt').style.top="1.22em";
}

// only run on canvas itself, not firebug console
if(window.document.body.children[0].id=="") {

  console.log('run');

	// wait for canvas to be loaded and initialized
        // (TODO: clean up this mess)
  wait(
    function(){
      console.log("iterate");
      if(document.body.childNodes[0].childNodes.length!=0) {
        return document.body.childNodes[0].childNodes[0].contentDocument.getElementById(':1.h');
      } else {
        return false;
      }
      return document.body.childNodes[0].childNodes.length != 0;
    },    
    function() {
      console.log("wait1 done");
      execute();    
    }
  );

}
