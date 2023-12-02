import { Coordinate } from './coordinate.interface';

export class Plateau {
	constructor(
		readonly minSizeX: number,
		readonly minSizeY: number,
		readonly maxSizeX: number,
		readonly maxSizeY: number
	) {}

	public isCoordinateInsidePlateau(roverInitialPosition: Coordinate) {
		return (
			roverInitialPosition.x >= this.minSizeX &&
			roverInitialPosition.x <= this.maxSizeX &&
			roverInitialPosition.y >= this.minSizeY &&
			roverInitialPosition.y <= this.maxSizeY
		);
	}
}
