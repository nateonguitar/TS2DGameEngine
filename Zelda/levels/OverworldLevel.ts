class OverworldLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: OverworldController,
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
