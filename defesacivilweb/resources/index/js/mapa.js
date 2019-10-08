$(document).ready(function() {	
	
	
	var cachedMarkers = {};
	var allMarkers = [];
	var type = '';
	var map;
//	var habilita_desabilita_rota = 0;
//	var pontosRestritos = [];
//	var waypts = [];
//	var i = 0;
	var map_seletor = document.getElementById('map');
	
	
	mapa.initAutocomplete = function() {
	
		map = new google.maps.Map(map_seletor, {
			center: {lat: -26.351, lng: -48.861},
			zoom: 16,			
			maxZoom: 14,
			minZoom: 10,
			mapTypeId: 'roadmap',
			zoomControl: true,
			scaleControl: true,
			disableDefaultUI: true
		});
		
		var inputPesquisar = document.getElementById('input_pesquisar');										
		var searchBoxPesquisar = new google.maps.places.SearchBox(inputPesquisar);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputPesquisar);

//		var btnHabilitaRota = document.getElementById('btn_habilita_rota');										
//		map.controls[google.maps.ControlPosition.TOP_LEFT].push(btnHabilitaRota);
		
//		var inputPontoInicial = document.getElementById('input_p_inicial');
//		var searchBoxPontoInicial = new google.maps.places.SearchBox(inputPontoInicial);
//		map.controls[google.maps.ControlPosition.LEFT].push(inputPontoInicial);
//	
//		var inputPontoFinal = document.getElementById('input_p_final');										
//		var searchBoxPontoFinal = new google.maps.places.SearchBox(inputPontoFinal);
//		map.controls[google.maps.ControlPosition.LEFT].push(inputPontoFinal);
//		
//		var btnRota = document.getElementById('btn_rota');										
//		map.controls[google.maps.ControlPosition.LEFT].push(btnRota);

		var fltAlagamento = document.getElementById('flt_alagamento');										
		map.controls[google.maps.ControlPosition.LEFT].push(fltAlagamento);
		
		var fltDeslizamento = document.getElementById('flt_deslizamento');										
		map.controls[google.maps.ControlPosition.LEFT].push(fltDeslizamento);
		
		var fltArvoresCaidas = document.getElementById('flt_arvores_caidas');										
		map.controls[google.maps.ControlPosition.LEFT].push(fltArvoresCaidas);

		var btnEntrar = document.getElementById('btn_entrar');										
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(btnEntrar);
		
		var btnSair = document.getElementById('btn_sair');										
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(btnSair);
		
		var btnSobre = document.getElementById('btn_sobre');										
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(btnSobre);
		
		var imggoogleplaymapa = document.getElementById('imggoogleplaymapa');										
		map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(imggoogleplaymapa);
		
		setInterval(function(){
			mapa.marcacoes(type);
		}, 15000);

		map.addListener('tilesloaded',function() {
			mapa.marcacoes(type);
		});

		mapa.marcacoes = function(typeLocal){
			var usuario = JSON.parse(window.sessionStorage.getItem('usuario'));
			var centro = mapa.pegarCentro();
			mapa.clearMarkers();
			var cfg = {
				type: "GET",
				url: `${ajax.url}/markups?lat=${centro.lat()}&long=${centro.lng()}&distance=4&type=${typeLocal}`,
				success: function (data){
					montaMarcacoesMapa(data.object);
					google.maps.event.trigger(map_seletor, 'resize');
					type = typeLocal;
				},
				error: function(e){
					bootbox.alert(e.responseJSON.message);
				}
			};
			ajax.get(cfg);
		};
		mapa.marcacoes('');
		
		
		mapa.marcacoesPorId = function(id){
			var defer = $.Deferred();
			
			if(id === null){
				return defer.reject();
			}
			
			if(cachedMarkers[id]) {
				defer.resolve(cachedMarkers[id]);
				return defer.promise();
			}
			
			var cfg = {
				type: "GET",
				url: `${ajax.url}/markups/`+id,
				success: function (data){
					cachedMarkers[id] = data.object;
					defer.resolve(data.object);
				},
				error: function(e){
					return defer.reject();
				}
			};
			ajax.get(cfg);
			return defer.promise();
		};
		
		
		montaMarcacoesMapa = function(marcacoes) {
			if(marcacoes != undefined && marcacoes.length > 0 && marcacoes[0].id != undefined){
				pontosRestritos = []; 
				$.each(marcacoes, function(i, marcacao) {
					pontosRestritos.push(marcacao);
					switch(marcacao.markup_type_id){
						case 1:
							mapa.marcacoesPorId(marcacao.id).then(function(marcacaoInfo) {
								var imgArvoresCaidas = new google.maps.MarkerImage(
								    "resources/index/img/arvores_caidas.png",
								    null, /* size is determined at runtime */
								    null, /* origin is 0,0 */
								    null, /* anchor is bottom center of the scaled image */
								    new google.maps.Size(34, 34)
								); 
								var informacoes = `<div>
												        <div>
												        	<img class="img-responsive" max-width="350px" height="auto" src="${marcacaoInfo.path}">
												        </div>
							           		   			<div style="font-size:15px" class="font text-justify">
							           		   				${marcacao.description}
							           		   			</div>
	        											<div style="font-size:12px" class="font text-right">
															${moment(new Date(marcacaoInfo.created_at)).format("DD/MM/YYYY HH:mm:ss")}							                        
														</div>
							                      </div>`; 
							    var infowindow = new google.maps.InfoWindow({
							    	content: informacoes,
							    	maxWidth: 400
						        });
								var marker = new google.maps.Marker({
									position: new google.maps.LatLng(marcacao.latitude, marcacao.longitude),
									title: "Arvores caídas",
									map: map,
									icon: imgArvoresCaidas//'resources/index/img/arvores_caidas.png'
								});
							    marker.addListener('click', function() {
						            infowindow.open(map, marker);
					            });
							    allMarkers.push(marker);
							}, function(e) {
								bootbox.alert(e.responseJSON.message);
							});
							break;
						case 2:
							mapa.marcacoesPorId(marcacao.id).then(function(marcacaoInfo) {
								var imgAlagamento = new google.maps.MarkerImage(
								    "resources/index/img/alagamento.png",
								    null, /* size is determined at runtime */
								    null, /* origin is 0,0 */
								    null, /* anchor is bottom center of the scaled image */
								    new google.maps.Size(34, 34)
								); 
								var informacoes = `<div>
												        <div>
												        	<img class="img-responsive" max-width="350px" height="auto" src="${marcacaoInfo.path}">
												        </div>
							           		   			<div style="font-size:15px" class="font text-justify">
							           		   				${marcacao.description}
							           		   			</div>
														<div style="font-size:12px" class="font text-right">
															${moment(new Date(marcacaoInfo.created_at)).format("DD/MM/YYYY HH:mm:ss")}							                        
														</div>
							                      </div>`; 
							    var infowindow = new google.maps.InfoWindow({
							    	content: informacoes,
							    	maxWidth: 400
						        });
								var marker = new google.maps.Marker({
									position: new google.maps.LatLng(marcacao.latitude, marcacao.longitude),
									title: "Alagamento",
									map: map,
									icon: imgAlagamento//'resources/index/img/alagamento.png'
								});
							    marker.addListener('click', function() {
						            infowindow.open(map, marker);
					            });
							    allMarkers.push(marker);
							}, function(e) {
								bootbox.alert(e.responseJSON.message);
							});
							break;
							
						case 3:
							mapa.marcacoesPorId(marcacao.id).then(function(marcacaoInfo) {
								var imgDeslizamentoTerra = new google.maps.MarkerImage(
								    "resources/index/img/deslizamento_terra.png",
								    null, /* size is determined at runtime */
								    null, /* origin is 0,0 */
								    null, /* anchor is bottom center of the scaled image */
								    new google.maps.Size(34, 34)
								);
								var informacoes = `<div>
												        <div>
												        	<img class="img-responsive" max-width="350px" height="auto" src="${marcacaoInfo.path}">
												        </div>
							           		   			<div style="font-size:15px" class="font text-justify">
							           		   				${marcacao.description}
							           		   			</div>
														<div style="font-size:12px" class="font text-right">
															${moment(new Date(marcacaoInfo.created_at)).format("DD/MM/YYYY HH:mm:ss")}							                        
														</div>
							                      </div>`; 
							    var infowindow = new google.maps.InfoWindow({
							    	content: informacoes,
							    	maxWidth: 400
						        });
								var marker = new google.maps.Marker({
									position: new google.maps.LatLng(marcacao.latitude, marcacao.longitude),
									title: "Deslizamento de terra",
									map: map,
									icon: imgDeslizamentoTerra//'resources/index/img/deslizamento_terra.png'
								});
							    marker.addListener('click', function() {
						            infowindow.open(map, marker);
					            });
							    allMarkers.push(marker);
							}, function(e) {
								bootbox.alert(e.responseJSON.message);
							});
						
						default:
							break;
					}
				});
			}
		};
		
//		//GERAR ROTAS
//		//INÍCIO
//		var directionsService = new google.maps.DirectionsService;
//		var directionsDisplay = new google.maps.DirectionsRenderer;
//		directionsDisplay.setMap(map);
//	
//		var rota = function() {
//			mapa.calculateAndDisplayRoute(directionsService, directionsDisplay);
//		};
//		document.getElementById('btn_rota').addEventListener('click', rota);
//		//FIM										 
			
		//POSSIBILITA O USUÁRIO PESQUISAR UM LOCAL
		//INÍCIO
		map.addListener('bounds_changed', function() {
			searchBoxPesquisar.setBounds(map.getBounds());
		});
	
		var markers = [];
		searchBoxPesquisar.addListener('places_changed', function() {
			var places = searchBoxPesquisar.getPlaces();
	
			if (places.length == 0) {
				return;
			}
	
			// Clear out the old markers.
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];
	
			// For each place, get the icon, name and location.
			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};
	
				// Create a marker for each place.
				markers.push(new google.maps.Marker({
					map: map,
					icon: icon,
					title: place.name,
					position: place.geometry.location
				}));
	
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
		});
		//FIM
		
		//ENTRAR NA LOCALIZAÇÃO CASO O USUÁRIO PERMITA
		//INÍCIO
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			
			//serve para mostrar a janelinha da mensagem, isso pode ser mudado posteriormente
			var infoWindow = new google.maps.InfoWindow({map: map});
	
			infoWindow.setPosition(pos);
			infoWindow.setContent('Você está aqui!');
			map.setCenter(pos);
			}, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
		
	
		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
								'Error: The Geolocation service failed.' :
								'Error: Your browser doesn\'t support geolocation.');
		}
		//FIM
	
		
