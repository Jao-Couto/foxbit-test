import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { Directions } from './directions.interface';
import { Plateau } from '../plateau/plateau';
import { Coordinate } from '../plateau/coordinate.interface';

export class South implements Directions {
	currentDirection: CardinalCompassPoints = CardinalCompassPoints.SOUTH;

	right(): CardinalCompassPoints {
		return CardinalCompassPoints.WEST;
	}

	left(): CardinalCompassPoints {
		return CardinalCompassPoints.EAST;
	}

	move(coordinate: Coordinate, plateau: Plateau): Coordinate {
		const { x, y } = coordinate;
		const newY = y === plateau.minSizeY ? plateau.minSizeY : y - 1;
		return { x, y: newY };
	}
}
