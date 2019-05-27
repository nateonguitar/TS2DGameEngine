class ZeldaOverworldLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: ZeldaOverworldController,
			imageSrcs: [
				'Zelda/Images/Link.png',
				'Zelda/Images/Overworld.png',
				'Zelda/Images/SoldierBlue.png',
				'Zelda/Images/SoldierGreenWalkDownSpritesheet.png',
				'Zelda/Images/SoldierGreenWalkSideSpritesheet.png',
			],
		});
	}
}