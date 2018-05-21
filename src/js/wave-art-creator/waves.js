import {Constant} from './constants.js';
import {defaults} from './defaults.js';

class Wave {
	constructor({
		amplitude = new Constant(defaults.amplitude),
		period = new Constant(defaults.period),
		phaseShift = new Constant(defaults.phaseShift),
		verticalShift = new Constant(defaults.verticalShift)
	} = {}) {
		this.constants = {};
		this.vars = {};
		_.assign(this.constants, arguments[0]);
		_.forIn(this.constants, (constant, key) => {
			this.vars[key] = constant.val;
		});
	}
	f(x) {
		let b = (2*Math.PI) / this.vars.period;
		let c = this.vars.phaseShift * (2 * Math.PI)
		return (this.vars.amplitude * this.f0( (b * x) + c) ) + this.vars.verticalShift;
	}
	f0(x) {
		return x;
	}
	ease(t) {
		let b = 1/ this.vars.period;
		return (this.vars.amplitude * this.f0( b * t) + this.vars.phaseShift) + (this.vars.verticalShift);
	}
}

function cotangent(x) {
	return 1 / Math.tan(x);
}

export class SineWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.sineAmplitude),
		period = new Constant(defaults.sinePeriod),
		phaseShift = new Constant(defaults.sinePhaseShift),
		verticalShift = new Constant(defaults.sineVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(x) {
		return Math.sin(x);
	}
}

export class SquareWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.sqrAmplitude),
		period = new Constant(defaults.sqrPeriod),
		phaseShift = new Constant(defaults.sqrPhaseShift),
		verticalShift = new Constant(defaults.sqrVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(x) {
		return Math.sign(Math.sin(x));
	}
}

export class SquareFourierWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.sqrAmplitude),
		period = new Constant(defaults.sqrPeriod),
		phaseShift = new Constant(defaults.sqrPhaseShift),
		verticalShift = new Constant(defaults.sqrVerticalShift),
		N = new Constant(defaults.sqrN)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,N});
	}
	f0(x) {
		const series = _.range(1, this.vars.N.val + 1, 2);
		const res = _.reduce(series, (sum, n) => {
			return (Math.sin(n * x) / n) + sum;
		}, 0);
		return res;
	}
}

export class SawtoothWave extends Wave {
		constructor({
		amplitude = new Constant(defaults.sawAmplitude),
		period = new Constant(defaults.sawPeriod),
		phaseShift = new Constant(defaults.sawPhaseShift),
		verticalShift = new Constant(defaults.sawVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f(x) {
		let c = this.vars.phaseShift * (2 * Math.PI);
		let v1 = ( -2 * this.vars.amplitude / Math.PI );
		let v2 = ((x + c) * Math.PI) / this.vars.period;
		return v1 * Math.atan(cotangent(v2)) + this.vars.verticalShift;
	}
}

export class SawtoothFourierWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.sawAmplitude),
		period = new Constant(defaults.sawPeriod),
		phaseShift = new Constant(defaults.sawPhaseShift),
		verticalShift = new Constant(defaults.sawVerticalShift),
		N = new Constant(defaults.sawN)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,N});
	}
	f0(x) {
		const series = _.range(1, this.vars.N.val + 1, 1);
		const res = _.reduce(series, (sum, n) => {
			return (Math.sin(n * x) / n) + sum;
		}, 0);
		return res;
	}
}

export class TriangleWave extends Wave {
	constructor({
	amplitude = new Constant(defaults.triAmplitude),
	period = new Constant(defaults.triPeriod),
	phaseShift = new Constant(defaults.triPhaseShift),
	verticalShift = new Constant(defaults.triVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f(x) {
		let c = this.vars.phaseShift * (2 * Math.PI);
		let v1 = (2*this.vars.amplitude) / Math.PI;
		let v2 = (2*Math.PI) / this.vars.period;
		return (v1 * Math.asin(Math.sin(v2*(x + c)))) + this.vars.verticalShift;
	}
}

export class TriangleFourierWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.triAmplitude),
		period = new Constant(defaults.triPeriod),
		phaseShift = new Constant(defaults.triPhaseShift),
		verticalShift = new Constant(defaults.triVerticalShift),
		N = new Constant(defaults.triN)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift, N});
	}
	f0(x) {
		const ns = _.range(1, this.vars.N + 1, 2);
		const res = _.reduce(ns, (sum, n) => {
			let i = 0;
			if (n > 1) {
				i = (n - 1) / 2;
			}
			return (Math.pow(-1,i) * Math.pow(n, -2)) * Math.sin(x * n) + sum;
		}, 0);
		return res;
	}
}

