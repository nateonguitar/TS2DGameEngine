class MarioGameTileTubeBottomLeft extends MarioGameTile {
	constructor() {
		super({
			hasCollider: true,
			allowPassThrough: false,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle": new SpritesheetAnimation(
						MarioGameTile.spriteSheet,
						[ new Transform(new Vector2(0, MarioGameTile.spriteSize.y * 11), MarioGameTile.spriteSize), ],
						10000,
					),
				},
				"idle" // start animation name
			)
		});
	}
}