import Vector2 from "./Vector2";
import Canvas from "./Canvas";
import GameObject from "./GameObject";
import GameManager from "./GameManager";
import Keys from "./Keys";

export default class Input {
	private static _KEYS: {[key:string]: string} = {
		'Tab': Keys.Tab,
		'ControlLeft': Keys.ControlLeft,
		'ControlRight': Keys.ControlRight,
		'AltLeft': Keys.AltLeft,
		'AltRight': Keys.AltRight,
		'ShiftLeft': Keys.ShiftLeft,
		'ShiftRight': Keys.ShiftRight,
		'Escape': Keys.Escape,
		'Space': Keys.Space,
		'ArrowLeft': Keys.ArrowLeft,
		'ArrowUp': Keys.ArrowUp,
		'ArrowRight': Keys.ArrowRight,
		'ArrowDown': Keys.ArrowDown,
		'Digit0': Keys.Key0,
		'Digit1': Keys.Key1,
		'Digit2': Keys.Key2,
		'Digit3': Keys.Key3,
		'Digit4': Keys.Key4,
		'Digit5': Keys.Key5,
		'Digit6': Keys.Key6,
		'Digit7': Keys.Key7,
		'Digit8': Keys.Key8,
		'Digit9': Keys.Key9,
		'KeyA': Keys.KeyA,
		'KeyB': Keys.KeyB,
		'KeyC': Keys.KeyC,
		'KeyD': Keys.KeyD,
		'KeyE': Keys.KeyE,
		'KeyF': Keys.KeyF,
		'KeyG': Keys.KeyG,
		'KeyH': Keys.KeyH,
		'KeyI': Keys.KeyI,
		'KeyJ': Keys.KeyJ,
		'KeyK': Keys.KeyK,
		'KeyL': Keys.KeyL,
		'KeyM': Keys.KeyM,
		'KeyN': Keys.KeyN,
		'KeyO': Keys.KeyO,
		'KeyP': Keys.KeyP,
		'KeyQ': Keys.KeyQ,
		'KeyR': Keys.KeyR,
		'KeyS': Keys.KeyS,
		'KeyT': Keys.KeyT,
		'KeyU': Keys.KeyU,
		'KeyV': Keys.KeyV,
		'KeyW': Keys.KeyW,
		'KeyX': Keys.KeyX,
		'KeyY': Keys.KeyY,
		'KeyZ': Keys.KeyZ,
		'F1': Keys.F1,
		'F2': Keys.F2,
		'F3': Keys.F3,
		'F4': Keys.F4,
		'F5': Keys.F5,
		'F6': Keys.F6,
		'F7': Keys.F7,
		'F8': Keys.F8,
		'F9': Keys.F9,
		'F10': Keys.F10,
		'F11': Keys.F11,
		'F12': Keys.F12,
		'Backquote': Keys.Backquote,
		'Slash': Keys.Slash,
		'Period': Keys.Period,
		'Comma': Keys.Comma,
		'Quote': Keys.Quote,
		'Semicolon': Keys.Semicolon,
		'BracketRight': Keys.BracketRight,
		'BracketLeft': Keys.BracketLeft,
		'Backslash': Keys.Backslash,
		'Backspace': Keys.Backspace,
		'Equals': Keys.Equals,
		'Minus': Keys.Minus,
	};

	private static _keyDowns: { [key:string]:boolean } = {}

	private static mousedownListeners: Function[] = [];
	private static mouseupListeners: Function[] = [];
	private static mousePos: Vector2 = Vector2.zero;

	public static init(): void {
		document.onkeydown = Input.getKeyDown;
		document.onkeyup = Input.getKeyUp;
		for (let c of [Canvas.gameCanvas]) {
			c.addEventListener('mousedown', this.mousedown);
			c.addEventListener('mouseup', this.mouseup);
			c.addEventListener('mousemove', this.mousemove);
		}
	}

	private static mousedown(event:MouseEvent): void {
		Input.mouseUpOrDown(event, Input.mousedownListeners);
	}

	private static mouseup(event:MouseEvent): void {
		Input.mouseUpOrDown(event, Input.mouseupListeners);
	}

	private static mousemove(event:MouseEvent): void {
		Input.mousePos = new Vector2((<any>event).layerX, (<any>event).layerY);
	}

	private static mouseUpOrDown(event:MouseEvent, listeners:Function[]): void {
		let clickPos = this.getAbsoluteClickPosition(event);
		for (let i=0; i<listeners.length; i++) {
			let clickedObjects: GameObject[] = GameManager.currentLevel.gameObjects.filter(obj => {
				let size = obj.absoluteSize;
				let pos = obj.absolutePosition.subtract(size.scale(0.5));
				if (
					clickPos.x >= pos.x &&
					clickPos.y >= pos.y &&
					clickPos.x <= pos.x + size.x &&
					clickPos.y <= pos.y + size.y
				) {
					return true;
				}
				return false;
			});
			listeners[i](clickPos, clickedObjects);
		}
	}

	public static getAbsoluteClickPosition(event:MouseEvent): Vector2 {
		let screenSize = GameManager.screenSize.clone();
		let clickPos = new Vector2((<any>event).layerX, (<any>event).layerY);
		let cameraPos = GameManager.camera.worldspacePosition;

		// shift for camera positioning
		return clickPos.add(cameraPos).subtract(screenSize.scale(0.5));
	}

	public static getWorldspaceMousePosition(): Vector2 {
		return Input.mousePos
			.add(GameManager.camera.worldspacePosition)
			.subtract(GameManager.screenSize.scale(0.5))
			.scale(1/GameManager.unitSize);
	}

	/** `Input.keys(Keys.UP)` will return `true` if key is pressed */
	public static keys(key: string): boolean {
		if (Input._keyDowns[key]) {
			return true;
		}
		return false;
	}


	private static getKeyDown(e:KeyboardEvent): void {
		Input._keyDowns[Input._KEYS[e.code]] = true;
	}

	private static getKeyUp(e: KeyboardEvent): void {
		Input._keyDowns[Input._KEYS[e.code]] = false;
	}

	public static registerMouseDown(toBind: object, func:Function): void {
		Input.mousedownListeners.push(func.bind(toBind));
	}

	public static registerMouseUp(toBind: object, func:Function): void {
		Input.mouseupListeners.push(func.bind(toBind));
	}
}