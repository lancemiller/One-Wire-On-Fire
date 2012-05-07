<?php 
if(isset($_GET['test'])) { error_reporting(E_ALL);ini_set('display_errors', '1'); }
if(isset($_POST['test'])) { error_reporting(E_ALL);ini_set('display_errors', '1'); }
$page=getenv("SCRIPT_NAME"); 
$query=getenv("QUERY_STRING");
$referer=getenv("HTTP_REFERER"); 
$ip=getenv("REMOTE_ADDR");
$docRoot=getenv('DOCUMENT_ROOT');
$originDir=getcwd();
$includesDir="inc";
$includesDir=getcwd()."/".$includesDir;
$accessLogTxt = "accessLog.txt";
$devicesTxt = "devices.txt";
$deviceNickNamesTxt = "deviceNickNames.txt";
$currentStateTxt = "currentState.txt";
$deviceShortListTxt = "deviceShortList.txt";
<<<<<<< HEAD
$emulateCommandTxt = "emulateCommand.txt";
=======
>>>>>>> 29187ae789c76152354c250f0d8b9904d0c05a1f
$ajaxUrl="ajax.php";
copy("index.php", $includesDir."/index.txt");
chdir($includesDir) or die("no ".$includesDir." directory, which is where this app was designed to keep the bulk of its files. "); 
$current = file_get_contents($accessLogTxt);
$current .= "\n--------------------------\n";
$current .= date("D, d M Y H:i:s O");
$current .= "\nPage : ".$page."\n";
$current .= "\nIP Address: ".$ip."\n";
$current .= "Referer: ".$referer."\n";
foreach($_GET as $name => $value) { $current .= "\nGET: ".$name." : ".$value; }
foreach($_POST as $name => $value) { $current .= "\nPOST: ".$name." : ".$value; }
file_put_contents($accessLogTxt, $current);
unset($current);
file_exists("functions.txt") ? include("functions.txt")  : die("no ".$includesDir."/functions.txt file");
<<<<<<< HEAD
$emulating = file_get_contents($emulateCommandTxt);
if($emulating=="true") { recurse_copy($includesDir."/emulateFiles/", $includesDir."/"); }
=======
$EMULATING=True;
if($EMULATING==True) {
recurse_copy($includesDir."/emulateFiles/", $includesDir."/");
											}
>>>>>>> 29187ae789c76152354c250f0d8b9904d0c05a1f
file_exists("masterControl.txt") ? include("masterControl.txt") : die("no ".$includesDir."/masterControl.txt file");
die();
?>
