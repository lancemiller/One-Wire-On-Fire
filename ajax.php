<?php
if(isset($_GET['test'])) { error_reporting(E_ALL);ini_set('display_errors', '1'); }
if(isset($_POST['test'])) { error_reporting(E_ALL);ini_set('display_errors', '1'); }
header("Content-Type: text/plain");
$page=getenv("SCRIPT_NAME"); 
$query=getenv("QUERY_STRING");
$referer=getenv("HTTP_REFERER"); 
$ip=getenv("REMOTE_ADDR");
$docRoot=getenv('DOCUMENT_ROOT');
$originDir=getcwd();
$includesDir="inc";
$includesDir=getcwd()."/".$includesDir;
$accessLogTxt = $includesDir."/accessLog.txt";
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

if(isset($_GET['test'])) { foreach($_GET as $name => $value) { print "\n".$name." : ".$value; } die();}
if(isset($_POST['test'])) { foreach($_POST as $name => $value) { print "\n".$name." : ".$value; } die();}
$includesDir="inc";
$includesDir=getcwd()."/".$includesDir;
$file=$includesDir."/".basename($page,"php")."txt";
if((count($_GET) < 1) && (count($_POST) < 1)) {
	print "Hello, I am ".$page."\n";
	print "To make me work properly please send GET or POST data\n";
	print "I am designed to not need editing, all the things you want to add to my functionality\n";
	print "should be written in a file called ".$file."\n";
  if(!is_dir($includesDir)) { print "Also, I see there is no ".$includesDir."\nPlease create this directory and place a file named '".basename($page,"php")."txt' in it";}			
  elseif(!is_file($file)) { print "Also, I am intelligent enough to see there is no ".$file."\nI leave it up to you to create that.\n"; }
  
  print "Below is ".$_SERVER['SCRIPT_FILENAME']." source code\n===============================\n";
  print file_get_contents($_SERVER['SCRIPT_FILENAME']);
  print "\n";
	if (is_file($file)) {
	print "Below is ".$file." source code\n===============================\n";
  print file_get_contents($file);
 } 
	die();
                                               }		
is_file($file) ?  include($file) : print $file." does not exist"; 
die();
?>
