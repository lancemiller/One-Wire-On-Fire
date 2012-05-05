
var EMULATE = false

function tester() { alert("tester worked!");}


var donothing=0;
var selected="";

function doNothing(input) { donothing=donothing;  }


function getQuerystring(key, default_) {
  if (default_==null) { default_=""; } 
	  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	  var qs = regex.exec(window.location.href);
	  if(qs == null)
		   { return default_; }
	  else
        { return qs[1]; }
}

function debug() { 
  document.getElementById('debugtable') ? document.getElementById('debugtable').style.display="block" : donothing=donothing
	  // debug DOM.ID hardcoded.using query string to show output.append debug=y to this URL to turn on 
		}

var developerErrorMsg=""
function reportdebug() {
  document.getElementById('debug') && developerErrorMsg ? document.getElementById('debug').value=developerErrorMsg : donothing=donothing
  developerErrorMsg=""
		}

function displayOn(input) { 
  if (document.getElementById(input)) {document.getElementById(input).style.display=="none" ? document.getElementById(input).style.display="block" : document.getElementById(input).style.display="none"  }
}


function changeColor(element, color) {
    document.getElementById(element).style.color=color;
}


function changeBgColor(element, color) {
    document.getElementById(element).style.backgroundColor=color;
}

function checkMe(element) {
    document.getElementById(element).checked=true;
}

function checkMeOff(element) {
    document.getElementById(element).checked=false;
}

function checkToggle(element) {
document.getElementById(element).checked==false ? document.getElementById(element).checked=true : document.getElementById(element).checked=false;  
}

function status(input) {
txt=document.getElementById('mainWhileCanvas').innerHTML;
document.getElementById('mainWhileCanvas').innerHTML=txt+' '+input;
}

var totalTime = 0;
var infinity = false;
var dayMinutes = 0;
var hourMinutes = 0;
var minuteMinutes = 0;
var firstRun = 0;

function timeManager(input) {
document.getElementById('infinity').checked ? infinity = document.getElementById('infinity').checked : infinity = false;
	if (infinity==false) {
		if(!isNaN(document.getElementById('mainWhileDays').value)){dayMinutes = 86400*document.getElementById('mainWhileDays').value;}
		if(!isNaN(document.getElementById('mainWhileHours').value)){hourMinutes = 3600*document.getElementById('mainWhileHours').value;}
		if(!isNaN(document.getElementById('mainWhileMinutes').value)){minuteMinutes = document.getElementById('mainWhileMinutes').value;}
	  if(isNaN(dayMinutes)) {dayMinutes=0;} 
	  if(isNaN(hourMinutes)) {hourMinutes=0;} 
	  if(isNaN(minuteMinutes)) {minuteMinutes=0;} 
		totalTime = dayMinutes + hourMinutes + minuteMinutes;
											} else { totalTime='infinity';}

    document.getElementById('mainWhileCanvas').style.display="block"; 
    document.getElementById('programHelp').style.display="none"; 
    document.getElementById('runtime').value=totalTime;
if (totalTime!=0) { if (firstRun==0) { firstRun = 1; } }
}

function programCompose(input) {
if (document.getElementById('runtime').value!="runtime") {
if ( firstRun == 1) { firstRun=2; }
if(input=="myRange") {input=document.getElementById(input).value;}
txt=document.getElementById('mainWhileCanvas').value;
document.getElementById('mainWhileCanvas').value=txt+' '+input;
}
}


function myStrip(sep, myStr) {
		if(myStr!=undefined) { 
			var items =  myStr.split(sep); var newVal=""; 
			if(items.length > 1) { for(var a in items) { newVal=newVal+items[a]; } myStr=newVal;}}	
		return myStr;
}

function parseDevices(result) {
  var lines=result.split('\n');
	for(var line in lines ) { var items=lines[line].split("|");
														if((EMULATE==true) && (items[3]>2) ) { items[3]= Math.round(items[3]) + Math.floor((Math.random()*3)+1);}
														$("#"+myStrip(".",items[1])+myStrip(".",items[2])).html(items[3]); }
}

function parseState(result) {
  var lines=result.split('\n');
	for(var line in lines ) { var items=lines[line].split("|");
														if(items[0]=="PROGRAM") { $('#programTrueState').html(items[1]);$('#currentStateProgram').html(items[1]); }			
														if(items[0]=="STATE") { $('#stateTrueState').html(items[1]); 
													                        items[1]=="NO" ? $('#start').show() : $('#start').hide();	
													                        items[1]=="NO" ? $('#abort').hide() : $('#abort').show();	
													                        items[1]=="NO" ? $('#runThisProgramDiv').show() : $('#runThisProgramDiv').hide();	
																																											}			
														if(items[0]=="OFFTIME") { $('#offtimeTrueState').html(items[1]); }			
														if(items[0]=="IP") { $('#ipTrueState').html(items[1]); } }			
}

function openFile(result) { 
	$('#mainWhileCanvas').html(result);
}