export class PulseWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.plsAmplitude),
		period = new Constant(defaults.plsPeriod),
		phaseShift = new Constant(defaults.plsPhaseShift),
		verticalShift = new Constant(defaults.plsVerticalShift),
		ratio = new Constant(defaults.plsRatio)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,ratio});
	}
	f(x) {
		let c = this.vars.ratio * (2 * Math.PI);
		return this.f0(x) - this.f0(x + c);
	}
	f0(x) {
		let c = this.vars.phaseShift * (2 * Math.PI);
		let v1 = ( -2 * this.vars.amplitude / Math.PI );
		let v2 = ((x + c) * Math.PI) / this.vars.period;
		return v1 * Math.atan(cotangent(v2)) + this.vars.verticalShift;
	}
}

export class PulseFourierWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.plsAmplitude),
		period = new Constant(defaults.plsPeriod),
		phaseShift = new Constant(defaults.plsPhaseShift),
		verticalShift = new Constant(defaults.plsVerticalShift),
		N = new Constant(defaults.plsN),
		ratio = new Constant(defaults.plsRatio)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,N,ratio});
	}
	f0(x) {
		let c = this.vars.ratio *(2 * Math.PI);
		return this.f1(x) - this.f1(x + c);
	}
	f1(x) {
		const series = _.range(1, this.vars.N + 1, 1);
		const res = _.reduce(series, (sum, n) => {
			return (Math.sin(n * x) / n) + sum;
		}, 0);
		return res;
	}
}

export class SimplexWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.simAmplitude),
		period = new Constant(defaults.simPeriod),
		phaseShift = new Constant(defaults.simPhaseShift),
		verticalShift = new Constant(defaults.simVerticalShift),
		y = new Constant(defaults.simY)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,y});
		this.simplex = new SimplexNoise();
	}
	f0(x) {
		return this.simplex.noise2D(x, this.vars.y);
	}
}

export class SimplexSignWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.simAmplitude),
		period = new Constant(defaults.simPeriod),
		phaseShift = new Constant(defaults.simPhaseShift),
		verticalShift = new Constant(defaults.simVerticalShift),
		y = new Constant(defaults.simY),
		threshold = new Constant(defaults.signSimThreshold)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,y,threshold});
		this.simplex = new SimplexNoise();
	}
	f0(x) {
		return Math.sign(this.simplex.noise2D(x, this.vars.y) + this.vars.threshold);
	}
}

export class DampedSineWave extends Wave {
	constructor({
	amplitude = new Constant(defaults.dmpSineAmplitude),
	period = new Constant(defaults.dmpSinePeriod),
	phaseShift = new Constant(defaults.dmpSinePhaseShift),
	verticalShift = new Constant(defaults.dmpSineVerticalShift),
	decay = new Constant(defaults.dmpSineDecay),
} = {}) {
	super({amplitude, period, phaseShift, verticalShift, decay});
	}
	f(x) {
		let b = (2*Math.PI) / this.vars.period;
		let c = this.vars.phaseShift * (2 * Math.PI)
		let eVal = this.vars.amplitude * Math.pow(Math.E,(-1 * this.vars.decay * x));
		let cosVal = (Math.cos((b * x) + c));
		return (eVal * cosVal) + this.vars.verticalShift;
	}
	ease(t) {
		let b = 1/ this.vars.period;
		let c = this.vars.phaseShift;
		let eVal = this.vars.amplitude * Math.pow(Math.E,(-1 * this.vars.decay * t));
		let cosVal = (Math.cos((b * t) + c));
		return (eVal * cosVal) + (this.vars.verticalShift + .5);
	}
}
	// f0(x) {
	// 	let power = (-1 * x) / Math.PI * 2;
	// 	console.log(power);
	// 	return Math.pow(Math.e, power) * Math.cos(x);
	// }





