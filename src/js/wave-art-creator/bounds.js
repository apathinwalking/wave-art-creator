export class Bounds {
	constructor({
		x0 = new Constant({val: 0, min: -10, max: 10, nSteps: 100}),
		x1 = new Constant({val: 1, min: -10, max: 10, nSteps: 100}),
		y0 = new Constant({val: 0, min: -10, max: 10, nSteps: 100}),
		y1 = new Constant({val: 1, min: -10, max: 10, nSteps: 100})
	} = {}) {
		this.constants = {};
		this.vars = {};
		_.assign(this.constants, {x0, x1, y0, y1});
		_.forIn(this.constants, (constant, key) => {
			this.vars[key] = constant.val;
		});
	}
	width() {
		return this.vars.x1 - this.vars.x0;
	}
	height() {
		return this.vars.y1 - this.vars.y0;
	}
}