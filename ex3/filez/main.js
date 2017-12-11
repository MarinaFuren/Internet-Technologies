addScriptToFile(createPages);

var bottom_content, profileScreenVar, loginScreenVar, calculatorScreenVar;
var calcsNum = 0;
var calcsArray = new Array();
var operators = ['+', '-', '*', '/', '%'];
var isDecimal = false;

function addScriptToFile(callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = "jquery-3.1.1.min.js";

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);

}


function createPages()
{
    bottom_content = createElement("div", "bottom", undefined, undefined, undefined, undefined, document.body);

    loginScreenVar = createElement("div", "loginScreenVar", undefined, undefined, undefined, undefined, bottom_content);
    profileScreenVar = createElement("div", "profileScreenVar", undefined, undefined, undefined, undefined, bottom_content);
    calculatorScreenVar = createElement("div", "calculatorScreenVar", undefined, undefined, undefined, undefined, bottom_content);

    profileScreen();
    loginScreen();
    calcScreen();

}

function switchScreens(screen) {
    loginScreenVar.style.display = "none";
    profileScreenVar.style.display = "none";
    calculatorScreenVar.style.display = "none";

    document.getElementById(screen).style.display = "inline";
}


function loginCheck() {
    var user = document.getElementById("userInputName").value;
    var password = document.getElementById("userInputPassword").value;

    if (user === "")
    {
        document.getElementById("loginError").innerText = "please insert username";
    }
    else if (password ==="")
    {
        document.getElementById("loginError").innerText = "please insert password";
    }
    else {
        if (user === password && user === 'admin') {
            switchScreens("profileScreenVar");
            return false;
        }
        document.getElementById("loginError").innerText = "Wrong username or password. Please try again.";
    }

    var error = document.getElementById("loginError");
    error.style.visibility = "visible";

    return false;
}
function createElement(element, id, classes , src, text, innerHtml, parent){

    var newElement = document.createElement(element);

    if (id != undefined) {
        newElement.id = id;
    }

    if (classes != undefined) {
        newElement.className = classes;
    }
    if (src != undefined) {
        newElement.src = src;
    }
    if (text != undefined) {
        var newContent = document.createTextNode(text);
        newElement.appendChild(newContent);
    }

    if (innerHtml != undefined) {
        newElement.innerHTML = innerHtml;
    }

    if (parent != undefined) {
        parent.appendChild(newElement);
    }

    return newElement;
}

function loginScreen() {

    var div_middle = createElement("div", undefined, "middle", undefined, undefined, undefined, loginScreenVar);
    var div_column = createElement("div", undefined, "column", undefined, undefined, undefined, div_middle);
    var h2_header = createElement("h2", undefined, "imageHeader", undefined, undefined, undefined, div_column);
    var image_logo = createElement("img", undefined, "LoginImage", "logo2.png", undefined, undefined, h2_header);
    var h2_text = createElement("div", undefined, "content", undefined, "Log-in to your account", undefined, h2_header);

    var form = createElement("form", undefined, undefined, undefined, undefined, undefined, div_column);
    var div_segment = createElement("div", undefined, "stacked segment", undefined, undefined, undefined, form);
    var div_field1 = createElement("div", undefined, "field", undefined, undefined, undefined, div_segment);
    var div_firstInput = createElement("div", undefined, "input", undefined, undefined, undefined, div_field1);

    var user_name = createElement("input", "userInputName", undefined, undefined, undefined, undefined, div_firstInput);
    user_name.setAttribute("type", "text");
    user_name.setAttribute("placeholder", "Username");

    var div_field2 = createElement("div", undefined, "field", undefined, undefined, undefined, div_segment);
    var div_secondInput = createElement("div", undefined, "input", undefined, undefined, undefined, div_field2);

    var password = createElement("input", "userInputPassword", undefined, undefined, undefined, undefined, div_secondInput);
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "Password");

    createElement("div", "loginError", undefined, undefined, undefined, undefined, form);

    var button = createElement("button", undefined, "login", undefined, undefined, "Login", form);
    button.addEventListener("click", function(event){
        event.preventDefault();
        return loginCheck();
    });
}

