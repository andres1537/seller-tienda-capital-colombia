jQuery( document ).ready(function( $ ) {
	var request;
	
	$('#categoryMultiple').multiselect({
		maxHeight: 240
    });
			
	$("#registerForm").submit(function(event){
		// abort any pending request
		if (request) {
			request.abort();
		}

		$("#category").val($("#categoryMultiple").val());
		var utm_source = "&utm_source=" + getUrlParameter('utm_source');
		var utm_medium = "&utm_medium=" + getUrlParameter('utm_medium');
		var utm_campaign = "&utm_campaign=" + getUrlParameter('utm_campaign');
		var utm_term = "&utm_term=" + getUrlParameter('utm_term');
		var utm_content = "&utm_content=" + getUrlParameter('utm_content');
		
		// setup some local variables
		var $form = $(this);
		var $inputs = $form.find("input, select, button, textarea");
		var serializedData = $form.serialize() + utm_source + utm_medium + utm_campaign + utm_term + utm_content;
		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
		$inputs.prop("disabled", true);
		$('#result').css('visibility', 'hidden');

		$('#send').text('Enviando...');
		request = $.ajax({
			url: "https://script.google.com/macros/s/AKfycbygHbL65Txsp6BTu3_8KkbzUv3SGDmNJyHGB9fKbr7pj6DDH-k/exec",
			type: "post",
			data: serializedData
		});

		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			$('#send').html('Enviar');
			$('#result').css('visibility', 'visible');
			$form[0].reset();
			$('#categoryMultiple').multiselect('refresh');
		});

		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			$('#result').css('visibility', 'hidden');
		});

		// callback handler that will be called regardless
		// if the request failed or succeeded
		request.always(function () {
			$inputs.prop("disabled", false);
		});

		// prevent default posting of form
		event.preventDefault();
	});
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};