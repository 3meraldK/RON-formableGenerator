const tab = '&nbsp;&nbsp;&nbsp;&nbsp;';

function isEmpty(input) {
	if (input.replaceAll(' ', '').length == 0) return true;
	return false;
}

function updateOutput() {
	
	const output = document.getElementById('output-text'),
		name = document.getElementById('name').value,
		canform = document.getElementById('canform').value,
		required = document.getElementById('required').value,
		tiles = document.getElementById('tiles').value,
		exclusive = document.getElementById('exclusive').value,
		buttonName = document.getElementById('button-name').value,
		buttonDesc = document.getElementById('button-desc').value,
		alertTitle = document.getElementById('alert-title').value,
		alertDesc = document.getElementById('alert-desc').value,
		alertButton = document.getElementById('alert-button').value,
		stabilityGain = document.getElementById('stability-gain').value,
		flagLink = document.getElementById('flag-link').value,

		canformlist = formListString(canform),
		requiredlist = formListString(required),
		tilelist = formListString(tiles),
		exclusivelist = formListString(exclusive);


	if (!isEmpty(name) && !isEmpty(canform) && !isEmpty(required) && !isEmpty(buttonName) && !isEmpty(buttonDesc)) {

		const isAlertVisible = (!isEmpty(alertTitle) || !isEmpty(alertDesc) || !isEmpty(alertButton));
		buttonVisibility('visible');
		output.innerHTML = 
		`{<br>${tab}FormableName = "${name}",
		<br>${tab}CountriesCanForm = {${canformlist}},
		<br>${tab}RequiredCountries = {${requiredlist}},
		${isEmpty(tiles) ? '' : `<br>${tab}RequiredTiles = {${tilelist}},`}
		${isEmpty(exclusive) ? '' : `<br>${tab}ExclusiveFormables = {${exclusivelist}},`}
		<br><br>${tab}FormableButton = {<br>${tab}${tab}ButtonName = "${buttonName}",
		<br>${tab}${tab}ButtonDescription = "${buttonDesc}",
		<br>${tab}},
		${!isAlertVisible ? '' : `<br><br>${tab}CustomAlert = {<br>${tab}${tab}Title = "${isEmpty(alertTitle) ? '' : alertTitle}",
		<br>${tab}${tab}Desc = "${isEmpty(alertDesc) ? '' : alertDesc}",
		<br>${tab}${tab}Button = "${isEmpty(alertButton) ? '' : alertButton}",<br>${tab}},`}
		${isEmpty(stabilityGain) ? '' : `<br><br>${tab}CustomAttributes = {<br>${tab}${tab}["Stability_Gain"] = ${stabilityGain},
		<br>${tab}},`}
		<br>},${isEmpty(flagLink) ? '' : '<br><br>Link to the flag: ' + flagLink}`;

	} else {
		output.innerHTML = 'Fill in the required labels to proceed (marked with asterisks). Italic labels are optional.';
		buttonVisibility('hidden');
	}

}

function formListString(input) {
	let newlist = '';
	for (const nation of input.split(',')) newlist = `${newlist}, "${nation.trim()}"`;
	return newlist.replace(', ', '');
}

function copyOutput() {

	const output = document.getElementById('output-text'),
		buttonText = document.getElementById('copy-output-label'),
		button = document.getElementById('copy-output');
	if (output.innerHTML.length <= 91) return;
	navigator.clipboard.writeText(output.innerText);

	buttonText.innerText = 'Copied!';
	button.style.backgroundColor = '#2f423a';
	setTimeout(() => {
		buttonText.innerText = 'Copy to clipboard';
		button.removeAttribute('style');
	}, 1000);

}

function buttonVisibility(state) {
	document.getElementById('copy-output').style.visibility = state;
}

window.onload = function() {
	updateOutput();
	document.getElementById('copy-output').onclick = copyOutput;
}

document.querySelectorAll('input').forEach(input => input.oninput = updateOutput);