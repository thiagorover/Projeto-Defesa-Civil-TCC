feed = new Object();

var page = 1;
var alturaDiv;
$(document).ready(function() {
	
	setTimeout(function() { 
	    alturaDiv = $('#notificacoes_feed').height();
	    alturaDiv = alturaDiv+ "px";
	}, 600);
    $('#notificacoes_feed').slimScroll({
        height: 500
    });
   
	setInterval(function(){
		page = 1;
		$('#notificacoes_feed').html('');
		feed.notificacoes();
	}, 60000);

    feed.notificacoes = function(){
		var cfg = {
			type: "GET",
			url: `${ajax.url}/notifications?page=`+page,
			success: function (data){
				feed.montaNotificacaoFeed(data.object.data, data.object.lastPage);
			},
			error: function(e){
				bootbox.alert(e.responseJSON.message);
			}
		};
		ajax.get(cfg);
    };
    feed.notificacoes();


	feed.montaNotificacaoFeed = function(notificacoes, paginas){
		if(notificacoes != undefined && notificacoes.length > 0 && notificacoes[0].id != undefined){
			$.each(notificacoes, function(i, notificacao) {

				$("#mais_antigas").remove();
				var panel_feed = $(`<div style="cursor:pointer" onclick="feed.buscaMarcacaoPorId(${notificacao.markup_id});" class="panel panel_color${notificacao.markup_id}" title="Buscar no mapa"></div>`);
				var panel_body = $(`<div class="panel-body"></div>`);
				panel_feed.append(panel_body);
				var panel_data = $(`<div style="font-size:15px" class="font text-justify">
										${notificacao.description}
										</div>
										<div style="font-size:12px" class="font text-right">
										${moment(new Date(notificacao.created_at)).format("DD/MM/YYYY HH:mm:ss")}
									</div>`);
				panel_body.append(panel_data);
				$('#notificacoes_feed').append(panel_feed);
				$(".panel_colornull").addClass("default");
				mapa.marcacoesPorId(notificacao.markup_id).then(function(marcacaoInfo) {
					switch (marcacaoInfo.markup_type_id){
						case 1:
							$(".panel_color"+marcacaoInfo.id).addClass("verde");
							break;
						case 2:
							$(".panel_color"+marcacaoInfo.id).addClass("azul");
							break;
						case 3:
							$(".panel_color"+marcacaoInfo.id).addClass("amarelo");
							break;
					}

					if (marcacaoInfo !== undefined){
						var panel_imagem = $(`<div>
									        	<img class="img-responsive" max-width="100px" height="auto" src="${marcacaoInfo.path}">
									        </div>
									        <br>`);
						panel_body.prepend(panel_imagem);
					}
					
				}, function(e) {
					bootbox.alert(e.responseJSON.message);
				});
				
				if (i === notificacoes.length - 1){
					
					var mais_antigas = `<div id="mais_antigas" class="panel-body">
											<div style="cursor:pointer" onclick="feed.notificacoes();" style="font-size:14px" class="font text-center">
												Carregar mais antigas...
											</div>
										</div>`;
					$('#notificacoes_feed').append(mais_antigas);
					$('#notificacoes_feed').slimscroll({ scroll: '1px' });
					
					if(page === paginas) {
						$("#mais_antigas").remove();
					}
					page++;
				};
			});
		}
	};
	
	feed.buscaMarcacaoPorId = function(idMarcacao){
		mapa.marcacoes('');
		$('#flt_deslizamento').removeClass('active');
		$('#flt_alagamento').removeClass('active');
		$('#flt_arvores_caidas').removeClass('active');
		
		mapa.marcacoesPorId(idMarcacao).then(function(marcacao) {
			if (marcacao !== undefined){
				mapa.recalcularCentro({lat:+marcacao.latitude, lng:+marcacao.longitude});
			}
		});
		
	};
});