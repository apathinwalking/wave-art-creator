import {Design} from './design.js';
import {waves} from './waves.js';
import {orderTypes} from './order.js';
import {bandShadowTypes} from './band-shadow.js';
import {colorThemes} from './colors.js';

export class ArtGenerator {
    constructor({
	parentID = 'artgen',
	designID = 'design',
    guiID = 'gui',
    data = {},
    } = {}) {
        _.assign(this, {parentID, designID, guiID, data});
		this.initialize();
    }
	initialize() {
        var self = this;
		
		this.parentElement = d3.select('body').append('div').attr('id', this.parentID )
		this.designWrapElement = this.parentElement.append('div').attr('id', this.designID + '-wrap')
		this.design = new Design(this.designWrapElement);
		this.gui = new dat.GUI();
		this.gui.width = 500;
		
		this.controllers = [];
		this.folders = {};
		
		this.folders.alpha = this.gui.addFolder('α-wave');
		this.folders.omega = this.gui.addFolder('ω-wave');
		this.folders.bands = this.gui.addFolder('Bands');
		this.folders.gaps = this.gui.addFolder('Gaps');
		this.folders.trans = this.gui.addFolder('Transition');
		this.folders.delay = this.gui.addFolder('Delay');
		this.folders.style = this.gui.addFolder('Style');
		this.folders.domain = this.gui.addFolder('Domain');
		this.folders.range = this.gui.addFolder('Range');
		this.folders.design = this.gui.addFolder('Design');
		
		let alphaWaveSelector = this.folders.alpha.add(this.design, 'alphaType', _.keys(waves)).onChange((selected) => {
				this.design.alpha = waves[selected]();
				this.design.next({setData: true, update: true});
				this.generateAlphaVarControllers();
			});
		this.controllers.push({controller: alphaWaveSelector, name: 'alphaType', key: 'alpha-wave'});
		
		let omegaWaveSelector = this.folders.omega.add(this.design, 'omegaType', _.keys(waves)).onChange((selected) => {
				this.design.omega = waves[selected]();
				this.design.next({setData: true, update: true});
				this.generateOmegaVarControllers();
			})
		this.controllers.push({controller: omegaWaveSelector, name: 'omegaType', key: 'omega-wave'});
		
		let bandEaseSelector = this.folders.bands.add(this.design, 'bandEaseType', _.keys(waves)).onChange((selected) => {
				this.design.bandEase = waves[selected]();
				this.design.next({setData: true, update: true});
				this.generateBandEaseVarControllers();
			});
		this.controllers.push({controller: bandEaseSelector, name: 'bandEaseType', key: 'band-ease-type'});
		
		let gapEaseSelector = this.folders.gaps.add(this.design, 'gapEaseType', _.keys(waves)).onChange((selected) => {
				this.design.gapEase = waves[selected]();
				this.design.next({setData: true, update: true});
				this.generateGapEaseVarControllers();
			});
		this.controllers.push({controller: gapEaseSelector, name: 'gapEaseType', key: 'gap-ease-type'});
		
		let transEaseSelector = this.folders.trans.add(this.design, 'transEaseType', _.keys(waves)).onChange((selected) => {
			this.design.transEase = waves[selected]();
			this.design.next();
			this.generateTransEaseVarControllers();
		});
		
		this.controllers.push({controller: transEaseSelector, name: 'trans-ease-type', key: 'trans-ease'});
		let delayEaseSelector = this.folders.delay.add(this.design, 'delayEaseType', _.keys(waves)).onChange((selected) => {
			this.design.delayEase = waves[selected]();
			this.design.next();
			this.generateDelayEaseVarControllers();
		});
		this.controllers.push({controller: transEaseSelector, name: 'delay-ease-type', key: 'delay-ease'});
		let delayOrderSelector = this.folders.delay.add(this.design, 'delayOrder',_.keys(orderTypes)).onChange(selected => {
			this.design.delayOrder = orderTypes[selected];
			this.design.next();
		});
		this.controllers.push({controller: delayOrderSelector, name: 'delay-order', key: 'delay-order'});
		let bandShadowTypeSelector = this.folders.style.add(this.design, 'bandShadow', _.keys(bandShadowTypes)).onChange(selected => {
			this.design.bandShadow = bandShadowTypes[selected];
			this.design.next({redraw: true});
		});

		let colorThemeTypeSelector = this.folders.style.add(this.design, 'colorThemeType', _.keys(colorThemes)).onChange(selected => {
			this.design.colorTheme = colorThemes[selected];
			this.design.next({redraw: true});
		});

		this.generateAlphaVarControllers();
		this.generateOmegaVarControllers();
		
		
		this.generateTransEaseVarControllers();
		this.generateDelayEaseVarControllers();
		
		let controller = {name: 'nBands', key:'nBands', folder: 'bands'};
		controller.controller = this.folders.bands.add(this.design.vars, 'nBands')
			.min(this.design.constants.nBands.min).max(this.design.constants.nBands.max).step(this.design.constants.nBands.step)
			.onChange(() => {
				  this.design.next({setData: true, update: true});
			});
		this.controllers.push(controller);
		
		controller = {name: 'initialBandHeight', key:'initialBandHeight', folder: 'bands'};
		controller.controller = this.folders.bands.add(this.design.vars, 'initialBandHeight')
			.min(this.design.constants.initialBandHeight.min).max(this.design.constants.initialBandHeight.max).step(this.design.constants.initialBandHeight.step)
			.onChange(() => {
				  this.design.next({setData: true, update: true});
			});
		this.controllers.push(controller);
		
		this.generateBandEaseVarControllers();
		
		controller = {name: 'initialGapHeight', key:'initialGapHeight', folder: 'gaps'};
		controller.controller = this.folders.gaps.add(this.design.vars, 'initialGapHeight')
			.min(this.design.constants.initialGapHeight.min).max(this.design.constants.initialGapHeight.max).step(this.design.constants.initialGapHeight.step)
			.onChange(() => {
				  this.design.next({setData: true, update: true});
			});
		this.controllers.push(controller);
		
		this.generateGapEaseVarControllers();
		
		controller = {name: 'transDuration', key:'transDuration', folder: 'trans'};
		controller.controller = this.folders.trans.add(this.design.vars, 'transDuration')
			.min(this.design.constants.transDuration.min).max(this.design.constants.transDuration.max).step(this.design.constants.transDuration.step)
			.onChange(() => {
				  this.design.next();
			});
		this.controllers.push(controller);
		
		controller = {name: 'delayDuration', key:'delayDuration', folder: 'delay'};
		controller.controller = this.folders.delay.add(this.design.vars, 'delayDuration')
			.min(this.design.constants.delayDuration.min).max(this.design.constants.delayDuration.max).step(this.design.constants.delayDuration.step)
			.onChange(() => {
				  this.design.next();
			});
		this.controllers.push(controller);
		
		controller = {name: 'x0', key:'domainBoundsx0', folder: 'domain'};
		controller.controller = this.folders.domain.add(this.design.domainBounds.vars, 'x0')
			.min(this.design.domainBounds.constants.x0.min).max(this.design.domainBounds.constants.x0.max).step(this.design.domainBounds.constants.x0.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'x1', key:'domainBoundsx1', folder: 'domain'};
		controller.controller = this.folders.domain.add(this.design.domainBounds.vars, 'x1')
			.min(this.design.domainBounds.constants.x1.min).max(this.design.domainBounds.constants.x1.max).step(this.design.domainBounds.constants.x1.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'y0', key:'domainBoundsy0', folder: 'domain'};
		controller.controller = this.folders.domain.add(this.design.domainBounds.vars, 'y0')
			.min(this.design.domainBounds.constants.y0.min).max(this.design.domainBounds.constants.y0.max).step(this.design.domainBounds.constants.y0.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'y1', key:'domainBoundsy1', folder: 'domain'};
		controller.controller = this.folders.domain.add(this.design.domainBounds.vars, 'y1')
			.min(this.design.domainBounds.constants.y1.min).max(this.design.domainBounds.constants.y1.max).step(this.design.domainBounds.constants.y1.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);
		
		controller = {name: 'domainXInc', key:'domainXInc', folder: 'domain'};
		controller.controller = this.folders.domain.add(this.design.vars, 'domainXInc')
			.min(this.design.constants.domainXInc.min).max(this.design.constants.domainXInc.max).step(this.design.constants.domainXInc.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);
		
				controller = {name: 'x0', key:'rangeBoundsx0', folder: 'rangeBounds'};
		controller.controller = this.folders.range.add(this.design.rangeBounds.vars, 'x0')
			.min(this.design.rangeBounds.constants.x0.min).max(this.design.rangeBounds.constants.x0.max).step(this.design.rangeBounds.constants.x0.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'x1', key:'rangeBoundsx1', folder: 'rangeBounds'};
		controller.controller = this.folders.range.add(this.design.rangeBounds.vars, 'x1')
			.min(this.design.rangeBounds.constants.x1.min).max(this.design.rangeBounds.constants.x1.max).step(this.design.rangeBounds.constants.x1.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'y0', key:'rangeBoundsy0', folder: 'rangeBounds'};
		controller.controller = this.folders.range.add(this.design.rangeBounds.vars, 'y0')
			.min(this.design.rangeBounds.constants.y0.min).max(this.design.rangeBounds.constants.y0.max).step(this.design.rangeBounds.constants.y0.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'y1', key:'rangeBoundsy1', folder: 'rangeBounds'};
		controller.controller = this.folders.range.add(this.design.rangeBounds.vars, 'y1')
			.min(this.design.rangeBounds.constants.y1.min).max(this.design.rangeBounds.constants.y1.max).step(this.design.rangeBounds.constants.y1.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);
		
				controller = {name: 'x0', key:'designx0', folder: 'design'};
		controller.controller = this.folders.design.add(this.design.designBounds.vars, 'x0')
			.min(this.design.designBounds.constants.x0.min).max(this.design.designBounds.constants.x0.max).step(this.design.designBounds.constants.x0.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'x1', key:'designx1', folder: 'design'};
		controller.controller = this.folders.design.add(this.design.designBounds.vars, 'x1')
			.min(this.design.designBounds.constants.x1.min).max(this.design.designBounds.constants.x1.max).step(this.design.designBounds.constants.x1.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'y0', key:'designy0', folder: 'design'};
		controller.controller = this.folders.design.add(this.design.designBounds.vars, 'y0')
			.min(this.design.designBounds.constants.y0.min).max(this.design.designBounds.constants.y0.max).step(this.design.designBounds.constants.y0.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);

		controller = {name: 'y1', key:'designy1', folder: 'design'};
		controller.controller = this.folders.design.add(this.design.designBounds.vars, 'y1')
			.min(this.design.designBounds.constants.y1.min).max(this.design.designBounds.constants.y1.max).step(this.design.designBounds.constants.y1.step)
			.onChange(() => {
				  this.design.next({redraw:true});
			});
		this.controllers.push(controller);
		
		this.folders.alpha.open();
		this.folders.omega.open();
		
    }
	generateAlphaVarControllers() {
		let toRemove = _.remove(this.controllers, {key: 'alpha-vars'});
		_.forEach(toRemove, r => r.controller.remove());
		_.forIn(this.design.alpha.constants, (val,key) => {
			let controller = {name: key, key:'alpha-vars', folder: 'alpha'};
			controller.controller = this.folders.alpha.add(this.design.alpha.vars, key)
				.min(val.min).max(val.max).step(val.step)
				.onChange(() => {
					this.design.next({setData: true, update: true});
				});
			this.controllers.push(controller);
		});
	}
	generateOmegaVarControllers() {
		let toRemove = _.remove(this.controllers, {key: 'omega-vars'});
		_.forEach(toRemove, r => r.controller.remove());
		_.forIn(this.design.omega.constants, (val,key) => {
			let controller = {name: key, key:'omega-vars', folder: 'omega'};
			controller.controller = this.folders.omega.add(this.design.omega.vars, key)
				.min(val.min).max(val.max).step(val.step)
				.onChange(() => {
					  this.design.next({setData: true, update: true});
				});
			this.controllers.push(controller);
		});
	}
	generateTransEaseVarControllers() {
		let toRemove = _.remove(this.controllers, {key: 'trans-ease-vars'});
		_.forEach(toRemove, r => r.controller.remove());
		_.forIn(this.design.transEase.constants, (val,key) => {
			let controller = {name: key, key:'trans-ease-vars', folder: 'trans'};
			controller.controller = this.folders.trans.add(this.design.transEase.vars, key)
				.min(val.min).max(val.max).step(val.step)
				.onChange(() => {
					  this.design.next();
				});
			this.controllers.push(controller);
		});
	}
	generateDelayEaseVarControllers() {
		let toRemove = _.remove(this.controllers, {key: 'delay-ease-vars'});
		_.forEach(toRemove, r => r.controller.remove());
		_.forIn(this.design.delayEase.constants, (val,key) => {
			let controller = {name: key, key:'delay-ease-vars', folder: 'delay'};
			controller.controller = this.folders.delay.add(this.design.delayEase.vars, key)
				.min(val.min).max(val.max).step(val.step)
				.onChange(() => {
					  this.design.next();
				});
			this.controllers.push(controller);
		});
	}
	generateBandEaseVarControllers() {
		let toRemove = _.remove(this.controllers, {key: 'band-ease-vars'});
		_.forEach(toRemove, r => r.controller.remove());
		_.forIn(this.design.bandEase.constants, (val,key) => {
			let controller = {name: key, key:'band-ease-vars', folder: 'bands'};
			controller.controller = this.folders.bands.add(this.design.bandEase.vars, key)
				.min(val.min).max(val.max).step(val.step)
				.onChange(() => {
					  this.design.next({setData: true, update: true});
				});
			this.controllers.push(controller);
		});
	}
	generateGapEaseVarControllers() {
		let toRemove = _.remove(this.controllers, {key: 'gap-ease-vars'});
		_.forEach(toRemove, r => r.controller.remove());
		_.forIn(this.design.gapEase.constants, (val,key) => {
			let controller = {name: key, key:'gap-ease-vars', folder: 'bands'};
			controller.controller = this.folders.gaps.add(this.design.gapEase.vars, key)
				.min(val.min).max(val.max).step(val.step)
				.onChange(() => {
					  this.design.next({setData: true, update: true});
				});
			this.controllers.push(controller);
		});
	}
}