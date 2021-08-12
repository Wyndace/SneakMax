// === rangeSlider ====================================================================================================================================================

const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
    start: [1850, 25768],
		connect: true,
		step: 1,
    range: {
			'min': [1850],
			'max': [25768]
    }
	});

	const inputMin = document.getElementById('rangeSlider_inputMin');
	const inputMax = document.getElementById('rangeSlider_inputMax');
	const inputs = [inputMin, inputMax];

	rangeSlider.noUiSlider.on('input', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		console.log(arr);

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('input', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}

// ====================================================================================================================================================================
