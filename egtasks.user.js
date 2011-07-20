// ==UserScript==
// @name           egtasks
// @namespace      egtasks
// @description    Extends google tasks canvas implementation
// @include        https://mail.google.com/tasks/canvas
// @description    Extends google tasks canvas implementation - Copyright (c) 2011, "Koen Martens" <gmc@sonologic.nl>
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==



function wait(check, callback){
  if (check()) callback()
  else window.setTimeout(wait, 100, check, callback);
}

function egtToggleSubTasks() {
  alert('toggle');
}

// add css
function css(frame) {
    var head, style;
    head = frame.find('head');
    if (!head) { return; }
    style = $('<style/>',{'type':'text/css'});
    style.append("\
	.egtHeaderItem {\
	  padding-left: 0.5em;\
	}\
    ");
    frame.find('head').prepend(style);

}

// the main body of the script
function execute() {
  console.log('roll');
  console.log($().jquery);

//  var idocument = document.body.getElementsByTagName("iframe")[0].contentDocument;

  var frame = $("iframe").contents();
  css(frame);

  var newCol=$('<td></td>');
  newCol.attr('id',"egtWorkList");
  newCol.css('width','20%');
  newCol.html("working list jquery style");  
  frame.find('table.vc > tbody > tr').append(newCol);

  frame.find('#\\:1\\.h').before($('<div id="egtHeader"></div>'));
  frame.find('#egtHeader').height('1.2em');
  frame.find('#egtHeader').css('background','#B3B9FF');
  frame.find('#egtHeader').append($('<span></span>', {
				'class': 'egtHeaderItem',
				text: "egtasks 0.1 activated"
  }));

  frame.find('#egtHeader').append($('<a></a>', {
				'class': 'egtHeaderItem',
				href: 'javascript:',
				text: "hide subtasks",
				click: function() {
					var display='none';
					if($(this).text()=='hide subtasks') {
						$(this).text("show subtasks");
					} else {
						$(this).text("hide subtasks");
						display='table-row';
					}
					frame.find("#\\:0\\.tl > table tr").filter(function(index) { return $("td.p > div.G",this).css('padding-left')!='0px'; }).css('display',display);
				}
  }));

  frame.find("#\\:1\\.lt").css('top','1.22em');
			
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