export class EaseLinearWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeLinearAmplitude),
		period = new Constant(defaults.easeLinearPeriod),
		phaseShift = new Constant(defaults.easeLinearPhaseShift),
		verticalShift = new Constant(defaults.easeLinearVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeLinear(t); 
	}
}
export class EasePolyInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easePolyInAmplitude),
		period = new Constant(defaults.easePolyInPeriod),
		phaseShift = new Constant(defaults.easePolyInPhaseShift),
		verticalShift = new Constant(defaults.easePolyInVerticalShift),
		exponent = new Constant(defaults.easePolyInExponent)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,exponent});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easePolyIn.exponent(this.vars.exponent)(t); 
	}
}
export class EasePolyOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easePolyOutAmplitude),
		period = new Constant(defaults.easePolyOutPeriod),
		phaseShift = new Constant(defaults.easePolyOutPhaseShift),
		verticalShift = new Constant(defaults.easePolyOutVerticalShift),
		exponent = new Constant(defaults.easePolyOutExponent)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,exponent});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easePolyOut.exponent(this.vars.exponent)(t); 
	}
}
export class EasePolyInOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easePolyInOutAmplitude),
		period = new Constant(defaults.easePolyInOutPeriod),
		phaseShift = new Constant(defaults.easePolyInOutPhaseShift),
		verticalShift = new Constant(defaults.easePolyInOutVerticalShift),
		exponent = new Constant(defaults.easePolyInOutExponent)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,exponent});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easePolyInOut.exponent(this.vars.exponent)(t); 
	}
}
export class EaseSinInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeSinInAmplitude),
		period = new Constant(defaults.easeSinInPeriod),
		phaseShift = new Constant(defaults.easeSinInPhaseShift),
		verticalShift = new Constant(defaults.easeSinInVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeSinIn(t); 
	}
}
export class EaseSinOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeSinOutAmplitude),
		period = new Constant(defaults.easeSinOutPeriod),
		phaseShift = new Constant(defaults.easeSinOutPhaseShift),
		verticalShift = new Constant(defaults.easeSinOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		// t = t - Math.floor(t);
		return d3.easeSinOut(t); 
	}
}
export class EaseSinInOutWave extends Wave {
		constructor({
		amplitude = new Constant(defaults.easeSinInOutAmplitude),
		period = new Constant(defaults.easeSinInOutPeriod),
		phaseShift = new Constant(defaults.easeSinInOutPhaseShift),
		verticalShift = new Constant(defaults.easeSinInOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeSinInOut(t); 
	}
}
export class EaseExpInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeExpInAmplitude),
		period = new Constant(defaults.easeExpInPeriod),
		phaseShift = new Constant(defaults.easeExpInPhaseShift),
		verticalShift = new Constant(defaults.easeExpInVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeExpIn(t); 
	}
}
export class EaseExpOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeExpOutAmplitude),
		period = new Constant(defaults.easeExpOutPeriod),
		phaseShift = new Constant(defaults.easeExpOutPhaseShift),
		verticalShift = new Constant(defaults.easeExpOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeExpOut(t); 
	}
}
export class EaseExpInOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeExpInOutAmplitude),
		period = new Constant(defaults.easeExpInOutPeriod),
		phaseShift = new Constant(defaults.easeExpInOutPhaseShift),
		verticalShift = new Constant(defaults.easeExpInOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeExpInOut(t); 
	}
}
export class EaseCircleInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeCircleInAmplitude),
		period = new Constant(defaults.easeCircleInPeriod),
		phaseShift = new Constant(defaults.easeCircleInPhaseShift),
		verticalShift = new Constant(defaults.easeCircleInVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeCircleIn(t); 
	}
}
export class EaseCircleOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeCircleOutAmplitude),
		period = new Constant(defaults.easeCircleOutPeriod),
		phaseShift = new Constant(defaults.easeCircleOutPhaseShift),
		verticalShift = new Constant(defaults.easeCircleOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeCircleOut(t); 
	}
}
export class EaseCircleInOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeCircleInOutAmplitude),
		period = new Constant(defaults.easeCircleInOutPeriod),
		phaseShift = new Constant(defaults.easeCircleInOutPhaseShift),
		verticalShift = new Constant(defaults.easeCircleInOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeCircleInOut(t); 
	}
}
export class EaseBounceInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeBounceInAmplitude),
		period = new Constant(defaults.easeBounceInPeriod),
		phaseShift = new Constant(defaults.easeBounceInPhaseShift),
		verticalShift = new Constant(defaults.easeBounceInVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeBounceIn(t); 
	}
}
export class EaseBounceOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeBounceOutAmplitude),
		period = new Constant(defaults.easeBounceOutPeriod),
		phaseShift = new Constant(defaults.easeBounceOutPhaseShift),
		verticalShift = new Constant(defaults.easeBounceOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeBounceOut(t); 
	}
}
export class EaseBounceInOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeBounceInOutAmplitude),
		period = new Constant(defaults.easeBounceInOutPeriod),
		phaseShift = new Constant(defaults.easeBounceInOutPhaseShift),
		verticalShift = new Constant(defaults.easeBounceInOutVerticalShift),
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeBounceInOut(t); 
	}
}
export class EaseBackInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeBackInAmplitude),
		period = new Constant(defaults.easeBackInPeriod),
		phaseShift = new Constant(defaults.easeBackInPhaseShift),
		verticalShift = new Constant(defaults.easeBackInVerticalShift),
		overshoot = new Constant(defaults.easeBackInOvershoot)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,overshoot});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeBackIn.overshoot(this.vars.overshoot)(t); 
	}
}
export class EaseBackOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeBackOutAmplitude),
		period = new Constant(defaults.easeBackOutPeriod),
		phaseShift = new Constant(defaults.easeBackOutPhaseShift),
		verticalShift = new Constant(defaults.easeBackOutVerticalShift),
		overshoot = new Constant(defaults.easeBackOutOvershoot)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,overshoot});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeBackOut.overshoot(this.vars.overshoot)(t); 
	}
}
export class EaseBackInOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeBackInOutAmplitude),
		period = new Constant(defaults.easeBackInOutPeriod),
		phaseShift = new Constant(defaults.easeBackInOutPhaseShift),
		verticalShift = new Constant(defaults.easeBackInOutVerticalShift),
		overshoot = new Constant(defaults.easeBackInOutOvershoot)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,overshoot});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeBackInOut.overshoot(this.vars.overshoot)(t); 
	}
}
export class EaseElasticInWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeElasticInAmplitude),
		period = new Constant(defaults.easeElasticInPeriod),
		phaseShift = new Constant(defaults.easeElasticInPhaseShift),
		verticalShift = new Constant(defaults.easeElasticInVerticalShift),
		innerAmplitude = new Constant(defaults.easeElasticInInnerAmplitude), 
		innerPeriod = new Constant(defaults.easeElasticInInnerPeriod)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,amplitude,innerPeriod});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeElasticIn.amplitude(this.vars.innerAmplitude).period(this.vars.innerPeriod)(t); 
	}
}
export class EaseElasticOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeElasticOutAmplitude),
		period = new Constant(defaults.easeElasticOutPeriod),
		phaseShift = new Constant(defaults.easeElasticOutPhaseShift),
		verticalShift = new Constant(defaults.easeElasticOutVerticalShift),
		innerAmplitude = new Constant(defaults.easeElasticOytInnerAmplitude), 
		innerPeriod = new Constant(defaults.easeElasticOutInnerPeriod)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,innerAmplitude, innerPeriod});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeElasticOut.amplitude(this.vars.innerAmplitude).period(this.vars.innerPeriod)(t); 
	}
}
export class EaseElasticInOutWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeElasticInOutAmplitude),
		period = new Constant(defaults.easeElasticInOutPeriod),
		phaseShift = new Constant(defaults.easeElasticInOutPhaseShift),
		verticalShift = new Constant(defaults.easeElasticInOutVerticalShift),
		innerAmplitude = new Constant(defaults.easeElasticInInnerAmplitude), 
		innerPeriod = new Constant(defaults.easeElasticInInnerPeriod)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,innerAmplitude, innerPeriod});
	}
	f0(t) {
		t = t - Math.floor(t);
		return d3.easeElasticInOut.amplitude(this.vars.innerAmplitude).period(this.vars.innerPeriod)(t); 
	}
}

