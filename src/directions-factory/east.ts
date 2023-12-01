import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';
import { Directions } from './directions.interface';
import { Coordinate } from 'src/plateau/coordinate.interface';
import { Plateau } from 'src/plateau/plateau';

export class East implements Directions {
	currentDirection: CardinalCompassPoints = CardinalCompassPoints.EAST;

	right(): CardinalCompassPoints {
		return CardinalCompassPoints.SOUTH;
	}

	left(): CardinalCompassPoints {
		return CardinalCompassPoints.NORTH;
	}

	move(coordinate: Coordinate, plateau: Plateau): Coordinate {
		const { x, y } = coordinate;
		const newX = x === plateau.maxSizeX ? plateau.maxSizeX : x + 1;
		return { x: newX, y };
	}
}