var iterOne = 0;
function deviceWatchValues() {
	iterOne++;
	$.ajax({url:'inc/deviceShortList.txt', 
        beforeSend:function() {$('#spinner').show();$('#spinnerConsole').show();},
        complete:function() {$('#spinner').hide();$('#spinnerConsole').hide();},
				error:function(result, status) { 
						ajaxConsole(ajaxURL,result,status);
																				},
				success:function(result, status){
								ajaxConsole('inc/deviceShortList.txt',result,status);
								$('#deviceShortList').html(result+"\niteration: "+iterOne);
								parseDevices(result); }
			}); 
			
	$.ajax({url:'inc/currentState.txt', 
        beforeSend:function() {$('#spinner').show();$('#spinnerConsole').show();},
        complete:function() {$('#spinner').hide();$('#spinnerConsole').hide();},
				error:function(result, status) { 
						ajaxConsole(ajaxURL,result,status);
					  $('#trueStatusFromPythonScriptAlert').show();	
					  $('#trueStatusFromPythonScript').hide();	
																				},
				success:function(result, status){
					  		$('#trueStatusFromPythonScriptAlert').hide();	
					  		$('#trueStatusFromPythonScript').show();	
								ajaxConsole('inc/currentState.txt',result,status);
								parseState(result); }
			}); 

	$.doTimeout(10000,deviceWatchValues);
			} 





function ajaxConsole(url, result, status) {
      	$('#ajaxStatus').html(status);
				$('#ajaxResult').html(result);
				$('#ajaxURL').html(url);
			  status == "error" ? $('#error').show() : $('#error').hide();}

function genericAjax(mydata, callback) {
		$.ajax({ data:mydata,
        beforeSend:function() {$('#spinner').show();$('#spinnerConsole').show();},
        complete:function() {$('#spinner').hide();$('#spinnerConsole').hide();},
				error:function(result, status) { 
						ajaxConsole(ajaxURL,result,status);
																				},
				success:function(result, status){
        		$('#spinner').hide();$('#spinnerConsole').hide();
						ajaxConsole(ajaxURL,result,status); 
						callback(result); 
																				}
									}); 
}

function rePopulateOpenFiles(result) {
  var lines = result.split("\n"); 
	var options = $('#openFiles');
  options.empty(); 
  $.each(lines, function(item) {
			 							if(lines[item]!='') {	options.append('\n<option value="' + lines[item] + '">' + lines[item] + '</option>\n');}
													       });
}

var ajaxURL = "ajax.php";

$.ajaxSetup ({ 
	      cache: false, 
        url: ajaxURL,
        type: 'POST'
});

var routine = $("#RunThisProgram").val();

$(document).ready(function(){
	getQuerystring('debug')=="y" ? debug() : donothing=donothing; 
	$('#ajaxConsole').draggable();
  $('#trueStatusFromPythonScript').hide();	
  $('#trueStatusFromPythonScriptAlert').hide();	
  genericAjax('mode=getProgramList',rePopulateOpenFiles);
	
	$("#abort").click(function(){
		routine = $("#RunThisProgram").val();
	  $('#runThisProgramDiv').show();	
	  $('#abort').hide();	
	  $('#start').show();	
	  $('#currentStateProgram').html(routine);	
		genericAjax('mode=abort&routine='+routine, doNothing);
															})

	$("#start").click(function() {
	  $('#start').hide();	
	  $('#abort').show();	
		routine = $("#RunThisProgram").val();
	  $('#runThisProgramDiv').hide();	
	  $('#currentStateProgram').html(routine);	
		genericAjax('mode=start&routine='+routine, doNothing);
							})
	
	$("#runThisProgram").change(function() { 
		routine = $("#runThisProgram").val();
	  $('#currentStateProgram').html(routine);	
		genericAjax('mode=changeProgram&routine='+routine, doNothing);
							})

$("#openFiles").change(function() { 
		genericAjax('mode=openFile&fileName='+$("#openFiles").val(), openFile);
		$('#programHelp').hide(); 
		$('#mainWhileCanvas').show(); 
		$('#saveFile').html($("#openFiles").val());
		$('#deleteFile').html($("#openFiles").val());
}) 

$("#deleteFile").click(function() { 
		genericAjax('mode=deleteFile&fileName='+$("#deleteFile").html(),doNothing);
		genericAjax('mode=getProgramList',rePopulateOpenFiles);
		$("#deleteFile").html('X');
}) 

$("#saveAsButton").click(function() { 
		genericAjax('mode=saveAsFile&fileName='+$("#saveAs").val()+'&content='+$('#mainWhileCanvas').val(), doNothing);
		genericAjax('mode=getProgramList',rePopulateOpenFiles);
}) 

$("#saveFile").click(function() { 
		genericAjax('mode=saveFile&fileName='+$("#saveFile").html()+'&content='+$('#mainWhileCanvas').val(), doNothing);
}) 

$("#emulate").click(function() { 
	 displayOn('emulateOn'); 
	 displayOn('emulateOff'); 
	 EMULATE==true ? EMULATE=false : EMULATE=true; 	
	 genericAjax('mode=emulateCommand&emulate='+EMULATE, doNothing);
	 deviceWatchValues();
}) 


$("#myRange").change(function(){ programCompose($('#myRange').val()); }) 
$("#mainWhileDays").change(function(){ timeManager('DAYS'); }) 
$("#mainWhileHours").change(function(){ timeManager('HOURS'); }) 
$("#mainWhileMinutes").change(function(){ timeManager('MINUTES'); }) 

deviceWatchValues();



}) 






