var data = {
	prestiges: [0,0,0,0,0,0,0,0,0,0],
};

var prestigeCount = 0;

function getAllPrestiges() {
	let out = 0
	if (!localStorage.RESET_1 && localStorage.SHITPOST) {
		let tmp_data = JSON.parse(localStorage.SHITPOST);
		for (let i = 0; i < tmp_data.prestiges.length; i++) {
			out += tmp_data.prestiges[i];
		}
	}
	if (!localStorage.RESET_2 && localStorage.QUADRATIC_SHITPOST) {
		let tmp_data = JSON.parse(localStorage.QUADRATIC_SHITPOST);
		for (let x = 0; x < tmp_data.prestiges.length; x++) {
			const el = tmp_data.prestiges[x];
			for (let y = 0; y < el.length; y++) {
				out += el[y];
			}
		}
	}
	if (!localStorage.RESET_3 && localStorage.OH_NO) {
		let tmp_data = JSON.parse(localStorage.OH_NO);
		for (let x = 0; x < tmp_data.prestiges.length; x++) {
			const el = tmp_data.prestiges[x];
			for (let y = 0; y < el.length; y++) {
				for (let z = 0; z < el[y].length; z++) {
					out +=  el[y][z];
				}
			}
		}
	}
	if (!localStorage.RESET_4 && localStorage.META) {
		let tmp_data = JSON.parse(localStorage.META);
		for (let i = 0; i < tmp_data.prestiges.length; i++) {
			out += tmp_data.prestiges[i];
		}
	}
	return out;
}

function getGain() {
	var gain = 1;
	data.prestiges.forEach(function (el) {
		gain *= 1+el;
	})
	return Math.floor(gain);
}

function getRequirement(id) {
	if (id === 0) {
		return Math.floor(Math.pow(1.5,data.prestiges[0])*10);
	} else {
		return Math.pow(id+1,data.prestiges[id]+1);
	}
}

function canActivatePrestige(id) {
	if (id===0) {
		return (prestigeCount >= getRequirement(0));
	} else {
		return (data.prestiges[id-1] >= getRequirement(id));
	}
}

function activatePrestige(id) {
	if (canActivatePrestige(id)) {
		for (var i = 0; i < id; i++) {
			data.prestiges[i] = 0;
		}
		data.prestiges[id]++;
		localStorage.RESET_1 = "true";
		localStorage.RESET_2 = "true";
		localStorage.RESET_3 = "true";
		localStorage.RESET_4 = "true";
	}
	localStorage.PP = JSON.stringify(data);
	draw();
}

function update() {
	if (localStorage.PP) {
		data = JSON.parse(localStorage.PP);
	}
	localStorage.PP = JSON.stringify(data);
	prestigeCount = getAllPrestiges();
}

function draw() {
	document.getElementById("coins").innerHTML = prestigeCount;
	document.getElementById("gain").innerHTML = getGain();
	data.prestiges.forEach(function (el, i) {
		document.getElementById("tier"+(i+1)+"cost").innerHTML = getRequirement(i);
		document.getElementById("tier"+(i+1)+"a").innerHTML = el;
		document.getElementById("tier"+(i+1)+"mul").innerHTML = "x"+(el+1);
		if (canActivatePrestige(i)) {
			document.getElementById("tier"+(i+1)+"btn").disabled = false;
		} else {
			document.getElementById("tier"+(i+1)+"btn").disabled = true;
		}
	})
}

window.addEventListener("load",function () {
	if (localStorage.PP) {
		data = JSON.parse(localStorage.PP);
	}
	prestigeCount = getAllPrestiges();
	draw();
	for (var i = 0; i < 10; i++) {
		document.getElementById("tier"+(i+1)+"btn").addEventListener(
			"click",
			(function(n) {
				return (function () {
					activatePrestige(n);
				})
			}(i))
		);
	}
	setInterval(function () {
		update();
		draw();
	}, 1000);
	console.log("interval loaded")
})