function profileScreen() {

    var h1_header = createElement("h1", undefined, undefined, undefined , undefined, "Nitzan Wertheizer - Profile Page", profileScreenVar);
    var h2_header = createElement("h2", undefined, "profie", undefined , undefined, "Full Name:", profileScreenVar);
    var p1 = createElement("p", undefined, undefined, undefined , undefined, "Nitzan Wertheizer", profileScreenVar);
    var h21_header = createElement("h2", undefined, "profie", undefined , undefined, "ID Number:", profileScreenVar);
    var p2 = createElement("p", undefined, undefined, undefined , undefined, "305493538", profileScreenVar);
    var h22_header = createElement("h2", undefined, "profie", undefined , undefined, "Link to my favorite page in the web:", profileScreenVar);
    var web = createElement("a", undefined, undefined, undefined , "Tasty on Buzzfeed", undefined, profileScreenVar);
    web.href = "https://www.buzzfeed.com/tasty";
    var h23_header = createElement("h2", undefined, "profie", undefined , undefined, "Something interesting about myself:", profileScreenVar);
    var p3 = createElement("p", undefined, undefined, undefined , undefined, " I can't eat gluten and lactose - so pizza can kill me.", profileScreenVar);
    var h24_header = createElement("h2", undefined, "profie", undefined , undefined, "Image:", profileScreenVar);
    var image = createElement("img", undefined, undefined, "5.jpg"  , undefined, "ID Number:", profileScreenVar);

    var button = createElement("button", undefined, "nextCalc", "arrow.png", undefined, undefined, profileScreenVar);
    button.addEventListener("click", function(event){
        event.preventDefault();
        return switchScreens("calculatorScreenVar");
    });

}

function calcScreen() {
    var addCalPanel = createElement("div", "addCalPanel", undefined, undefined, undefined, undefined, calculatorScreenVar);

    var button = createElement("button", "addMoreCalc", undefined, undefined, undefined ,"Add a Calculator", addCalPanel);
    button.addEventListener("click", function(event){
        event.preventDefault();
        calcsNum++;
        calcsArray.push(new Calc(calcsNum));
    });

    calcsNum = 1;
    calcsArray.push(new Calc(calcsNum));
}

function bulidCalcNumbers(numPanel)
{
    createElement("button", "bigButtons", "clear" , undefined, undefined, "Del", numPanel);
    createElement("button", undefined, "operator", undefined, undefined, "%", numPanel);
    createElement("button", undefined, "operator", undefined, undefined, "+", numPanel);

    createElement("button", undefined, undefined, undefined, undefined, "7", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "8", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "9", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "-", numPanel);


    createElement("button", undefined, undefined, undefined, undefined, "4", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "5", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "6", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "*", numPanel);

    createElement("button", undefined, undefined, undefined, undefined, "1", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "2", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "3", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, "/", numPanel);

    createElement("button", "bigButtons", undefined, undefined, undefined, "0", numPanel);
    createElement("button", undefined, undefined, undefined, undefined, ".", numPanel);
    createElement("button", undefined, "eval", undefined, undefined, "=", numPanel);
}

function buildCalc(num) {
    var calcPanel = createElement("div", "calcPanel", "middle", undefined, undefined, undefined, calculatorScreenVar);
    var calcOp = createElement("div", "num" + num, "form calculator", undefined, undefined, undefined, calcPanel);
    var calculator = createElement("div", "calculator", undefined, undefined, undefined, undefined, calcOp);

    var resultPanel = createElement("div", undefined, "resultPanel", undefined, undefined, undefined, calculator);
    var screenPanel = createElement("div", undefined, "screen", undefined, undefined, undefined, resultPanel);
    var screen = createElement("div", "result_" + num, "result",undefined, undefined, "", screenPanel);

    var numPanel = createElement("div", undefined, "numbers", undefined, undefined, undefined, calculator);

    bulidCalcNumbers(numPanel);

    return screen;

}

function createMoreCalc(numOfCalc, screen){
    $("#num" + numOfCalc).find("button").click(function () {
        var calcC = $(this).attr('class');
        var key = $(this).html();
        makeCalc(calcC, key, screen);

        return false;
    });
}

function makeCalc(calcC, key, screen) {

    var equation = ($(screen).text());
    var lastChar = equation[equation.length - 1];
    var text;

    if (calcC === "eval"){
        if(operators.indexOf(lastChar) > -1 || lastChar == '.') {
            equation = equation.replace(/.$/, '');
        }

        if(equation) {
            $(screen).text(eval(equation));
        }

        isDecimal = false;

    }
    else if (calcC === "clear"){
        $(screen).text("");

    }
    else if (calcC === "operator") {

        if (equation != '' && operators.indexOf(lastChar) == -1) {
            text = $(screen).text() + key;
            $(screen).text(text);
        }

        else if (equation == '' && key == '-') {
            text = $(screen).text() + key;
            $(screen).text(text);
        }

        if (operators.indexOf(lastChar) > -1 && equation.length > 1) {
            text = $(screen).text().replace(/.$/, key);
            $(screen).text(text);
        }

        isDecimal = false;
    }
    else {
        if (key == '.') {
            if (!isDecimal) {
                isDecimal = true;
            }
        }

        var text = $(screen).text() + key;
        $(screen).text(text);
    }
}


function Calc(num) {
    this.id = num;
    this.screen = buildCalc(this.id);
    createMoreCalc(this.id, this.screen);

}





