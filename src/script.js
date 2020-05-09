class Signal {
	setClass()
	{
		var cl = this.obj.classList;
		if (this.state == true) {
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
	}
	
	constructor(obj, state) {
		this.obj = obj;
		this.state = state;
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

// Configure button A.
var btnA = document.getElementById('btnA');
btnA.signal = new Signal(btnA, false);
btnA.addEventListener("click", btnA.signal.toggle.bind(btnA.signal));

// Configure button B.
var btnB = document.getElementById('btnB');
btnB.signal = new Signal(btnB, false);
btnB.addEventListener("click", btnB.signal.toggle.bind(btnB.signal));

// Configure not A output signal.
var notA = document.getElementById('notA');
notA.signal = new Signal(notA, false);
// Configure not A gate.
var notGate = new LogicNot([btnA.signal], [notA.signal]);
setInterval("notGate.exec()", 10);

// Configure A and B output signal.
var aAndB = document.getElementById('aAndB');
aAndB.signal = new Signal(aAndB, false);
// Configure A and B gate.
var andGate = new LogicAnd([btnA.signal, btnB.signal], [aAndB.signal]);
setInterval("andGate.exec()", 10);

// Configure A or B output signal.
var aOrB = document.getElementById('aOrB');
aOrB.signal = new Signal(aOrB, false);
// Configure A or B gate.
var orGate = new LogicOr([btnA.signal, btnB.signal], [aOrB.signal]);
setInterval("orGate.exec()", 10);