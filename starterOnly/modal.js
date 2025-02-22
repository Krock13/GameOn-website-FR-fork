// Edit the header for the responsive version
function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const form = document.querySelector('form');
const modalbg = document.querySelector('.bground');
const modalBody = document.querySelector('.modal-body');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.text-control');
const radio = document.querySelectorAll('.checkbox-input[type=radio]');
const checkBox = document.querySelectorAll('.checkbox-input[type=checkBox]');
const closeModalBtn = document.querySelectorAll('.close');
const submitBtn = document.getElementById('btn-submit');

// Regex
const nameRegex = /^[a-zA-Zéèàùç'-]{2,}(\s[a-zA-Zéèàùç'-]{2,})?$/;
const emailRegex = /^\S+@\S+\.\S+$/;
// const birthdateRegex =
// 	/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/gm;
const quantityRegex = /^(0?[1-9]|[1-9][0-9])$/;

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

// Close modal event
closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// Close modal form
function closeModal() {
	modalbg.style.display = 'none';
}

// Add attribute on formData div to show error
function addError(input, message) {
	input.parentNode.setAttribute('data-error-visible', true);
	input.parentNode.setAttribute('data-error', message);
}

// Remove Attribute if there is no error
function removeError(input) {
	input.parentNode.removeAttribute('data-error-visible');
	input.parentNode.removeAttribute('data-error');
}

// Function to test form input
function regexValidation(input, regex, message) {
	// Return false if conditions is not respected
	let regexpTest = regex.test(input.value);

	// Create or remove error message
	if (regexpTest === false) {
		addError(input, message);
		input.addEventListener('change', () => {
			regexValidation(input, regex, message);
		});
	} else {
		removeError(input);
		input.removeEventListener('change', () => {
			regexValidation(input, regex, message);
		});
	}
}

// Function to test the birthdate
function validateBirthdate(input, message) {
	// Add error message if input is empty
	if (input.value.length === 0) {
		addError(input, message);
	}
	// Remove the error message on change
	input.addEventListener('change', () => {
		removeError(input);
	});
}

// Function to test radio buttons
function validateOption(input, message) {
	// stock every checked value of radio array
	let option = [];
	input.forEach((item) => {
		option.push(item.checked);
	});
	// check if option didn't include a true value
	if (!option.includes(true)) {
		addError(input[0], message);
	}
	// Remove error message on change
	input.forEach((elem) => {
		elem.addEventListener('change', () => {
			removeError(input[0]);
		});
	});
}

// Function to check if the condition of use checkbox is checked.
function validateCheckbox(input, message) {
	// if checkbox is false, create an error message
	if (!input.checked) {
		addError(input, message);
	}
	// Remove error message on change
	input.addEventListener('change', () => {
		removeError(input);
	});
}

//Function to show confirmation message
function validationMessage() {
	launchModal();
	form.style.display = 'none';

	// Create a div with the confirmation message
	let confirmationMessageBloc = document.createElement('div');
	confirmationMessageBloc.classList.add('confimationMessageBloc');
	confirmationMessageBloc.innerHTML = `
	  <p> Merci pour<br>votre inscription </p>
	  <button class="btn-signup modal-btn close-confirmation-btn">
		Fermer
	  </button>
	`;

	// Append the div to modal-body
	document.querySelector('.modal-body').append(confirmationMessageBloc);
	// Close the modal and refresh page
	const closeBtnConfirmation = () => {
		modalbg.style.display = 'none';
		window.location.href = './index.html';
	};

	// Event listeners for closing buttons
	document.querySelector('.close-confirmation-btn').addEventListener('click', closeBtnConfirmation);
	document.querySelector('.close').addEventListener('click', closeBtnConfirmation);
}

// Event listener for form submission
submitBtn.addEventListener('click', (e) => {
	e.preventDefault();

	// formData matches according to its index to : [0]:firstName, [1]:lastName, [2]:email, [3]:birthdate, [4]:quantity
	regexValidation(formData[0], nameRegex, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
	regexValidation(formData[1], nameRegex, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
	regexValidation(formData[2], emailRegex, 'Veuillez entrer un email valide.');
	validateBirthdate(formData[3], 'Vous devez entrer votre date de naissance.');
	regexValidation(formData[4], quantityRegex, 'Veuillez entrer un nombre en 1 et 99');
	validateOption(radio, 'Vous devez choisir une option.');
	validateCheckbox(checkBox[0], 'Vous devez vérifier que vous acceptez les termes et conditions.');

	// Get all the errors
	let errors = document.querySelectorAll('.formData[data-error]');

	// If form has no error, display validate message else keep form on screen
	if (errors.length === 0) {
		console.log('Prénom : ', formData[0].value);
		console.log('Nom : ', formData[1].value);
		console.log('Email : ', formData[2].value);
		console.log('Date de naissance : ', formData[3].value);
		console.log('Quantité : ', formData[4].value);
		radio.forEach((radio) => {
			if (radio.checked === true) {
				console.log('Option : ', radio.value);
			}
		});
		console.log('Termes et conditions : ', checkBox[0].checked);
		console.log('Event : ', checkBox[1].checked);

		validationMessage();
	}
});