export class EaseStepWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeStepAmplitude),
		period = new Constant(defaults.easeStepPeriod),
		phaseShift = new Constant(defaults.easeStepPhaseShift),
		verticalShift = new Constant(defaults.easeStepVerticalShift),
		N = new Constant(defaults.easeStepN),
		stepIncline = new Constant(defaults.easeStepStepIncline)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift,N, stepIncline});
	}
	f0(t) {
		t = t - Math.floor(t);
		const intervalLength = 1.0 / this.vars.N; 
		const steps = _.range(0.0, 1.0, intervalLength);
		steps.push(1.0);
		const lower = _.reduce(steps, (closest, step) => {
			let diff = t - step;
			if ((diff < closest.diff) && diff >= 0) {
				closest = {diff, step};
			} 
			return closest;
		},{step: 2, diff: 2}).step;
		const fraction = (t - lower)/intervalLength;
		let incline =  lower + (fraction * intervalLength * this.vars.stepIncline);
		return incline;
	}
}

export class EaseNoneWave extends Wave {
	constructor({
		amplitude = new Constant(defaults.easeNoneAmplitude),
		period = new Constant(defaults.easeNonePeriod),
		phaseShift = new Constant(defaults.easeNonePhaseShift),
		verticalShift = new Constant(defaults.easeNoneVerticalShift)
	} = {}) {
		super({amplitude,period,phaseShift,verticalShift});
	}
	f0(t) {
		return 1;
	}
}

