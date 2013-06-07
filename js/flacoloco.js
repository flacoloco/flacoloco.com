var base_url = "http://localhost/flacoloco";
//var base_url = "http://flacoloco.com";
var json={};
var url;
var loc="index";
var size="desktop";

$(window).resize(function() {
/*	var w = $(this).width();
	
	if (size=="desktop" && w<500) {
		//change class of every thumb
		//$("div.thumb img").removeClass("img-circle");
		size="mobile"; 
		console.log(size);
	} else if (size=="mobile" && w>500) {
		$("div.thumb img").removeClass("img-trip");
		//$("div.thumb img").addClass("img-circle");
		size="desktop";
		console.log(size);
	}*/
});

//create an item for every project found at the json file
function createItems(){
	$("#projects").fadeToggle(400,rellenaItems);
}

function rellenaItems() {
	var count=0;
	var item="";
	var filter = sessionStorage.getItem("filter");
	console.log(filter);
	$("#projects").html("");
	for (var i = 0; i < json.projects.length;i++) {
		if (json.projects[i].type==filter || filter=="all") {
			var id = json.projects[i].id;
			if (count==0) {
				item = "<div class='row-fluid'>"; 
			} 
			item += '<div class="span4 thumb" data-id="' +id + '">';
			var img_class;
			//if ($(window).width()>500) img_class="img-circle";
			//else img_class="img-circle img-trip";
			item +=  '<img src="' + base_url + '/images/' + id + '/' + id + '.jpg" class="img-circle">';
			item += "<p>" +  json.projects[i].footer + "</p>";
			item += "</div>";
			
			if (count==2) {
				count=0;
				item += "</div>";
				$("#projects").append(item);
			} else count++;
		}
	}
	
	//si el bucle ha acabado antes de completar la última fila,
	//la cierro y la añado
	if (count>0) {
		item += "</div>";
		$("#projects").append(item);
	}	
	$("#projects").fadeToggle();

}

//muestro ficha de proyecto
function createSheet(){
		//at project.html get the id of the clicked item at index.html
		//from url
		var projects = url.split("/");
		var idproject =projects[projects.length - 1].toString();
		console.log(loc + ":" + idproject);
		
		//recorro la lista para encontrar el id del proyecto
		for (var i=0;i<json.projects.length;i++) {
			if (json.projects[i].id==idproject) {
				$("#desc").append(json.projects[i].desc);
				$("#url").append("<a href='" + json.projects[i].url + "'>" + json.projects[i].url + "</a>");
				$("#picture_main").attr("src",base_url + "/images/" + idproject + "/" + idproject + "-large.jpg");
				$("#picture_main_footer").text(json.projects[i].footer);
				
				//añado etiquetas de tecnologia
				var label="<ul class='technologies'>";
				for (var j=0;j<json.projects[i].tecnos.length;j++) {
					label += "<li>" + json.projects[i].tecnos[j] + "</li>";
				}
				label += "</ul>";
				$("#techno").append(label);
				break;
			}
		}
}

function loadJSONData() {
 	$.getJSON(base_url + "/projects.json",{format: "json"},
	  	function(data) {
			json = data;
			if (loc=="index") createItems();
			else if (loc=="project") createSheet();
			
			
					
		}
   	);
}

/*
 <!--div class="span3 thumb" data-id="robot">
	         <img src="images/robot.jpg" class="img-circle">
	         <h1>Explorer Robot</h1>
	         <ul>
	         	<li>Arduino</li>
	         	<li>AS3</li>
	         	<li>Autoit</li>
	         	<li>Motors</li>
	         	<li>Phidgets</li>
	         	<li>Sensors</li>
	         </ul>
         </div>

*/


$(document).ready(function(){
		//check sessionStorage is supported
		if (typeof(Storage)=="undefined") {
			alert("Sorry! No web storage support..");
  		}	 else {
  			if (sessionStorage.length==0) {
  				sessionStorage.setItem("filter","all");
  			} else {
					$("#filter li").removeClass("active");
					//busco el enlace activo
					for (var i=0;i<$("#filter li a").length;i++){
						//console.log($("#filter li:eq(" + i + ") a").data("filter"));
						if ($("#filter li:eq(" + i + ") a").data("filter") == sessionStorage.getItem("filter"))
							$("#filter li:eq(" + i + ")").addClass("active");  	
					}		
  			}
  			url=$(location).attr('href');
  			if(url.indexOf("/project")>0) loc="project";
  			else if (url.indexOf("/about")>0) loc="about";
			else {
  				loc="index";
  				//event for click on any item
				$("#projects").delegate(".thumb","click",function(e){
					window.location.href=base_url + "/project/" + $(this).data("id");
				});
				
				//event for filter
				$("#filter").delegate("li a","click",function(e){
					e.preventDefault();
					console.log($(this).data("filter"));
					sessionStorage.setItem("filter",$(this).data("filter"));
					
					//marco el filtro seleccionado
					$("#filter li").removeClass("active");
					$(this).closest("li").addClass("active");
					createItems();
				});
			}
			if (loc!="about") loadJSONData();
		}
});