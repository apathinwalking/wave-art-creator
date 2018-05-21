import {Constant} from './constants.js';
import {defaults} from './defaults.js';
import {waves} from './waves.js';
import {orderTypes} from './order.js';
import {bandShadowTypes} from './band-shadow.js';
import {Bounds} from './bounds.js';
import {colorThemes} from './colors.js';

export class Design {
	constructor(parentElement, {
		designID = 'design',
		nBands = new Constant(defaults.nBands),
		initialBandHeight = new Constant(defaults.initialBandHeight),
		initialGapHeight = new Constant(defaults.initialGapHeight),
		domainXInc = new Constant(defaults.domainXInc),
		domainBounds = new Bounds({
			x0: new Constant(defaults.domainX0),
			x1: new Constant(defaults.domainX1),
			y0: new Constant(defaults.domainY0),
			y1: new Constant(defaults.domainY1)
		}),
		rangeBounds = new Bounds({
			x0: new Constant(defaults.rangeX0),
			x1: new Constant(defaults.rangeX1),
			y0: new Constant(defaults.rangeY0),
			y1: new Constant(defaults.rangeY1)
		}),
		designBounds = new Bounds({
			x0: new Constant(defaults.designX0),
			x1: new Constant(defaults.designX1),
			y0: new Constant(defaults.designY0),
			y1: new Constant(defaults.designY1)
		}),
		alphaType = defaults.alphaType,
		alpha = waves[defaults.alphaType](),
		omegaType = defaults.omegaType,
		omega = waves[defaults.omegaType](),
		transDuration = new Constant(defaults.transDuration),
		delayDuration = new Constant(defaults.delayDuration),
		transEase = waves[defaults.transEaseType](),
		transEaseType = defaults.transEaseType,
		delayOrder = orderTypes[defaults.delayOrder],
		delayEase = waves[defaults.delayEaseType](),
		delayEaseType = defaults.delayEaseType,
		bandShadow = bandShadowTypes[defaults.bandShadow],
		bandEaseType = defaults.bandEaseType,
		bandEase = waves[defaults.bandEaseType](),
		gapEaseType = defaults.gapEaseType,
		gapEase = waves[defaults.gapEaseType](),
		colorThemeType = defaults.colorThemeType,
		colorTheme = colorThemes[defaults.colorThemeType]
	} = {}) {
		this.constants = {};
		this.vars = {};
		_.assign(this, {parentElement, designID, colorThemeType, colorTheme, domainBounds, rangeBounds, designBounds, alpha, omega, transEase, delayOrder, delayEase, bandShadow, alphaType, omegaType, transEaseType, delayEaseType, bandEaseType, bandEase, gapEaseType, gapEase});
		_.assign(this.constants, {nBands, initialBandHeight, initialGapHeight, domainXInc, transDuration, delayDuration});
		_.forIn(this.constants, (constant, key) => {
			this.vars[key] = constant.val;
		});
		this.initializeSvg();
		this.initialize();
		this.setData();
		this.update();
	}
	initializeSvg() {
		this.svg = this.parentElement
			.append('svg')
			.attr('id', this.designID)
	}
	initialize() {
		this.svg.style('width', this.designBounds.vars.x1 + 'px')
			.style('height', this.designBounds.vars.y1 + 'px');
		
		this.clip = this.svg.append('defs')
			.append('clipPath')
			.attr('id', 'clip-path')
			.attr('clipPathUnits', 'userSpaceOnUse')
			.attr('transform', 'translate(' + -1 * this.designBounds.vars.x0 + ', ' + -1 * this.designBounds.vars.y0 + ')')
			.append('rect')
			.attr('x', this.designBounds.vars.x0)
			.attr('y', this.designBounds.vars.y0)
			.attr('width', this.designBounds.width())
			.attr('height', this.designBounds.height());

		this.bg = this.svg
			.append('rect')
			.attr('class', 'pattern-bg band-shadow')
			.style('fill', () => {
				return this.colorTheme.colors[this.colorTheme.shadows[0]];
			})
			.attr('x', this.designBounds.vars.x0)
			.attr('y', this.designBounds.vars.y0)
			.attr('width', this.designBounds.width())
			.attr('height', this.designBounds.height())
		
		this.xScale = d3.scaleLinear()
			.domain([this.domainBounds.vars.x0, this.domainBounds.vars.x1])
			.range([this.rangeBounds.vars.x0, this.rangeBounds.vars.x1]);
		
		this.yScale = d3.scaleLinear()
			.domain([this.domainBounds.vars.y0, this.domainBounds.vars.y1])
			.range([this.rangeBounds.vars.y0, this.rangeBounds.vars.y1]);
		
		this.bandGen = d3.area()
			.x(d => this.xScale(d.x))
			.y0(d => this.yScale(d.y0))
			.y1(d => this.yScale(d.y1));
	}
	delta(x, factor) {
		let ax = this.alpha.f(x);
		let ox = this.omega.f(x);
		let diff = ox - ax;
		return (ax + (diff * factor));
	}
	getPatternHeight() {
		let normBandHeights = _.map(_.range(0, this.vars.nBands), i => {
			return i / this.vars.nBands;
		});
		let normGapHeights = _.map(_.range(0, this.vars.nBands-1), i => {
			return i / (this.vars.nBands - 1);
		});
		let totalBandHeight = _.reduce(normBandHeights, (sum, h) => {
			return sum + (this.bandEase.ease(h) * this.vars.initialBandHeight);
		},0);
		let totalGapHeight = _.reduce(normGapHeights, (sum, h) => {
			return sum + (this.gapEase.ease(h) * this.vars.initialGapHeight);
		},0);
		return totalBandHeight + totalGapHeight;
	}
	getGapHeight(index) {
		let t = (index / this.vars.nBands - 1);
		return this.gapEase.ease(t) * this.vars.initialGapHeight;
	}
	getBandHeight(index) {
		let t = (index / this.vars.nBands);
		return this.bandEase.ease(t) * this.vars.initialBandHeight;
	}
	delay(d, i) {
		if (this.delayOrder === 'all-at-once') {
			return this.vars.delayDuration;
		} else if (this.delayOrder === 'bottom-first') {
			i = this.data.length - i;
			if (this.bandShadow !== 'none') {
				i = Math.ceil(i/2);
			}
		} else if (this.delayOrder === 'i' ) {
			i = i;
			if (this.bandShadow !== 'none') {
				i = Math.floor(i/2);
			}
		} 
		let t = 0;
		if(this.bandShadow !== 'none') {
			t = i / (this.data.length * 2);
		} else {
			t = i / (this.data.length);	
		}
		return this.delayEase.ease(t) * this.vars.delayDuration;
	}
	setData() {
		// let patternHeight = (this.vars.nBands * this.vars.initialBandHeight) + ( (this.vars.nBands - 1) * this.vars.initialGapHeight);
		let patternHeight = this.getPatternHeight();
		
		let xVals = _.range(this.domainBounds.vars.x0, (this.domainBounds.vars.x1 + this.vars.domainXInc), this.vars.domainXInc);

		let bandIndexes = _.range(0, this.vars.nBands);

		let bandData = _.map(bandIndexes, (i) => {
			let yOff0 = 0;
			yOff0 = yOff0 + i*(this.getGapHeight(i) + this.getBandHeight(i));
			let yOff1 = yOff0 + this.getBandHeight(i);
			return _.map(xVals, x => {
				
				let y0 = yOff0;
				if (i === 0) {
					y0+= this.alpha.f(x);
				} else {
					let factor0 = yOff0 / patternHeight;
					y0+= this.delta(x, factor0);
				}
				
				let y1 = yOff1;
				if (i === (this.vars.nBands - 1)) {
					y1+= this.omega.f(x);
				} else {
					let factor1 = yOff1 / patternHeight;
					y1+= this.delta(x, factor1);
				}
				
				return {x, y0, y1};
			});	
		});

		this.data = [];
		let yLower = null;
		let yUpper = null;


		if (this.bandShadow !== 'none') {
			yLower = this.yScale.invert(this.designBounds.vars.y0);
			yUpper = this.yScale.invert(this.designBounds.vars.y1);
		}

		if (this.bandShadow === 'bottom-band-highest') {
			_.forEach(bandIndexes, bandIndex => {
				let shadowData = _.map(xVals, (x, xIndex) => {
					return{x, y0: bandData[bandIndex][xIndex].y0, y1: yUpper};
				});
				let bandLen = this.colorTheme.bands.length;
				let modIndex = bandIndex % bandLen;
				let colorIndex = this.colorTheme.bands[modIndex];
				let bandColor = this.colorTheme.colors[colorIndex];
				let shadowLen = this.colorTheme.shadows.length;
				modIndex = bandIndex % shadowLen;
				colorIndex = this.colorTheme.shadows[modIndex];
				let shadowColor = this.colorTheme.colors[colorIndex];
				this.data.push({class: 'pattern-part band-shadow', data: shadowData, color: shadowColor});
				this.data.push({class: 'pattern-part band', data: bandData[bandIndex], color: bandColor});
			});
		} else if (this.bandShadow === 'top-band-highest') {
			_.forEach(_.reverse(bandIndexes), bandIndex => {
				let shadowData = _.map(xVals, (x, xIndex) => {
					return{x, y1: bandData[bandIndex][xIndex].y1, y0: yLower};
				});
				let bandLen = this.colorTheme.bands.length;
				let modIndex = bandIndex % bandLen;
				let colorIndex = this.colorTheme.bands[modIndex];
				let bandColor = this.colorTheme.colors[colorIndex];
				let shadowLen = this.colorTheme.shadows.length;
				modIndex = bandIndex % shadowLen;
				colorIndex = this.colorTheme.shadows[modIndex];
				let shadowColor = this.colorTheme.colors[colorIndex];
				this.data.push({class: 'pattern-part band-shadow', data: shadowData, color: shadowColor});
				this.data.push({class: 'pattern-part band', data: bandData[bandIndex], color: bandColor});
			});
		} else {
			_.forEach(bandIndexes, bandIndex => {
				let bandLen = this.colorTheme.bands.length;
				let modIndex = bandIndex % bandLen;
				modIndex = (modIndex <= 1) ? 0 : modIndex -1;
				let colorIndex = this.colorTheme.bands[modIndex];
				let bandColor = this.colorTheme.colors[colorIndex];
				this.data.push({class: 'pattern-part band', data: bandData[bandIndex], color: bandColor});
			});
		}
	}
	update() {
		
		this.patternParts = this.svg.selectAll('.pattern-part')
			.data(this.data)
		
		this.patternParts
			.transition()
			.duration(this.vars.transDuration)
			.delay((d,i) => {
				return this.delay(d, i);
			})
			.ease(t => {
				return this.transEase.ease(t);
			})	
			.attr('d', d => this.bandGen(d.data))
			.style('fill', d => d.color);
		
		this.patternParts
			.enter().append('path')
			.attr('class', (d,i) => d.class)
			.attr('d', d => this.bandGen(d.data))
			.attr('transform', 'translate(' + this.designBounds.vars.x0 + ', ' + this.designBounds.vars.y0 + ')')
			.style('fill', d => d.color)
			.attr('clip-path', 'url(' + '#clip-path' + ')')

		this.patternParts
			.exit().remove();
		
	}
	destroy() {
		this.svg.selectAll('*')
			.data([]).exit().remove();
	}
	redraw() {
		this.destroy();
		this.initialize();
		this.setData();
		this.update();
	}
	next({setData = false, update = false, redraw = false} = {}) {
		if (setData) {
			this.setData();
		}
		if (update) {
			this.update();
		}
		if (redraw) {
			this.redraw();
		}
	}
}