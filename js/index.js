const IBAN_PATTERN = /^([A-Z]{2})(\d{2})(\s{0,1}\d{4}){5}$/;
const MATRICULA_PATTERN = /^(\d{4})[\s-]{0,1}([B-DF-HJ-NP-TV-Z]{3})$/;
const CREDITCARD_PATERN = /^(5[0-5]\d{2})[\s-]{0,1}(\d{4})[\s-]{0,1}(\d{4})[\s-]{0,1}(\d{4})$/;
const MODERATE_PASSWORD_PATTERN = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
const COMPLEX_PASSWORD_PATTERN = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
const HEX_COLOR_PATTERN = /^#([A-F]|[a-f]|[0-9]){6}$/;
const HTML_IMAGES_PATTERN = /^<img src="(.+\.(jpg|png|gif))"\/>$/gim;

var validCode = (codeToValidate, patternToApply) => (new RegExp(patternToApply)).test(codeToValidate);

var getCodeItems = (codeToExtract, patternToApply) => (new RegExp(patternToApply)).exec(codeToExtract);

var displayCodeItems = (codeField, patternToApply, codesToDisplay, codesIndexes ) => {
    if (validCode(codeField.value, patternToApply)) {
        var extractedItems = getCodeItems(codeField.value, patternToApply);
        for (index of codesIndexes) {
            codesToDisplay[codesIndexes.indexOf(index)].innerText = extractedItems[index];
        }
        codeField.classList.remove("error");
        codeField.classList.add("correct");
    } else {
        for (field of codesToDisplay) {
            field.innerText = "";
        }
        codeField.classList.remove("correct");
        codeField.classList.add("error");
    }
}

var addContainer = (element, divClass) => {
    var elementContainer = document.createElement("div");
    elementContainer.setAttribute("class", divClass);
    elementContainer.appendChild(element)
    return elementContainer
}

var extractPatternFromText = (searchedText, pattern) => searchedText.match(pattern);

var displayHTMLImages = (itemsList, itemsField, itemClass) => {
    for (item of itemsList) {
        var element = document.createElement("span");
        element.innerText = item;
        itemsField.appendChild(addContainer(element, itemClass));
    }
}

var handleIbanKeyUp = (event) => {
    var ibanField = event.target;
    var letrasIban = document.getElementById("ibanCountry");
    var digitosControl = document.getElementById("ibanControlDigits");
    var ibanCodestoDisplay = [letrasIban, digitosControl];
    var itemsIndexes = [1,2];
    displayCodeItems(ibanField, IBAN_PATTERN, ibanCodestoDisplay, itemsIndexes)
}

var handleMatriculaKeyUp = (event) => {
    var matriculaField = event.target;
    var letrasMatricula = document.getElementById("matriculaLetters");
    var numerosMatricula = document.getElementById("matriculaNumbers");
    var matriculaCodestoDisplay = [letrasMatricula, numerosMatricula];
    var itemsIndexes = [1,2];
    displayCodeItems(matriculaField, MATRICULA_PATTERN, matriculaCodestoDisplay, itemsIndexes)
}

var handleCreditCardKeyUp = (event) => {
    var creditCardField = event.target;
    var creditCardGroup1 = document.getElementById("creditCardGroup1");
    var creditCardGroup2 = document.getElementById("creditCardGroup2");
    var creditCardGroup3 = document.getElementById("creditCardGroup3");
    var creditCardGroup4 = document.getElementById("creditCardGroup4");

    var creditCardCodestoDisplay = [creditCardGroup1, creditCardGroup2, creditCardGroup3, creditCardGroup4];
    var itemsIndexes = [1,2,3,4];
    displayCodeItems(creditCardField, CREDITCARD_PATERN, creditCardCodestoDisplay, itemsIndexes)
}

var handleHexColordKeyUp = (event) => {
    var hexColorField = event.target;
    var hexColorResultField = document.getElementById("validColor");

    if (validCode(hexColorField.value, HEX_COLOR_PATTERN)) {
        hexColorField.classList.remove("error");
        hexColorField.classList.add("correct");
        hexColorResultField.innerText = "Color Valido";
    } else {
        hexColorField.classList.remove("correct");
        hexColorField.classList.add("error");
        hexColorResultField.innerText = "Color Invalido";
    }
}

var handlePasswordKeyUp = (event) => {
    var passwordField = event.target;
    var paswordTypeField = document.getElementById("passwordType");
    var isModerate = validCode(passwordField.value, MODERATE_PASSWORD_PATTERN);
    var isComplex = validCode(passwordField.value, COMPLEX_PASSWORD_PATTERN);
    if (!(isModerate || isComplex)) {
        passwordField.classList.remove("correct");
        passwordField.classList.add("error");
        paswordTypeField.innerText = "Clave Invalida";
    } else {
        if (isComplex) {
            paswordTypeField.innerText = "Clave Compleja"
        } else {
            paswordTypeField.innerText = "Clave Moderada"
        }
        passwordField.classList.remove("error");
        passwordField.classList.add("correct");
    }
}

var handleExtractBtnClick = () => {
    var htmlTextField = document.getElementById("htmlText");
    var imagesResulgField = document.getElementById("imagesResult");
    imagesResulgField.innerHTML = "";

    if (htmlTextField.value == "") {
        window.alert("Introducir texto HTML");
        return;
    } 

    displayHTMLImages(extractPatternFromText(htmlTextField.value, HTML_IMAGES_PATTERN), imagesResulgField, "lineaImagen");
}

document.getElementById("ibanCode").addEventListener("keyup",handleIbanKeyUp);
document.getElementById("matricula").addEventListener("keyup",handleMatriculaKeyUp);
document.getElementById("creditCard").addEventListener("keyup",handleCreditCardKeyUp);
document.getElementById("password").addEventListener("keyup",handlePasswordKeyUp);
document.getElementById("hexColor").addEventListener("keyup",handleHexColordKeyUp);
document.getElementById("btn-extract").addEventListener("click",handleExtractBtnClick);

document.getElementById("htmlText").value = `
<html>
<body>
<img src="https://image.freepik.com/iconos-gratis/github-circular_318-10610.jpg"/>
<h1>ejemplo</h1>
<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"/>
</body>
</html>`;