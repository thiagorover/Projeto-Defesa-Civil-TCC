$(document).ready(function (){
	var menu_seletor = $("#menu");
	var botao_seletor = $("#botao_menu");
	var botao_fechar_seletor = $("#menu .botao_fechar");
	var mapa_seletor = $("#map");
	var menu_aberto = false;
	
	var funcao_menu = function(e){
		if(menu_aberto === true){
			menu_seletor.removeClass("visivel");
			botao_seletor.removeClass("expandido");
			
			//Passo 1 - colocar o width 100% novamente
			var ultimoCentro = mapa.pegarCentro();
			mapa_seletor.css("width", "100%");
			
			//passo 2 - zerar a esquerda para voltar ao normal
			mapa_seletor.css("left", "");
			mapa.recalcularCentro(ultimoCentro);
			
			menu_aberto = false;
		}else{
			menu_seletor.addClass("visivel");
			botao_seletor.addClass("expandido");
			
			//Passo 1 - Pegar a largura da DIV do mapa
			var tamanho_mapa = mapa_seletor.width();
			
			//Passo 2 - Diminuir 300px dessa largura
			tamanho_mapa -= 300;
			
			//Passo 3 - Colocar atributo na div
			var ultimoCentro = mapa.pegarCentro();
			mapa_seletor.css("width", tamanho_mapa + "px");
			
			//passo 4 - mover 300px para direita
			mapa_seletor.css("left", "300px");
			mapa.recalcularCentro(ultimoCentro);
			menu_aberto = true;
		}
		e.preventDefault();
	};
	
	botao_seletor.click(funcao_menu);
	botao_fechar_seletor.click(funcao_menu);
});
	
