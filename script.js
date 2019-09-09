const PI = Math.PI; 
// user configs

let defaults = {
	amplitude: {val: .5, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	period: {val: .5, min: .005, max: 1.005, step: .005, name: 'Period', jitter: .5},
	phaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	verticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	sineAmplitude: {val: .5, min: -20, max: 20, step: .1, name: 'Amplitude', jitter: .8},
	sinePeriod: {val: .5, min: .005, max: 1, step: .005, name: 'Period', jitter: .5},
	sinePhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	sineVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	sqrAmplitude: {val: .5, min: -10, max: 10, step: .1, name: 'Amplitude', jitter: .8},
	sqrPeriod: {val: .5, min: .005, max: 1, step: .005, name: 'Period', jitter: .5},
	sqrPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	sqrVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	sqrN: {val: 21, min: 1, max: 1000, step: 1, name: 'N (Σ Upper Bound', jitter: .75},
	triAmplitude: {val: .5, min: -10, max: 10, step: .1, name: 'Amplitude', jitter: .8},
	triPeriod: {val: .5, min: .005, max: 1, step: .005, name: 'Period', jitter: .5},
	triPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	triVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	triN: {val: 21, min: 1, max: 1000, step: 1, name: 'N (Σ Upper Bound', jitter: .1},
	sawAmplitude: {val: .5, min: -10, max: 10, step: .1, name: 'Amplitude', jitter: .8},
	sawPeriod: {val: .5, min: .005, max: 1, step: .005, name: 'Period', jitter: .5},
	sawPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	sawVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	sawN: {val: 21, min: 1, max: 1000, step: 1, name: 'N (Σ Upper Bound', jitter: .1},
	simAmplitude: {val: .5, min: -20, max: 20, step: .1, name: 'Amplitude', jitter: .8},
	simPeriod: {val: .5, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	simPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	simVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	simY: {val: 500, min: 0, max: 10000, step: 100, name: 'y-Value', jitter: .8},
	signSimThreshold: {val: 0, min: -1, max: 1, step: .1, name: 'Threshold', jitter: .9},
	plsAmplitude: {val: .5, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	plsPeriod: {val: .5, min: .005, max: 1.005, step: .005, name: 'Period', jitter: .5},
	plsPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	plsVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	plsN: {val: 21, min: 1, max: 1000, step: 1, name: 'N (Σ Upper Bound', jitter: .1},
	plsRatio: {val: .25, min: -2, max: 2, step: .01, name: 'Ratio τ/T', jitter: .25},
	dmpSineAmplitude: {val: .5, min: -20, max: 20, step: .1, name: 'Amplitude', jitter: .8},
	dmpSinePeriod: {val: .125, min: .005, max: 1, step: .005, name: 'Period', jitter: .5},
	dmpSinePhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	dmpSineVerticalShift: {val: .5, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	dmpSineDecay: {val: 5, min: -20, max: 20, step: .1, name: 'Decay Constant', jitter: .5},
	
	easeNoneAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeNonePeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeNonePhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeNoneVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeLinearAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeLinearPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeLinearPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeLinearVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easePolyInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easePolyInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easePolyInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easePolyInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easePolyInExponent: {val: 3, min: 1, max: 10, step: 1, name: 'Polynomial Exponent', jitter: .75},
	easePolyOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easePolyOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easePolyOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easePolyOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easePolyOutExponent: {val: 3, min: 1, max: 10, step: 1, name: 'Polynomial Exponent', jitter: .75},
	easePolyInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easePolyInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easePolyInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easePolyInOutVerticalShift: {val: 1, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easePolyInOutExponent: {val: 3, min: 1, max: 10, step: 1, name: 'Polynomial Exponent', jitter: .75},
	easeSinInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeSinInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeSinInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeSinInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeSinOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeSinOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeSinOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeSinOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeSinInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeSinInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeSinInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeSinInOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeExpInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeExpInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeExpInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeExpInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeExpOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeExpOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeExpOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeExpOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeExpInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeExpInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeExpInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeExpInOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeCircleInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeCircleInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeCircleInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeCircleInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeCircleOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeCircleOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeCircleOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeCircleOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeCircleInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeCircleInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeCircleInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeCircleInOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBounceInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeBounceInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeBounceInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeBounceInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBounceOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeBounceOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeBounceOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeBounceOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBounceInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeBounceInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeBounceInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeBounceInOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBackInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeBackInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeBackInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeBackInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBackInOvershoot: {val: 1.7, min: 1, max: 10, step: .05, name: 'Back Overshoot', jitter: .75},
	easeBackOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeBackOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeBackOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeBackOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBackOutOvershoot: {val: 1.7, min: 1, max: 10, step: .05, name: 'Back Overshoot', jitter: .75},
	easeBackInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeBackInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeBackInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeBackInOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeBackInOutOvershoot: {val: 1.7, min: 1, max: 10, step: .05, name: 'Back Overshoot', jitter: .75},
	easeElasticInAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeElasticInPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeElasticInPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeElasticInVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeElasticInInnerAmplitude: {val: 1, min: 0, max: 5, step: .05, name: 'Elastic Amplitude', jitter: .75},
	easeElasticInInnerPeriod: {val: .3, min: 0, max: 5, step: .05, name: 'Elastic Period', jitter: .75},
	easeElasticOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeElasticOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeElasticOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeElasticOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeElasticOutInnerAmplitude: {val: 1, min: 0, max: 5, step: .05, name: 'Elastic Amplitude', jitter: .75},
	easeElasticOutInnerPeriod: {val: .3, min: 0, max: 5, step: .05, name: 'Elastic Period', jitter: .75},
	easeElasticInOutAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeElasticInOutPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeElasticInOutPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeElasticInOutVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeElasticInOutInnerAmplitude: {val: 1, min: 0, max: 5, step: .05, name: 'Elastic Amplitude', jitter: .75},
	easeElasticInOutInnerPeriod: {val: .3, min: 0, max: 5, step: .05, name: 'Elastic Period', jitter: .75},
	easeStepAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeStepPeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeStepPhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeStepVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},
	easeStepN: {val: 8, min: 1, max: 100, step: 1, name: 'Number of Intervals', jitter: .5},
	easeStepStepIncline: {val: 0, min: -1, max: 1, step: .05, name: 'Step Incline', jitter: .5},
	easeSpikeAmplitude: {val: 1, min: -4, max: 4, step: .1, name: 'Amplitude', jitter: .8},
	easeSpikePeriod: {val: 1, min: .005, max: 2, step: .005, name: 'Period', jitter: .5},
	easeSpikePhaseShift: {val: 0, min: -1, max: 1, step: .01, name: 'Phase-Shift (1=2π)', jitter: .5},
	easeSpikeVerticalShift: {val: 0, min: -10, max: 10, step: .1, name: 'Vertical-Shift', jitter: .5},

	alphaType: 'SimplexSignWave',
	omegaType: 'TriangleWave',

	nBands: {val: 17, min: 1, max: 100, step: 1, name: 'Number of Bands', jitter: .5},
	initialBandHeight: {val: .7, min: 0, max: 4.05, step: .05, name: 'Body Height', jitter: .5},
	initialGapHeight: {val: .4, min: .05, max: 4.05, step: .05, name: 'Gap Height', jitter: .5},
	bandEaseType: 'EaseNoneWave',
	gapEaseType: 'EaseNoneWave',

	domainXInc: {val: .003, min: .001, max: 1.00, step: .001, name: 'X-Increment', jitter: .05},
	domainX0: {val: 0, min: -8, max: 8, step: .1, name: 'Left', jitter: .25},
	domainX1: {val: 1, min: -8, max: 8, step: .1, name: 'Right', jitter: .25},
	domainY0: {val: 0, min: -4, max: 4, step: .1, name: 'Top', jitter: .25},
	domainY1: {val: 1, min: -4, max: 4, step: .1, name: 'Bottom', jitter: .25},
	
	rangeX0: {val: 0, min: -1920, max: 1920, step: 20, name: 'Left', jitter: .25},
	rangeX1: {val: 720, min: -1920, max: 1920, step: 20, name: 'Right', jitter: .25},
	rangeY0: {val: 0, min: -1080, max: 1080, step: 20, name: 'Top', jitter: .25},
	rangeY1: {val: 40, min: -1080, max: 1080, step: 20, name: 'Bottom', jitter: .25},
	
	designX0: {val: 0, min: 0, max: 1920, step: 20, name: 'Left', jitter: .25},
	designX1: {val: 720, min: 0, max: 1920, step: 20, name: 'Right', jitter: .25},
	designY0: {val: 0, min: 0, max: 1080, step: 20, name: 'Top', jitter: .25},
	designY1: {val: 720, min: 0, max: 1080, step: 20, name: 'Bottom', jitter: .25},
	
	transDuration: {val: 3000, min: 0, max: 10000, step: 50, name: 'Transition Duration', jitter: .75},
	transEaseType: 'EaseLinearWave',

	delayDuration: {val: 0, min: 0, max: 10000, step: 50, name: 'Transition Delay', jitter: .75},
	delayEaseType: 'EaseLinearWave',
	delayOrder: 'all-at-once',
	
	bandShadow: 'bottom-band-highest',
	colorThemeType: 'twoBitGrayScale',
	bandStrokeWidth: {val: .5, min: 0, max: 20, step:.05, name: 'Stroke Width', jitter: .75},
	bandStrokeOpacity: {val: .5, min: 0, max: 1, step: .01, name: 'Stroke Opacity', jitter: .75},
};

class Constant {
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

class Bounds {
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

const orderTypes = {
	'all-at-once':'all-at-once' ,
	'top-first':'top-first',
	'bottom-first':'bottom-first'
};

const bandShadowTypes = {
	'none': 'none',
	'top-band-highest': 'top-band-highest',
	'bottom-band-highest': 'bottom-band-highest'
};

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

class SineWave extends Wave {
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

class SquareWave extends Wave {
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

class SquareFourierWave extends Wave {
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

class SawtoothWave extends Wave {
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

class SawtoothFourierWave extends Wave {
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

class TriangleWave extends Wave {
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

class TriangleFourierWave extends Wave {
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

class PulseWave extends Wave {
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

class PulseFourierWave extends Wave {
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

class SimplexWave extends Wave {
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

class SimplexSignWave extends Wave {
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

class DampedSineWave extends Wave {
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





class EaseLinearWave extends Wave {
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
class EasePolyInWave extends Wave {
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
class EasePolyOutWave extends Wave {
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
class EasePolyInOutWave extends Wave {
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
class EaseSinInWave extends Wave {
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
class EaseSinOutWave extends Wave {
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
class EaseSinInOutWave extends Wave {
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
class EaseExpInWave extends Wave {
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
class EaseExpOutWave extends Wave {
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
class EaseExpInOutWave extends Wave {
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
class EaseCircleInWave extends Wave {
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
class EaseCircleOutWave extends Wave {
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
class EaseCircleInOutWave extends Wave {
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
class EaseBounceInWave extends Wave {
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
class EaseBounceOutWave extends Wave {
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
class EaseBounceInOutWave extends Wave {
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
class EaseBackInWave extends Wave {
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
class EaseBackOutWave extends Wave {
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
class EaseBackInOutWave extends Wave {
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
class EaseElasticInWave extends Wave {
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
class EaseElasticOutWave extends Wave {
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
class EaseElasticInOutWave extends Wave {
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

class EaseStepWave extends Wave {
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

class EaseSpikeWave extends Wave {
	constructor({
			amplitude = new Constant(defaults.easeSpikeAmplitude),
			period = new Constant(defaults.easeSpikePeriod),
			phaseShift = new Constant(defaults.easeSpikePhaseShift),
			verticalShift = new Constant(defaults.easeSpikeVerticalShift),
		} = {}) {
			super({amplitude,period,phaseShift,verticalShift});
		}
		f0(t) {
			t = t - Math.floor(t);
			if (t >= .5) {
				return (d3.easeSinIn(t / .5)-1);
			} else {
				return (d3.easeSinIn((1-t) /.5)-1);
			} 
		}
}

class EaseNoneWave extends Wave {
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

let waves = {
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
	EaseSpikeWave: () => new EaseSpikeWave(),
};

class Theme {
	constructor({colors = [], bands = [], shadows = []} = {}){
		_.assign(this, {colors, bands, shadows});
	}
}

const blackWhite = new Theme({
	colors: ["#000000","#ffffff"],
	bands: [0],
	shadows: [1]
});

// https://lospec.com/palette-list/2-bit-grayscale
const twoBitGrayScale = new Theme({
	colors: ["#000000","#676767","#b6b6b6","#ffffff"],
	bands: [0,2],
	shadows: [1,3]
});

// https://lospec.com/palette-list/cga-palette-1-high
const cgaPalette1 = new Theme({
	colors: ["#000000","#ff55ff","#55ffff","#ffffff"],
	bands: [0,3],
	shadows: [1,2]
});

// https://lospec.com/palette-list/fuzzyfour
const fuzzyFour = new Theme({
	colors: ["#302387","#ff3796","#00faac","#fffdaf"],
	bands: [0,3],
	shadows: [1,2]
});

// https://lospec.com/palette-list/kirokaze-gameboy
const kirokazeGB = new Theme({
	colors: ["#332c50","#46878f","#94e344","#e2f3e4"],
	bands: [0,2],
	shadows: [1,3]
});

// https://lospec.com/palette-list/blessing
const blessing = new Theme({
	colors: ["#74569b","#96fbc7","#f7ffae","#ffb3cb","#d8bfd8"],
	bands: [0,2,4,2,0],
	shadows: [1,3,1,3,1]
});

const en4 = new Theme({
	colors: ["#fbf7f3","#e5b083","#426e5d","#20283d"],
	bands: [0,2],
	shadows: [1,3]
});


let colorThemes = {
	blackWhite,
	twoBitGrayScale,
	cgaPalette1,
	fuzzyFour,
	kirokazeGB,
	blessing,
	en4
};

class Design {
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
		colorTheme = colorThemes[defaults.colorThemeType],
		bandStrokeWidth = new Constant(defaults.bandStrokeWidth),
		bandStrokeOpacity = new Constant(defaults.bandStrokeOpacity)
	} = {}) {
		this.constants = {};
		this.vars = {};
		_.assign(this, {parentElement, designID, colorThemeType, colorTheme, domainBounds, rangeBounds, designBounds, alpha, omega, transEase, delayOrder, delayEase, bandShadow, alphaType, omegaType, transEaseType, delayEaseType, bandEaseType, bandEase, gapEaseType, gapEase});
		_.assign(this.constants, {nBands, initialBandHeight, initialGapHeight, domainXInc, transDuration, delayDuration, bandStrokeWidth, bandStrokeOpacity});
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
			.style('fill', d => d.color)
			.attr('stroke', d => d.color)
			.attr('stroke-width', d => { return (d.class === 'pattern-part band') ? this.vars.bandStrokeWidth + 'px' : 0;})
			.attr('stroke-opacity', d => { return (d.class === 'pattern-part band') ? this.vars.bandStrokeOpacity : 0; })
		
		this.patternParts
			.enter().append('path')
			.attr('class', (d,i) => d.class)
			.attr('d', d => this.bandGen(d.data))
			.attr('transform', 'translate(' + this.designBounds.vars.x0 + ', ' + this.designBounds.vars.y0 + ')')
			.style('fill', d => d.color)
			.style('stroke', d => d.color)
			.attr('stroke-width', d => { return (d.class === 'pattern-part band') ? this.vars.bandStrokeWidth + 'px' : 0; })
			.attr('stroke-opacity', d => { return (d.class === 'pattern-part band') ? this.vars.bandStrokeOpacity : 0; })
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

class ArtGenerator {
    constructor({
	parentID = 'artgen',
	designID = 'design',
    guiID = 'gui',
    data = {},
    } = {}) {
        _.assign(this, {parentID, designID, guiID, data});
		this.parentElement = d3.select('body').append('div').attr('id', this.parentID )
		this.designWrapElement = this.parentElement.append('div').attr('id', this.designID + '-wrap')
		this.design = new Design(this.designWrapElement);

		// this.initializeGUI();
    }
	initializeGUI() {
        var self = this;
		this.gui = new dat.GUI();
		this.gui.width = 300;
		
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
		
		controller = {name: 'bandStrokeWidth', key:'band-stroke-width', folder: 'style'};
		controller.controller = this.folders.style.add(this.design.vars, 'bandStrokeWidth')
			.min(this.design.constants.bandStrokeWidth.min).max(this.design.constants.bandStrokeWidth.max).step(this.design.constants.bandStrokeWidth.step)
			.onChange(() => {
				  this.design.next({update: true});
			});
		this.controllers.push(controller);
		
		controller.controller = this.folders.style.add(this.design.vars, 'bandStrokeOpacity')
			.min(this.design.constants.bandStrokeOpacity.min).max(this.design.constants.bandStrokeOpacity.max).step(this.design.constants.bandStrokeOpacity.step)
			.onChange(() => {
				  this.design.next({update: true});
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

let defaultFunc = function() {
	window.onload = function() {
		console.log("HI");
		let ag = new ArtGenerator();
		ag.initializeGUI();
		
	}
}


defaultFunc();