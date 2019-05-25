class TetrisController extends GameObject {
	private shapes = [
		Cube,
		Line,
		LL,
		LR
	];

	private keys = {
		up: false,
		down: false,
		left: false,
		right: false,
	};

	private currentPiece: Piece = null;
	private grid: Grid = null;
	private zWasPressed: boolean = false;

	constructor() {
		super();
		this.grid = new Grid();
		Input.registerMouseDown(this, this.mousedown);
	}

	public update() {
		// drop a new piece
		if (this.currentPiece == null) {
			let randomIndex = Math.floor(Math.random() * this.shapes.length);
			let Shape = this.shapes[randomIndex];
			this.currentPiece = new Shape();
			this.currentPiece.transform.position.x = 100;

		}

		// control the falling piece
		else {
			this.handleMovement();
			if (this.currentPiece.transform.position.y > GameManager.options.screenHeight) {
				GameManager.destroy(this.currentPiece);
			}
		}
	}

	private handleMovement(): void {
		// don't allow repeat moves, have to press the button again
		// left
		if (Input.keys(Keys.ArrowLeft) && !this.keys.left) {
			this.keys.left = true;
			this.movePieceLeft();
		}
		if (!Input.keys(Keys.ArrowLeft) && this.keys.left) {
			this.keys.left = false;
		}
		// right
		if (Input.keys(Keys.ArrowRight) && !this.keys.right) {
			this.keys.right = true;
			this.movePieceRight();
		}
		if (!Input.keys(Keys.ArrowRight) && this.keys.right) {
			this.keys.right = false;
		}

		if (Input.keys(Keys.ControlLeft)) {
			this.grid.transform.position = this.grid.transform.position.subtract(new Vector2(1, 0));
		}
		if (Input.keys(Keys.ControlRight)) {
			this.grid.transform.position = this.grid.transform.position.add(new Vector2(1, 0));
		}
		if (Input.keys(Keys.ShiftLeft)) {
			this.grid.transform.position = this.grid.transform.position.subtract(new Vector2(0, 1));
		}
		if (Input.keys(Keys.ShiftRight)) {
			this.grid.transform.position = this.grid.transform.position.add(new Vector2(0, 1));
		}

		// swap levels to zelda
		if (Input.keys(Keys.KeyZ)) {
			this.zWasPressed = true;
		}
		if (!Input.keys(Keys.KeyZ) && this.zWasPressed) {
			GameManager.loadLevel("ZeldaOverworld");
		}
	}

	private movePieceLeft(): void {
		if (this.currentPiece) {
			this.currentPiece.transform.position.x -= Piece.size;
			if (this.currentPiece.transform.position.x < 0) {
				this.currentPiece.transform.position.x = 0;
			}
		}
	}

	private movePieceRight(): void {
		if (this.currentPiece) {
			this.currentPiece.transform.position.x += Piece.size;
			let totalWidth = this.currentPiece.transform.size.x * this.currentPiece.arrangement[0].length;
			if (this.currentPiece.transform.position.x > this.grid.transform.size.x - totalWidth) {
				this.currentPiece.transform.position.x = this.grid.transform.size.x - totalWidth;
			}
		}
	}

	private mousedown(coords:Vector2, gameObjects:GameObject[]): void {
		console.log(coords);
		console.log(gameObjects);
	}
}
