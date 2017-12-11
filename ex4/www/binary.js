var httpRequest;
var flag; // zero for zero, one for one, two for reset


document.getElementById("zeroButton").onclick = function() {
    document.getElementById("zeroButton").style.visibility = "hidden";
    document.getElementById("oneButton").style.visibility = "hidden";
    document.getElementById("resetButton").style.visibility = "visible";
    flag = 0;
    makeRequest('0');
};

document.getElementById("oneButton").onclick = function() {
    document.getElementById("zeroButton").style.visibility = "hidden";
    document.getElementById("oneButton").style.visibility = "hidden";
    document.getElementById("resetButton").style.visibility = "visible";
    flag = 1;
    makeRequest('1');
};

document.getElementById("resetButton").onclick = function() {
    document.getElementById("zeroButton").style.visibility = "hidden";
    document.getElementById("oneButton").style.visibility = "hidden";
    document.getElementById("resetButton").style.visibility = "visible";
    makeRequest('reset');
};

 function makeRequest(url) {
     var currComd;
     httpRequest = new XMLHttpRequest();
     if (!httpRequest) {
         alert('Giving up :( Cannot create an XMLHTTP instance');
         return false;
     }
     if (url === '1' || url === '0') {
         currComd = 'POST';
     }
     else if (url === 'reset'){
         currComd = 'DELETE';
     }
     else {
         currComd = undefined;
     }

     if (currComd != undefined) {
         var currRequest = new XMLHttpRequest();
         currRequest.open(currComd, "/gamble/" + url);
         currRequest.onload = alertContents;
         currRequest.send();
     }

     function alertContents(){
         if (currRequest.readyState === XMLHttpRequest.DONE) {
             if (currRequest.status === 200) {
                 var data = JSON.parse(currRequest.responseText);
                 document.getElementById("result").innerText = currRequest.responseText;
                 var result;
                 if (flag === 0) {
                    result = data.ones - data.zeros;
                    if (result === 0){
                        document.getElementById("message").innerText = "TIE";
                    }
                    else if (result > 0) {
                        document.getElementById("message").innerText = "YOU WON! :)";
                    }
                    else if (result < 0) {
                        document.getElementById("message").innerText = "YOU LOST! :(";
                    }
                } else if (flag === 1) {
                     result = data.zeros- data.ones;
                     if (result === 0){
                         document.getElementById("message").innerText = "TIE";
                     }
                     else if (result > 0) {
                         document.getElementById("message").innerText = "YOU WON! :)";
                     }
                     else if (result < 0) {
                         document.getElementById("message").innerText = "YOU LOST! :(";
                     }
                 }
             }
         }
     }
 }
