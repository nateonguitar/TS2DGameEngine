import { Vector2, GameObject, GameManager, HudGameObject } from './';

export interface LevelParams {
	managingGameObjectClass: Function,
	imageSrcs?: string[],
	/**
	 * Additional space to update around viewport.
	 * Vector2(10, 10) will give a 5 pixel bounding addition all the way around the viewport.
	 * null is the same as Vector2(0, 0)
	 **/
	extraViewportPadding?: Vector2,
	unitSize?: number,
	hudUnitSize?: number,
	backgroundColor?: string,
}

export class Level {
	// Inherit from this class.
	// Leave your constructor empty.
	// Override the init() function with the contents:
	// - Set the managingGameObject like this.managingGameObject = OverworldController
	// - set the images array for each image you will.
	public gameObjects: GameObject[] = [];

	private _cachedImages: {[k:string]: any} = <any>{};
	private imageSrcs: string[] = [];
	private managingGameObjectClass: Function;
	public managingGameObject: GameObject = null;

	public updatesSkipped: number = 0;

	public extraViewportPadding: Vector2 = null;

	public unitSize: number = 50;
	public hudUnitSize: number = 50;
	public backgroundColor: string = "#000000";

	constructor(params:LevelParams) {
		for (let key in params) {
			this[key] = params[key];
		}

		for (let src of this.imageSrcs) {
			let img = new Image();
			img.src = src;
			if (this._cachedImages[src]) {
				console.warn("Duplicate image source:");
				console.warn("- Class:  " + this.constructor.name);
				console.warn("- Source: " + src);
			}
			this._cachedImages[src] = img;
		}
	}

	public close(): void {
		this.gameObjects = [];
		this.managingGameObject = null;
		this.managingGameObjectClass = null;
		this.imageSrcs = [];
		this._cachedImages = null;
	}

	public init(): void {
		this.managingGameObject = new (<any>this.managingGameObjectClass)();
		this.managingGameObject.neverSkipUpdate = true;
	}

	public get cachedImages(): {[k:string]: any} { return this._cachedImages; }

	public update(): void {
		let camera = GameManager.camera;
		this.updatesSkipped = 0;
		for (let gameObject of this.gameObjects) {
			gameObject.inViewOfCamera = camera.inViewOfGameObject(gameObject, this.extraViewportPadding);
			// HudGameObjects are always "inViewOfCamera"
			if (gameObject.neverSkipUpdate || gameObject.inViewOfCamera) {
				gameObject.update();
			}
			else {
				this.updatesSkipped++;
			}
		}
	}

	public draw(): void {
		let handledGameObjects: GameObject[] = [];

		// split HudGameObjects out so we draw them last
		let gameObjects: GameObject[] = [];
		let hudGameObjects: HudGameObject[] = [];
		for (let o of this.gameObjects) {
			if (o instanceof HudGameObject) {
				hudGameObjects.push(o);
			}
			else {
				gameObjects.push(o);
			}
		}

		// draw in the appropriate order
		for (let objs of [gameObjects, hudGameObjects]) {
			// loop through our layers
			for (let i=0; i<GameManager.options.layers; i++) {
				// draw gameobjects on that layer
				for (let j=0; j<objs.length; j++) {
					let obj = objs[j];
					if (obj.inViewOfCamera) {
						if (obj.getLayer() == i) {
							handledGameObjects.push(obj);
							obj.draw();
						}
					}
					else {
						handledGameObjects.push(obj);
					}
				}
			}
		}

		if (handledGameObjects.length < this.gameObjects.length) {
			for (let gameObject of this.gameObjects) {
				if (handledGameObjects.indexOf(gameObject) == -1) {
					console.warn(
						gameObject.constructor.name +
						" GameObject was not drawn, did you set its layers properly?"
					);
				}
			}
		}
	}

	public updateAnimations(): void {
		for (let gameObject of this.gameObjects) {
			gameObject.updateAnimations();
		}
	}

	public registerGameObject(gameObject: GameObject): void {
		this.gameObjects.push(gameObject);
	}
}
