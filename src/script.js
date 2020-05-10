class Signal {
	setClass()
	{
		var state = this.state;
		this.elem.forEach(function (elem) {
			var cl = elem.classList;
			if (state == true) {
				if (cl.contains('signalOff'))
				{
					cl.remove('signalOff');
				}
					cl.add('signalOn');
			} else {
				if (cl.contains('signalOn'))
				{
					cl.remove('signalOn');
				}
					cl.add('signalOff');
			}
		});
	}
	
	constructor(elem, state) {
		this.elem = elem;
		this.state = state;
		this.setClass();
	}

	// Adds a HTML element to the element list.
	addElem(elem){
		var x = 5;
		this.elem.push(elem);
		this.setClass();
	}

	toggle() {
		this.state = !this.state;
		this.setClass();
	}
	
	setState(state) {
		this.state = state;
		this.setClass();
	}
	
	getState() {
		return this.state;
	}
}

class LogicBlock {
	constructor(inputs, outputs) {
		this.inputs = inputs;
		this.outputs = outputs;
	}
}

class LogicNot extends LogicBlock {
	exec() {
		this.outputs[0].setState(! this.inputs[0].getState());
	}
}

class LogicAnd extends LogicBlock {
	exec() {
		var inputs = this.inputs;
		this.outputs[0].setState(inputs[0].getState() && inputs[1].getState());
	}
}

class LogicOr extends LogicBlock {
	exec() {
		var inputs = this.inputs;
		this.outputs[0].setState(inputs[0].getState() || inputs[1].getState());
	}
}

/// Attaches an existing signal to a HTML element.
/// @returns an object containing the HTML element.
function addElemSig(elemId, sig)
{
	var elem = document.getElementById(elemId);
	sig.addElem(elem);
}

/// Attaches a new signal to a HTML element.
/// @returns an object containing the HTML element and the signal.
function addElemNewSig(elemId, value)
{
	var elem = document.getElementById(elemId);
	var sig = new Signal([elem], value);

	return {elem, sig};	
}

/// Attaches a new signal to a HTML button and adds the click event to the button.
/// @returns the signal
function addBtnSig(btnId, value)
{
	let btnSig = addElemNewSig(btnId, value);
	btn = btnSig.elem;
	sig = btnSig.sig
	btn.addEventListener("click", sig.toggle.bind(sig));	

	return sig;	
}

// Attach signals to buttons A and B.
sigA = addBtnSig('btnA', false);
sigB = addBtnSig('btnB', false);

// Configure -not A- output signal.
var sigNotA = addElemNewSig('notA', false).sig;
// Configure -not A- gate.
var notGate = new LogicNot([sigA], [sigNotA]);
setInterval("notGate.exec()", 10);

// Configure -A and B- output signal.
var sigAAndB = addElemNewSig('aAndB', false).sig;
// Configure -A and B- gate.
var andGate = new LogicAnd([sigA, sigB], [sigAAndB]);
setInterval("andGate.exec()", 10);

// Configure -A or B- output signal.
var sigAOrB = addElemNewSig('aOrB', false).sig;
// Configure -A or B- gate.
var orGate = new LogicOr([sigA, sigB], [sigAOrB]);
setInterval("orGate.exec()", 10);

// Attach wires to the signals.
sigA.addElem(document.getElementById("wireA"));
sigB.addElem(document.getElementById("wireB"));
sigAAndB.addElem(document.getElementById("wireAAndB"));