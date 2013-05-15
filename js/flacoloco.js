var json={};
var url;
var loc="index";

function loadJSONData() {
 	$.getJSON("projects.json",{format: "json"},
	  	function(data) {
			json = data;
			if (loc=="index") createItems();
			else if (loc=="project") {
				//at project.html get the id of the clicked item at index.html
				//from url
				var idproject =url.split("?")[1].toString();
				console.log(loc + ":" + idproject);
				
				//recorro la lista para encontrar el id
				for (var i=0;i<json.projects.length;i++) {
					if (json.projects[i].id==idproject) {
						$("#desc").append(json.projects[i].desc);
						$("#url").append("<a href='" + json.projects[i].url + "'>" + json.projects[i].url + "</a>");
						$("#picture_main").attr("src","images/" + idproject + "/" + idproject + "-large.jpg");
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
//create an item for every project found at the json file
function createItems(){
	
	var count=0;
	var item="";
	for (var i = 0; i < json.projects.length;i++) {
		var id = json.projects[i].id;
		if (count==0) {
			item = "<div class='row-fluid'>"; 
		} 
		item += '<div class="span4 thumb" data-id="' +id + '">';
		item +=  '<img src="images/' + id + '/' + id + '.jpg" class="img-circle">';
		item += "<p>" +  json.projects[i].footer + "</p>";
		item += "</div>";
		
		if (count==2) {
			count=0;
			item += "</div>";
			$("#projects").append(item);
		} else count++;
	}
	
	//si el bucle ha acabado antes de completar la última fila,
	//la cierro y la añado
	if (count>0) {
		item += "</div>";
		$("#projects").append(item);
	}	
	//event for clic on any item
	$(".thumb").on("click",function(e){
		window.location.href="project.html?" + $(this).data("id");
	});
	
}

$(document).ready(function(){
		//check sessionStorage is supported
		if (typeof(Storage)=="undefined") {
			alert("Sorry! No web storage support..");
  		}	 else {
  			url=$(location).attr('href');
  			if(url.indexOf("index.html")>0) loc="index";
  			else if(url.indexOf("project.html")>0) loc="project";
  			else if (url.indexOf("about.html")>0) loc="about";

			loadJSONData();
		}
});