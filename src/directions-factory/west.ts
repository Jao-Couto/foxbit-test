import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { Directions } from './directions.interface';
import { Coordinate } from '../plateau/coordinate.interface';
import { Plateau } from '../plateau/plateau';

export class West implements Directions {
	currentDirection: CardinalCompassPoints = CardinalCompassPoints.WEST;

	right(): CardinalCompassPoints {
		return CardinalCompassPoints.NORTH;
	}

	left(): CardinalCompassPoints {
		return CardinalCompassPoints.SOUTH;
	}

	move(coordinate: Coordinate, plateau: Plateau): Coordinate {
		const { x, y } = coordinate;
		const newX = x === plateau.minSizeX ? plateau.minSizeX : x - 1;
		return { x: newX, y };
	}
}
