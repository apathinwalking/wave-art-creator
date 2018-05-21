export class Constant {
	constructor({val=0,min=-1,max=1,step=.1,name='placeholder',jitter = .5} = {}){
		_.assign(this, {val, min, max, step, name, jitter});
		this.range = this.max - this.min;
		this.steps = _.range(this.min, this.max+this.step, this.step)
		this.normalMax = (this.max - this.min) / this.step;
		this.normalMin = 0;
		this.normalStep = 1;
		this.normalRange = this.normalMax - this.normalMin;
		this.normalSteps = _.range(this.normalMin, this.normalMax + this.normalStep, this.normalStep);	
	}
	getNormalVal(trueVal) {
		return ( ( (trueVal - this.min) * this.normalRange) / this.range) + this.normalMin; 
	}
	getTrueVal(normalVal) {
		return ( ( (normalVal - this.normalMin) * this.range) / this.normalRange) + this.min; 
	}
	getJitteredVal(trueVal) {
		let val = (trueVal) ? trueVal : this;
		let min = val - (this.jitter * this.range);
		let jitterMin = (min < this.min) ? this.min : min;
		let max = val + (this.jitter * this.range);
		let jitterMax = (max > this.max) ? this.max : max;
		let jitterRange = jitterMax - jitterMin;
		
		let rand = Math.random();
		let result = (rand * jitterRange) + jitterMin;
		return result;
	}
}