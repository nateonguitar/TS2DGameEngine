class FroggerMainLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: FroggerMainLevelController,
			imageSrcs: [
				'Frogger/Images/FroggerSpritesheet.png',
			],
			extraViewportPadding: new Vector2(GameManager.options.screenWidth*2, GameManager.options.screenHeight*2)
		});
	}
}