export let waves = {
	SineWave: () => new SineWave(), 
	SquareWave: () => new SquareWave(),
	TriangleWave: () => new TriangleWave(),
	SawtoothWave: () => new SawtoothWave(),
	PulseWave: () => new PulseWave(),
	SimplexWave: () => new SimplexWave(),
	SimplexSignWave: () => new SimplexSignWave(),
	SquareFourierWave: () => new SquareFourierWave(),
	TriangleFourierWave: () => new TriangleFourierWave(),
	SawtoothFourierWave: () => new SawtoothFourierWave(),
	PulseFourierWave: () => new PulseFourierWave(),
	DampedSineWave: () => new DampedSineWave(),
	EaseNoneWave: () => new EaseNoneWave(),
	EaseLinearWave: () => new EaseLinearWave() ,
	EasePolyInWave: () => new EasePolyInWave(),
	EasePolyOutWave: () => new EasePolyOutWave(),
	EasePolyInOutWave: () => new EasePolyInOutWave(),
	EaseSinInWave: () => new EaseSinInWave(),
	EaseSinOutWave: () => new EaseSinOutWave(),
	EaseSinInOutWave: () => new EaseSinInOutWave(),
	EaseExpInWave: () => new EaseExpInWave(),
	EaseExpOutWave: () => new EaseExpOutWave(),
	EaseExpInOutWave: () => new EaseExpInOutWave(),
	EaseCircleInWave: () => new EaseCircleInWave(),
	EaseCircleOutWave: () => new EaseCircleOutWave(),
	EaseCircleInOutWave: () => new EaseCircleInOutWave(),
	EaseBounceInWave: () => new EaseBounceInWave(),
	EaseBounceOutWave: () => new EaseBounceOutWave(),
	EaseBounceInOutWave: () => new EaseBounceInOutWave(),
	EaseBackInWave: () => new EaseBackInWave(),
	EaseBackOutWave: () => new EaseBackOutWave(),
	EaseBackInOutWave: () => new EaseBackInOutWave(),
	EaseElasticInWave: () => new EaseElasticInWave(),
	EaseElasticOutWave: () => new EaseElasticOutWave(),
	EaseElasticInOutWave: () => new EaseElasticInOutWave(),
	EaseStepWave: () => new EaseStepWave(),
};