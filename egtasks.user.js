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

function getTasks() {
}

function initializeWorkingList(element) {
  console.log('Initialize working list..');


  element.append('<div id="egt:1.mm" class="wc"></div>');
  element.append('<div id="egtWorklistHeader" style="padding: 6px 0 5px 0;" class="goog-toolbar CSS_TASKS_TOOLBAR">');
  element.find("#egtWorklistHeader").append('<div class="goog-toolbar-separator goog-inline-block" role="separator"></div>');
  element.find("#egtWorklistHeader").append('<div class="goog-inline-block ic fc">Work list</div>');

  element.append('<div id="egtWorklistContainer"></div>');
  element.find("#egtWorklistContainer").append('<div id="egtWorklistContent"></div>');

  div=element.find("#egtWorklistContent");

  $.ajax({
    type: "POST",
    dataType: "json",
    url: 'https://mail.google.com/tasks/r/d',
    data: {r:'{"action_list":[{"action_type":"get_all","action_id":"1","list_id":"0","get_deleted":false}],"client_version":13128942}'},
    headers: {'AT':'1'},
    success: function(data) {
	console.dir(data);
	div.append("<ul></ul>");
	for(list in data.lists) {
	  div.find("ul").append("<li>"+data.lists[list].name+"</li>");
	}
    },
  });
}

// the main body of the script
function execute() {
  console=unsafeWindow.console;
  console.log('roll');
  console.log($().jquery);

//  var idocument = document.body.getElementsByTagName("iframe")[0].contentDocument;

  var frame = $("iframe").contents();
  css(frame);

  var newCol=$('<td></td>');
  newCol.attr('id',"egtWorkList");
  newCol.css('width','20%');
  //newCol.css('vertical-align','top');
  newCol.attr('role','toolbar');
  newCol.attr('class','hc');
  newCol.html("");  
  frame.find('table.vc > tbody > tr').append(newCol);

  newCol.ready(function() {
    initializeWorkingList(newCol);
  });

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

console=unsafeWindow.console;
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
