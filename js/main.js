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
	]
}

function centerMap(newLat, newLng, zoom){
	map.setCenter({
		lat : newLat,
		lng : newLng
	});
	map.setZoom(zoom);
}

function initMap() {
	window.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -12.9899965, lng: -38.5181656},
		zoom: 14,
	});

	let markerArray = [];


	for (let i = 0; i < 5; i++) {
		$.ajax({
			url: "https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles="+model.infos[i]+"&redirects=true",
			dataType: 'jsonp',
	        success: function(data){
	        	// console.log('data', data);
	        	let index = data.query.pages[Object.keys(data.query.pages)[0]].extract.indexOf('<h2>');
	        	// console.log("data", data.query.pages[Object.keys(data.query.pages)[0]].extract.slice(0, index))
	        	
	        	let marker = new google.maps.Marker({
					position: model.places[i],
					map: map,
				});

				let infowindow = new google.maps.InfoWindow({
					content: data.query.pages[Object.keys(data.query.pages)[0]].extract.slice(0, index) + 'Fonte: <a href=https://pt.wikipedia.org/wiki/'+model.infos[i]+'>https://pt.wikipedia.org/wiki/'+model.infos[i] +'</a> via Wikipedia API.'
				});	

				marker.addListener('click', function() {
					infowindow.open(map, marker);
					map.setCenter(marker.getPosition());
				});


				markerArray.push(marker);
			}
		})
		.fail(function() {
			alert('Erro ao carregar conteúdo da Wikipédia')
		});
	}
}

function openNav() {
    $("#sideMenu").css('width', '250px');
    $(".map-section").css('marginLeft', '250px');
}

$(function(){
	// console.log("Loaded");

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
			if (this.nome==='Farol da Barra') {
				centerMap(-13.010339, -38.532960, 18);
			}
			if (this.nome==='Museu Rodin') {
				centerMap(-12.997754, -38.525217, 18);
			}
			if (this.nome==='Parque Zoobotânico Getúlio Vargas') {
				centerMap(-13.008796, -38.504997, 18);
			}
			if (this.nome==='Mercado Modelo') {
				centerMap(-12.972950, -38.513987, 18);
			}
			if (this.nome==='Arena Fonte Nova') {
				centerMap(-12.978737, -38.504368, 18);
			}
			if (this.nome==='Reset Map') {
				centerMap(-12.9899965, -38.5181656, 14);
			}
		},
		infosVM: [
			{nome: 'Farol da Barra'},
			{nome: 'Museu Rodin'},
			{nome: 'Parque Zoobotânico Getúlio Vargas'},
			{nome: 'Mercado Modelo'},
			{nome: 'Arena Fonte Nova'},
			{nome: 'Reset Map'},
		]
    };

    ko.applyBindings(viewModel);	
});