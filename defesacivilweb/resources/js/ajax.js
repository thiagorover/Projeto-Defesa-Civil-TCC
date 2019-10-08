ajax = new Object();

$.ajaxSetup({
	statusCode : {
		403 : function(jqxhr, textStatus, data) {

		}
	}
});

ajaxRequestDefault = function() {
	var def = {
		url : null,
		dataType : 'json',
		contentType : "application/json; charset=UTF-8",
		success : function() {
		
		},
		error : function(err) {
			alert("error = " + err.responseText);
		}
	};
	return def;
}
verifyObjectData = function(cfg) {
	if (cfg.data) {
		if (isObject(cfg.data)) {
			cfg.data = JSON.stringify(cfg.data);
		}
	}
	return cfg;
}

isObject = function(o) {
	return $.isArray(o) | $.isPlainObject(o) | $.isFunction(o);
};

ajax.post = function(cfg) {
	var def = new ajaxRequestDefault();
	cfg.type = "POST";
	cfg = verifyObjectData(cfg);
	var config = $.extend(def, cfg);
	$.ajax(config);
};

ajax.get = function(cfg) {
	var def = new ajaxRequestDefault();
	cfg.type = "GET";
	cfg = verifyObjectData(cfg);
	var config = $.extend(def, cfg);
	$.ajax(config);
};

ajax.put = function(cfg) {
	var def = new ajaxRequestDefault();
	cfg.type = "PUT";
	cfg = verifyObjectData(cfg);
	var config = $.extend(def, cfg);
	$.ajax(config);
};

ajax.delete = function(cfg) {
	var def = new ajaxRequestDefault();
	cfg.type = "DELETE";
	cfg = verifyObjectData(cfg);
	var config = $.extend(def, cfg);
	$.ajax(config);
};

ajax.url = "http://localhost:3333"; //http://10.3.79.235:9080
