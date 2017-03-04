let model = {
	places: [
		{lat: -13.010339,  lng: -38.532960},   //Farol da Barra
		{lat: -12.997754, lng: -38.525217}, //Rodin
		{lat: -13.008796,  lng: -38.504997}, //Parque zoologico
		{lat: -12.972950, lng: -38.513987}, //Mercado modelo
		{lat: -12.978737,  lng: -38.504368},//Fonte nova
	],
	infos: [
		'Farol_da_Barra_(Salvador)',
		'Museu_Rodin_Bahia',
		'Parque_Zoobotânico_Getúlio_Vargas',
		'Mercado_Modelo',
		'Arena_Fonte_Nova',
		'Arena_Fonte_Nova',
	]},
	markerArray = [];

function mapsError(){
	alert("ERRO: Google maps não pôde ser carregado");
}

function pinMap(){
	for (let i = 0; i < 5; i++) {
		$.ajax({
			url: "https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles="+model.infos[i]+"&redirects=true",
			dataType: 'jsonp',
	        success: function(data){
	        	let index = data.query.pages[Object.keys(data.query.pages)[0]].extract.indexOf('<h2>');
	       
	        	let marker = new google.maps.Marker({
					position: model.places[i],
					map: map,
					animation: google.maps.Animation.DROP,
					icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
					title: model.infos[i]
				});

				marker.addListener('click', function() {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null);
						marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
						infowindow.close();
					} 
					else {
						map.setCenter(marker.getPosition());
						marker.setAnimation(google.maps.Animation.BOUNCE);
						marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
						infowindow.open(map, marker);
						infowindow.setContent(data.query.pages[Object.keys(data.query.pages)[0]].extract.slice(0, index) + 'Fonte: <a href=https://pt.wikipedia.org/wiki/'+model.infos[i]+'>https://pt.wikipedia.org/wiki/'+model.infos[i] +'</a> via Wikipedia API.');
						
					}
				});


				markerArray.push(marker);
			}
		})
		.fail(function() {
			alert('Erro ao carregar conteúdo da Wikipédia');
		});
	}
}

function showMarkers () {
	for (var i = 0; i < markerArray.length; i++) {
		markerArray[i].setVisible(true);
	}
}

function centerMap(newLat, newLng, zoom, marker){
	if (marker) {
		for (var i = 0; i < markerArray.length; i++) {
			if (markerArray[i].title === marker) {
				map.setCenter({
					lat : newLat,
					lng : newLng
				});
				map.setZoom(zoom);

		  		google.maps.event.trigger(markerArray[i], 'click');
			}
		}
	}
	else{
		map.setCenter({
			lat : newLat,
			lng : newLng
		});
		map.setZoom(zoom);

	}
}

function initMap() {
	window.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -12.9899965, lng: -38.5181656},
		zoom: 14,
	});

	window.infowindow = new google.maps.InfoWindow({
		content: "Empty"
	});	

	pinMap();
}

function openNav() {
    $("#sideMenu").css('width', '250px');
    $(".map-section").css('marginLeft', '250px');
}

$(function(){
	
	var  array = [
			{nome: 'Farol da Barra (Salvador)'},
			{nome: 'Museu Rodin Bahia'},
			{nome: 'Parque Zoobotânico Getúlio Vargas'},
			{nome: 'Mercado Modelo'},
			{nome: 'Arena Fonte Nova'},
			{nome: 'Reset Map'},
		];

	var viewModel = {
        showMenu : function() {
		    $("#sideMenu").css('width', '250px');
		    $(".map-section").css('marginLeft', '250px');
        },
        closeMenu: function() {
		    $("#sideMenu").css('width', '0');
		    $(".map-section").css('marginLeft', '0');
		},
		centerFunction: function(){
			
			if (this.nome==='Farol da Barra (Salvador)') {
				centerMap(-13.010339, -38.532960, 18, this.nome.split(' ').join('_'));
			}
			else if (this.nome==='Museu Rodin Bahia') {
				centerMap(-12.997754, -38.525217, 18, this.nome.split(' ').join('_'));
			}
			else if (this.nome==='Parque Zoobotânico Getúlio Vargas') {
				centerMap(-13.008796, -38.504997, 18, this.nome.split(' ').join('_'));
			}
			else if (this.nome==='Mercado Modelo') {
				centerMap(-12.972950, -38.513987, 18, this.nome.split(' ').join('_'));
			}
			else if (this.nome==='Arena Fonte Nova') {
				centerMap(-12.978737, -38.504368, 18, this.nome.split(' ').join('_'));
			}
			else if (this.nome==='Reset Map') {
				centerMap(-12.9899965, -38.5181656, 14, false);
			}
		},
		infosVM: ko.observableArray([
			{nome: 'Farol da Barra (Salvador)'},
			{nome: 'Museu Rodin Bahia'},
			{nome: 'Parque Zoobotânico Getúlio Vargas'},
			{nome: 'Mercado Modelo'},
			{nome: 'Arena Fonte Nova'},
			{nome: 'Reset Map'},
		]),
		searchArray: ko.observableArray(this.infosVM),
		query :ko.observable(''),
		search: function(value) {
		    viewModel.infosVM.removeAll();

		    if (value === ''){
		    	showMarkers();
		    	viewModel.infosVM.push(
					{nome: 'Farol da Barra (Salvador)'},
					{nome: 'Museu Rodin Bahia'},
					{nome: 'Parque Zoobotânico Getúlio Vargas'},
					{nome: 'Mercado Modelo'},
					{nome: 'Arena Fonte Nova'},
					{nome: 'Reset Map'});
				return;
			}
			
			for (var i = 0; i < array.length-1; i++){

		      if (array[i].nome.toLowerCase().indexOf(value.toLowerCase()) !=-1) {
		        viewModel.infosVM.push(array[i]);
		        markerArray[i].setVisible(false);
		      }
		    }
		    
		    for(let j = 0; j < markerArray.length; j++){
	        	if (markerArray[j].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
	        		markerArray[j].setVisible(true);
	        	}
	        	else{
	        		markerArray[j].setVisible(false);
	        	}
	        }
		}
    };
	
	viewModel.query.subscribe(viewModel.search);
    ko.applyBindings(viewModel);	
});