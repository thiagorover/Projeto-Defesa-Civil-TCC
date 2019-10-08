usuario = new Object();

$(document).ready(function(){
    
	usuario.inserir = function(){
		confirmSenha = $("#criar_confirmar_senha").val(); 
		var novoUsuario = new Object();
        novoUsuario.profile = 1;
        novoUsuario.name = $("#criar_nome").val();
        novoUsuario.email = $("#criar_email").val();
        novoUsuario.password = $("#criar_senha").val();
        novoUsuario.status = 1;
        novoUsuario.receive_notification = 1;
        
    	if(novoUsuario.password !== confirmSenha){
			bootbox.alert("Senhas não conferem!");
			return false;
		} 
        
        var cfg = {
        	type: "POST",
    		url: `${ajax.url}/users/`,
    		data: novoUsuario,
    	    headers: { 'Authorization': "Basic " + window.btoa(novoUsuario.email + ":" + novoUsuario.password)},    	    
    	    async: false,
    		success: function(data){
    			// Cria um item "usuario" com valor "Nome"
    			window.location.assign("index.html");
    			$("#login-modal .close").click();
    			$("#register-form")[0].reset();
    			
				var user = {
					password: novoUsuario.password,
					apiUser: data.object
				};
				window.sessionStorage.setItem('usuario', JSON.stringify(user));
    		},
        	error: function(e){
        		bootbox.alert(e.responseJSON.message);
        	}
        };
        ajax.post(cfg);
    };
    
    usuario.login = function(){
    	var loginUsuario = new Object();
        loginUsuario.email = $("#login_email").val();
        loginUsuario.password = $("#login_senha").val();
        var cfg = {
        	type: "POST",
    		url: `${ajax.url}/login`,
    		data: loginUsuario,
    	    headers: { 'Authorization': "Basic " + window.btoa(loginUsuario.email + ":" + loginUsuario.password)},    	    
    	    async: false,
    	    success: function(data){
    			window.location.assign("index.html");
    			$("#login-modal .close").click();
    			$("#login-form")[0].reset();
    			
				var user = {
					password: loginUsuario.password,
					apiUser: data.object
				};
				window.sessionStorage.setItem('usuario', JSON.stringify(user));
    		},
        	error: function(e){
        		bootbox.alert(e.responseJSON.message);
        	}
        };
        ajax.post(cfg);
    };
    
    usuario.alterarUsuario = function(){
    	var usuario = JSON.parse(window.sessionStorage.getItem('usuario'));
    	
    	var confirmSenha = $("#confirm_nova_senha").val();
    	var alterarUsuario = new Object();
    	alterarUsuario.password = $("#senha_atual").val();
    	alterarUsuario.newPassword = $("#nova_senha").val();
		
    	if(alterarUsuario.newPassword !== confirmSenha){
			bootbox.alert("Senhas não conferem!");
			return false;
		} 
    	
    	var cfg = {
        	type: "PUT",
    		url: `${ajax.url}/changePassword/`,
    		data: alterarUsuario,
    	    headers: { 'Authorization': "Basic " + window.btoa(usuario.apiUser.email + ":" + usuario.password)},    	    
    	    async: false,
    		success: function(data){
    			$("#login-modal .close").click();
    			$("#change_password")[0].reset();
				var user = {
					password: alterarUsuario.newPassword,
					apiUser: data.object
				};
				window.sessionStorage.setItem('usuario', JSON.stringify(user));
    		},
        	error: function(e){
        		bootbox.alert(e.responseJSON.message);
    		}
        };
        ajax.put(cfg);
    };
    
    usuario.sair = function(){
//    	var cfg = {
//			type: "GET",
//			url: "http://localhost:3333/logout", //"http://10.30.79.235:9080/logout",
//			success: function (data){
				window.sessionStorage.removeItem('usuario');
				window.location.assign("index.html");
//			},
//			error: function(e){
//				bootbox.alert(e.responseJSON.message);
//			}
//		};
//		ajax.get(cfg);
    };
    
	usuario.redefinirSenha = function(){
		var redefinirSenha = new Object();
		redefinirSenha.user_email = $("#lost_email").val();
        var cfg = {
        	type: "POST",
    		url: `${ajax.url}/password/`,
    		data: redefinirSenha,
    		headers: { 'Authorization': "Basic " + window.btoa("teste1@teste.com" + ":" + "adriel")},
    		success: function(data){
    			$("#login-modal .close").click();
    			$("#lost-form")[0].reset();
    		},
        	error: function(e){
        		console.log(e);
//        		bootbox.alert(e.responseJSON.message);
        		bootbox.alert({
        		    message: e.responseJSON.message,
        		    size: 'small'
        		});
        	}
        };
        ajax.post(cfg);
    };
    
})