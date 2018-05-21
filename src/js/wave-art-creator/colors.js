class Theme {
	constructor({colors = [], bands = [], shadows = []} = {}){
		_.assign(this, {colors, bands, shadows});
	}
}

export const blackWhite = new Theme({
	colors: ["#000000","#ffffff"],
	bands: [0],
	shadows: [1]
});

export const blueBrown = new Theme({
	colors: ["#72664E","#CAC49C","#F6F1E8","#B1D8DC","#409BA8"], 
	bands: [0], 
	shadows: [1,2,3,4]
});

export const seaPunkVaporWave = new Theme({
	colors: ["#FF6AD5","#C774E8","#AD8CFF","#8795E8","#94D0FF","#FF6AD5","#C774E8","#AD8CFF"], 
	bands: [0], 
	shadows:[1,2,3,4]
});

export const vaporWaveBright = new Theme({
	colors: ["#ff71ce","#01cdfe","#05ffa1","#b967ff","#fffb96"], 
	bands: [0],
	shadows:[1,2,3,4]
});

export const cyberPunk = new Theme({
	colors:["#00ff9f","#00b8ff","#001eff","#bd00ff","#d600ff"], 
	bands:[0], 
	shadows:[1,2,3,4]
});

export const cyberPunkRain = new Theme({
	colors: ["#467fa1","#54295c","#061f2b","#1e0f1d","#5e0b0b"],
	bands:[2], 
	shadows:[1,2,4]
});

export const pinkMint = new Theme({
	colors:["#C0FBE7","#F5A6D6","#FEC1EA","#EA75BC","#EA40AA"],
	bands: [0],
	shadows:[1,2,3,2,3,4]
})

export const forestDarkLight = new Theme({
	colors:["#FCF5C3","#91AF70","#5D7959","#374435","#141614"],
	bands: [4],
	shadows: [0,1,0,1,2,1,2,3,2,3]
});

export let colorThemes = {
	blackWhite,
	blueBrown,
	seaPunkVaporWave,
	vaporWaveBright,
	cyberPunk,
	cyberPunkRain,
	pinkMint,
	forestDarkLight
}