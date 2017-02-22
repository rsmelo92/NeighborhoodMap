let model = {
	places: [
		{lat: -12.966832, lng: -38.413336}, //Pituaçu
		{lat: -12.969852, lng: -38.411423}, //
		{lat: -12.970644, lng: -38.412952},	//
		{lat: -12.971781, lng: -38.414744},	//
		{lat: -12.967910, lng: -38.408789},	//
	],
	infos: [
		'O Parque Metropolitano de Pituaçu, ou simplesmente Parque de Pituaçu, está localizado no bairro de Pituaçu, em Salvador, próximo à orla e à Universidade Católica do Salvador (UCSal). Foi criado por Decreto Estadual nº 23.666 de 4 de setembro de 1973 e pelo Decreto nº 23.113 de 12 de abril de 1978 foi declarada a utilidade pública do terreno para desapropriações, inicialmente com 660 hectares, durante o governo estadual de Roberto Santos. Está situado na orla marítima e atualmente ocupa 425 hectares, a maior reserva ecológica da cidade de Salvador, Bahia. Nos fins de semana, recebe entre quatro e cinco mil visitantes',
		'O Rancho do Cupim surgiu em 2008 na cidade de São José do Rio Preto, no interior de São Paulo, a partir de uma ideia dos empresários Nilton e Zezinho, pioneiros e fundadores da Churrascaria Sal e Brasa nesta mesma cidade. ',
		'Com unidades em Aracaju, Fortaleza, João Pessoa, Natal, Recife, Salvador e São Luis, o Grupo Sal e Brasa, nascido em 1993 em São José do Rio Preto - SP cresce no mercado Nordestino com foco em excelência no atendimento, serviço e qualidade nos produtos oferecidos.',
		'Inaugurada em outubro de 1997 – a Churrascaria Baita Tchê – é localizada em um dos principais pontos de Salvador: a orla. Além de trazer um novo conceito em gastronomia, toda a nossa estrutura é voltada para proporcionar um maior conforto aos nossos clientes.',
		'A cabana do João e um restaurante especializado em frutos do mar, com destaque a culinária baiana. Conhecida como o rei do caranguejo, oferece o crustáceo atendendo as normas de higienização, fresquinho e com um delicioso tempero. Com uma linda vista para o mar, a casa tem ambiente arejado e atendimento diferenciado. Dispõem de área VIP, wi-fi e espaço infantil monitorado. Venha tomar a cervejinha sempre gelada da casa, com a sua família e amigos, com uma vista privilegiada para o mar .',
	]
}

console.log("model", model);
function initMap() {
	let map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -12.969794, lng: -38.412244},
		zoom: 16,
	});

	let markerArray = [];

	for (let i = 0; i < 5; i++) {
		let marker = new google.maps.Marker({
			position: model.places[i],
			map: map,
		});

		let infowindow = new google.maps.InfoWindow({
			content: model.infos[i]
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

		markerArray.push(marker);
	}
	console.log("markerArray", markerArray);
}
function openNav() {
    $("#sideMenu").css('width', '250px');
    $(".map-section").css('marginLeft', '250px');
}

$(function(){
	console.log("Loaded");
	var viewModel = {
        showMenu : function() {
		    $("#sideMenu").css('width', '250px');
		    $(".map-section").css('marginLeft', '250px');
        },
        closeMenu() {
		    $("#sideMenu").css('width', '0');
		    $(".map-section").css('marginLeft', '0');
		}
    };

    ko.applyBindings(viewModel);	
});