//		//PONTO INICIAL E PONTO FINAL
//		//INÍCIO
//		map.addListener('bounds_changed', function() {
//			searchBoxPontoInicial.setBounds(map.getBounds());
//		});
//		
//		map.addListener('bounds_changed', function() {
//			searchBoxPontoFinal.setBounds(map.getBounds());
//		});
//	
//		var markers = [];
//		// Listen for the event fired when the user selects a prediction and retrieve
//		// more details for that place.
//		searchBoxPontoInicial.addListener('places_changed', function() {
//			var places = searchBoxPontoInicial.getPlaces();
//	
//			if (places.length == 0) {
//				return;
//			}
//	
//			// Clear out the old markers.
//			markers.forEach(function(marker) {
//				marker.setMap(null);
//			});
//			markers = [];
//	
//			// For each place, get the icon, name and location.
//			var bounds = new google.maps.LatLngBounds();
//			places.forEach(function(place) {
//				if (!place.geometry) {
//					console.log("Returned place contains no geometry");
//					return;
//				}
//				var icon = {
//					url: place.icon,
//					size: new google.maps.Size(71, 71),
//					origin: new google.maps.Point(0, 0),
//					anchor: new google.maps.Point(17, 34),
//					scaledSize: new google.maps.Size(25, 25)
//				};
//	
//				// Create a marker for each place.
//				markers.push(new google.maps.Marker({
//					map: map,
//					icon: icon,
//					title: place.name,
//					position: place.geometry.location
//				}));
//	
//				if (place.geometry.viewport) {
//					// Only geocodes have viewport.
//					bounds.union(place.geometry.viewport);
//				} else {
//					bounds.extend(place.geometry.location);
//				}
//			});
//			map.fitBounds(bounds);
//		});
//		
//		searchBoxPontoFinal.addListener('places_changed', function() {
//			var places = searchBoxPontoFinal.getPlaces();
//	
//			if (places.length == 0) {
//				return;
//			}
//	
//			// Clear out the old markers.
//			markers.forEach(function(marker) {
//				marker.setMap(null);
//			});
//			markers = [];
//	
//			// For each place, get the icon, name and location.
//			var bounds = new google.maps.LatLngBounds();
//			places.forEach(function(place) {
//				if (!place.geometry) {
//					console.log("Returned place contains no geometry");
//					return;
//				}
//				var icon = {
//					url: place.icon,
//					size: new google.maps.Size(71, 71),
//					origin: new google.maps.Point(0, 0),
//					anchor: new google.maps.Point(17, 34),
//					scaledSize: new google.maps.Size(25, 25)
//				};
//	
//				// Create a marker for each place.
//				markers.push(new google.maps.Marker({
//					map: map,
//					icon: icon,
//					title: place.name,
//					position: place.geometry.location
//				}));
//	
//				if (place.geometry.viewport) {
//					// Only geocodes have viewport.
//					bounds.union(place.geometry.viewport);
//				} else {
//					bounds.extend(place.geometry.location);
//				}
//			});
//			map.fitBounds(bounds);
//		});
//		//FIM
	};

