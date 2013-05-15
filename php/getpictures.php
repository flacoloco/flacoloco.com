<?php
header('Content-Type: text/html; charset=utf-8');

if (!isset($_GET["folder"])) exit("error: no parameter");
else $dir    = "images/".$_GET["folder"];


//escaneo dir
$app_fotos = @scandir("../".$dir);

if ($app_fotos == FALSE) {
	exit('{"pictures": []}');
} else {

	//escanear carpeta de fotos generales
	$json='{"pictures": '; 
	//print "app_fotos-><br>";
	$json .= "[ ";
	for ($j=0;$j<sizeof($app_fotos);$j++){
		if (strtolower(substr($app_fotos[$j],-3))=="jpg" or strtolower(substr($app_fotos[$j],-3))=="png") {
			//print "<blockquote>$app_fotos[$j]</blockquote>";
			$json .= '{"foto": "'.$dir . '/'. $app_fotos[$j].'"},';
		}
	}			
	//quitar última coma
	$json = substr($json,0,sizeof($json)-2);
	$json .= "]}";
	//mostrar json generado
	print $json;

}
?>