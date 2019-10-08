$(document).ready(function() {	
	var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;
    
    $('.modal').on('hidden.bs.modal', function() {
        $(this).find('input:text').val('');
    });

    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    
    modalAnimate = function($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    };
    
//    API google login
//    var googleUser = {};
//    var startApp = function() {
//      gapi.load('auth2', function(){
//        // Retrieve the singleton for the GoogleAuth library and set up the client.
//        auth2 = gapi.auth2.init({
//          client_id: '718799067567-2df1lq7lg5q43glkgjhp5of5rde0od2q.apps.googleusercontent.com',
//          cookiepolicy: 'single_host_origin',
//          // Request scopes in addition to 'profile' and 'email'
//          //scope: 'additional_scope'
//        });
//        attachSignin(document.getElementById('customBtn'));
//      });
//    };
//
//    attachSignin = function(element) {
//      auth2.attachClickHandler(element, {},
//          function(googleUser) {
//            document.getElementById('name').innerText = "Signed in: " +
//                googleUser.getBasicProfile().getName();
//          }, function(error) {
//            alert(JSON.stringify(error, undefined, 2));
//          });
//    };
//    
//    startApp();
    
//    //API facebook login
//    (function(d, s, id) {
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) return;
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.10&appId=132787520656801";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
    

    var usuario = JSON.parse(window.sessionStorage.getItem('usuario'));
    var nomeUsuario = null;
    if (usuario === null){
    	nomeUsuario = null;
    }else{
    	nomeUsuario = usuario.apiUser.userName;
    	if (nomeUsuario === undefined){
    		nomeUsuario = usuario.apiUser.name;
    	}
    }

    var btn_sair = `<div id="btn_sair" class="btn-group">
				    	<button type="button" class="btn btn-primary">Olá, ${nomeUsuario}</button>
				    	<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
					    	<span class="caret"></span>
					    	<span class="sr-only">Toggle Dropdown</span>
				    	</button>
				    	<ul class="dropdown-menu" role="menu">
					    	<li><a href="#" data-toggle="modal" data-target=".troca_senha">Alterar senha</a></li>
					    	<li class="divider"></li>
					    	<li><a href="#" onclick="usuario.sair();">Sair</a></li>
				    	</ul>
			    	</div>`;

    //<li><a href="#" data-toggle="modal" data-target=".config">Consigurações</a></li>
    
    if (nomeUsuario === null){
    	$('#btn_usuario').html('<input id="btn_entrar" class="btn btn-primary" type="button" value="Entrar" title="Entrar" data-toggle="modal" data-target=".login">');
	}else{
		$('#btn_usuario').html(btn_sair);
	}   
});
 