//	//FUNÇÃO QUE CALCULA AS ROTAS
//	//INÍCIO
//	//Esta função contem uma ADAPTAÇÃO TÉCNICA da API do google maps.
//	//Favor, por ser uma adaptação técnica, se mecher estraga, então, NÂO MECHE!
//	mapa.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
//		directionsService.route({
//			origin: document.getElementById('input_p_inicial').value,
//			destination: document.getElementById('input_p_final').value,
//			provideRouteAlternatives: true,
//			travelMode: 'DRIVING'
//		}, function(response, status) {
//			if (status === 'OK') {
//	            for (var r = 0, qtdRotas = response.routes.length; r < qtdRotas; r++) {
//					console.log(response);
//				var rota = response.routes[0].overview_path;
//				mapa.calculaRotas(rota, directionsService);
//					break;
//	            	directionsDisplay.setDirections(response);
//	            	
//	            	new google.maps.DirectionsRenderer({
//	                    map: map,
//	                    directions: response,
//	                    routeIndex: r
//	                });
//	            }
//	            console.log(qtdRotas);
//	            
//				directionsService.route({
//					origin: document.getElementById('input_p_inicial').value,
//					destination: document.getElementById('input_p_final').value,					
//					waypoints: waypts,
//					travelMode: 'DRIVING'
//				}, function(response, status) {
//					//console.log(response);
//					if (status === 'OK') {
//						
//					}else{
//						window.alert('Rota não encontrada ou é inválida2: ' + status);		
//					}
//					directionsDisplay.setDirections(response);
//				});
//			} else {
//				window.alert('Rota não encontrada ou é inválida3: ' + status);
//			}
//		});
//	};
//	//FIM
//
//	mapa.calculaRotas = function(rota, directionsService){
//		var origem = "";
//		for (var x = 0; x < rota.length; x++){
//			if (mapa.verificaCoordenadas(rota[x])){
//				continue;
//			}else{
//				waypts.push({
//					location: rota[x-1],
//					stopover: false
//	            });
//				
//				var geocoder = new google.maps.Geocoder;
//				var latlng = {lat: rota[x-1].lat(), lng: rota[x-1].lng()};
//				geocoder.geocode({'location': latlng}, function(results, status) {
//					if (status === 'OK') {
//						origem += results[0].formatted_address;
//						
//						directionsService.route({
//							origin: origem,
//							destination: document.getElementById('input_p_final').value,
//							provideRouteAlternatives: true,
//							travelMode: 'DRIVING'
//						}, function(response, status) {
//							if (status === 'OK') {
//								var rota = response.routes[1].overview_path;
//								mapa.calculaRotas(rota, directionsService);
//							}else{
//								window.alert('Rota não encontrada ou é inválida1: ' + status);		
//							}
//						});
//						//setTimeout(function(){
//						//}, 500);
//					}else{
//						window.alert('Descodificação deu ruim: ' + status);
//					}
//				});
//				//break;
//			}
//		}
//	};
//	
//	mapa.verificaCoordenadas = function(pontosRota){
//		for (var x = 0; x < pontosRestritos.length; x++){	
//			var pontoRestrito = new google.maps.LatLng(pontosRestritos[x].latitude, pontosRestritos[x].longitude);
//			var pontoRota = new google.maps.LatLng(pontosRota.lat(), pontosRota.lng()); 
//
//			var distance = google.maps.geometry.spherical.computeDistanceBetween(pontoRota, pontoRestrito);
//
//			if(distance.toFixed(0) < 800){
//				i++;
//				console.log("restringiu a coordenada: " +pontoRota+ " | Count: "+i);
//				return false;
//				break;
//			}
//		}
//		return true;
//	};
	
	mapa.filtra_alagamentos = function(){
		$('#flt_alagamento').toggleClass('active');
		$('#flt_deslizamento').removeClass('active');
		$('#flt_arvores_caidas').removeClass('active');
		if (type === '' || type === 1 || type === 3){ 
			type = 2;
		}else{
			type = '';
		}
		mapa.clearMarkers();
		mapa.marcacoes(type);
	};
	
	mapa.filtra_deslizamentos = function(){
		$('#flt_deslizamento').toggleClass('active');
		$('#flt_alagamento').removeClass('active');
		$('#flt_arvores_caidas').removeClass('active');
		if (type === '' || type === 1 || type === 2){ 
			type = 3;
		}else{
			type = '';
		}
		mapa.clearMarkers();
		mapa.marcacoes(type);
	};
	
	mapa.filtra_arvores_caidas = function(){
		$('#flt_arvores_caidas').toggleClass('active');
		$('#flt_deslizamento').removeClass('active');
		$('#flt_alagamento').removeClass('active');
		if (type === '' || type === 2 || type === 3){ 
			type = 1;
		}else{
			type = '';
		}
		mapa.clearMarkers();
		mapa.marcacoes(type);
	};
	
    mapa.setMapOnAllMarkers = function(map) {
    	for (var i = 0; i < allMarkers.length; i++) {
    	  allMarkers[i].setMap(map);
    	}
    };
	
    mapa.clearMarkers = function() {
    	mapa.setMapOnAllMarkers(null);
	};
	
//	var habilita_desabilita_rota = `<input id="input_p_inicial" class="form-control" type="text" placeholder="Início">
//									<input id="input_p_final" class="form-control" type="text" placeholder="Fim">
//									<input id="btn_rota" class="btn btn-default" type="button" value="Traçar rota" title="Buscar a melhor rota">`;
//	$('#habilita_desabilita_rota').html(habilita_desabilita_rota);
//
//	mapa.habilita_desabilita_rotas = function(){
//		$('#input_p_inicial').toggle();
//		$('#input_p_final').toggle();
//		$('#btn_rota').toggle();
//		google.maps.event.trigger(map_seletor, 'resize');
//	};
//
//	mapa.habilita_desabilita_rotas();
	
	mapa.pegarCentro = function(){
		return map.getCenter();
	};
	
	mapa.recalcularCentro = function(ultimoCentro){
		google.maps.event.trigger(map_seletor, 'resize');
		map.setCenter(ultimoCentro);
	};
	
});

 
