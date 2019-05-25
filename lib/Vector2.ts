// TODO: implement some of functionality.  All we did was zero to start out with
//       https://gist.github.com/Dalimil/3daf2a0c531d7d030deb37a7bfeff454
class Vector2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public static get zero(): Vector2 {
		return new Vector2(0, 0);
	}

	public clone(): Vector2 {
		return new Vector2(this.x, this.y)
	}

	public add(vector: Vector2) {
		let v = this.clone();
		v.x += vector.x;
		v.y += vector.y;
		return v;
	}

	public subtract(vector: Vector2) {
		let v = this.clone();
		v.x -= vector.x;
		v.y -= vector.y;
		return v;
	}

	public scale(scalar: number) {
		let v = this.clone();
		v.x *= scalar;
		v.y *= scalar;
		return v;
	}

	public dot(vector: Vector2) {
		return (this.x * vector.x + this.y + vector.y);
	}

	public moveTowards(vector: Vector2, t) {
		t = Math.min(t, 1);
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	}

	public magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}

	public magnitudeSqr() {
		return (this.x * this.x + this.y * this.y);
	}

	public distance(vector: Vector2) {
		return Math.sqrt(this.distanceSqr(vector));
	}

	public distanceSqr(vector: Vector2) {
		let deltaX = this.x - vector.x;
		let deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	}

	public normalize() {
		let mag = this.magnitude();
		let v = this.clone();
		if (Math.abs(mag) < 1e-9) {
			v.x = 0;
			v.y = 0;
		} else {
			v.x /= mag;
			v.y /= mag;
		}
		return v;
	}

	public angle() {
		return Math.atan2(this.y, this.x);
	}

	public rotate(alpha: number) {
		let cos = Math.cos(alpha);
		let sin = Math.sin(alpha);
		let v = new Vector2(0, 0);
		v.x = this.x * cos - this.y * sin;
		v.y = this.x * sin + this.y * cos;
		return v;
	}

	public equals(vector: Vector2) {
		return this.x == vector.x && this.y == vector.y;
	}

	public toString() {
		return ("[" + this.x + ", " + this.y + "]");
	}
}
