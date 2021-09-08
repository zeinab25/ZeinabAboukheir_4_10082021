function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const testControl = document.querySelector("text-control");
const form = document.forms["reserve"];
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkboxCity = document.querySelector(".checkboxCity");
const checkboxInput = document.getElementsByClassName("checkboxInput");
const checkboxIcon = document.getElementsByClassName("checkboxIcon");
const condition = document.getElementById("checkbox1");
const conditionLabel = document.querySelector(".checkbox2-label");
const btnSubmit = document.querySelector(".btn-submit");
const modalBody = document.querySelector(".modal-body");
let checkSubmit;

//new  DOM Elements
const spanFirst = document.createElement("span");
firstName.after(spanFirst);
const spanLast = document.createElement("span");
lastName.after(spanLast);
const spanEmail = document.createElement("span");
email.after(spanEmail);
const spanBirth = document.createElement("span");
birthdate.after(spanBirth);
const spanQuantity = document.createElement("span");
quantity.after(spanQuantity);
const spanCheckbox = document.createElement("span");
checkboxCity.after(spanCheckbox);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal form
const modalClose = document.querySelector(".close");

function closeModal() {
	modalbg.style.display = "none";
}
modalClose.addEventListener("click", closeModal);

// error message
function showError(input, message, span) {
	span.textContent = message;
	span.style.color = "red";
	span.style.fontSize = "small";
	input.style.border = "2px solid red";
	checkSubmit = false;
}

// show success
function showSuccess(input, span) {
	span.textContent = "";
	input.style.border = "2px solid green";
}

// check input lenght
function checkLength(input, span) {
	const re = /\d+/;
	if (input.value.trim().length < 2) {
		showError(input, `Veuillez saisir au minimum 2 charactères.`, span);
	} else if (re.test(input.value)) {
		showError(input, `Ce champs n'accepte pas les chiffres.`, span);
	} else {
		showSuccess(input, span);
	}
}

// check email
function checkEmail(input, span) {
	const re = /^[\w.-]+@([a-z0-9._-]{2,})+\.([a-z]{2,4})$/;
	if (!re.test(input.value.trim())) {
		showError(input, "Veuillez saisir une adresse Email valide.", span);
	} else {
		showSuccess(input, span);
	}
}

// today's date
const today = new Date(); // Years-month-Day
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

// check birthdate
function calculAge(input, span) {
	const birhtYear = parseInt(input.value.substring(0, 4));
	const birthMonth = parseInt(input.value.substring(5, 2));
	const birthDay = parseInt(input.value.substring(8, 2));
	const age = todayYear - birhtYear;

	if (birhtYear < 1920) {
		showError(input, "la date doit être égal ou postérieure à '01/01/1920.'", span);
	} else if (birhtYear > todayYear) {
		showError(input, "Veuillez entrer une date valide.", span);
	} else if (
		age < 18 ||
		(age == 18 &&
			(todayMonth < birthMonth || (todayMonth == birthMonth && todayDay < birthDay)))
	) {
		showError(input, "Vous devez avoir plus de 18 ans pour participer.", span);
	} else if (input.value == "") {
		showError(input, "Veuillez saisir votre date de naissance.", span);
	} else {
		showSuccess(input, span);
	}
}

// check participation's number
function checkQuantity(input, span) {
	if (input.value == "" || parseInt(input.value) < 0) {
		showError(input, "Veuillez saisir un nombre entre 0 et 99.", span);
	} else if (input.value >= 99) {
		showError(input, "Veuillez saisir un nombre inférieur ou égal à 99.", span);
	} else {
		showSuccess(input, span);
	}
}

//check checkbox
function testCheckbox(input, span) {
	let nbrBox = 0;
	for (var i = 0; i < input.length; i++) {
		if (input[i].checked) {
			nbrBox++;
		}
	}
	if (nbrBox == 0 && quantity.value > 0) {
		showError(checkboxCity, "Veuillez sélectionner au moins une ville.", span);
	} else if (quantity.value == 0 && nbrBox > 0 && quantity.value != "") {
		showError(
			checkboxCity,
			"Vous n'avez participé à aucun tournois. Veuillez vider ce champs.",
			span
		);
	} else if (nbrBox > quantity.value && quantity.value > 0) {
		showError(
			checkboxCity,
			"Le nombre de villes sélectionnées doit être inférieur ou égal à " +
				quantity.value +
				" .",
			span
		);
	} else {
		showSuccess(checkboxCity, span);
		checkboxCity.style.border = "transparent";
	}
}

//check condition
function checkCondition(input) {
	if (input.checked == false) {
		conditionLabel.style.color = "red";
	} else {
		conditionLabel.style.color = "";
	}
}

// Event listeners
function inputEvent(funct, input, span) {
	input.addEventListener("blur", function () {
		funct(input, span);
	});
}

// submit test control
form.addEventListener("submit", function (e) {
	e.preventDefault();
	checkSubmit = true;

	checkLength(firstName, spanFirst);
	checkLength(lastName, spanLast);
	checkEmail(email, spanEmail);
	calculAge(birthdate, spanBirth);
	checkQuantity(quantity, spanQuantity);
	testCheckbox(checkboxInput, spanCheckbox);
	checkCondition(condition);

	if (checkSubmit) {
		document.querySelector(".modalMessage").className = "modalMessage SucessMsg";
		document.querySelector(".SucessMsg").innerHTML =
			"<p>Merci ! Votre réservation a été reçue.</p>";
		btnSubmit.setAttribute("value", "fermer");
		btnSubmit.addEventListener("click", closeModal);
	} else {
		inputEvent(checkLength, firstName, spanFirst);
		inputEvent(checkLength, lastName, spanLast);
		inputEvent(checkEmail, email, spanEmail);
		inputEvent(calculAge, birthdate, spanBirth);
		inputEvent(checkQuantity, quantity, spanQuantity);
		for (let checked of checkboxInput) {
			checked.addEventListener("change", function () {
				testCheckbox(checkboxInput, spanCheckbox);
			});
		}
		quantity.addEventListener("input", function () {
			testCheckbox(checkboxInput, spanCheckbox);
		});
		condition.addEventListener("change", function () {
			checkCondition(condition);
		});
	}
});
