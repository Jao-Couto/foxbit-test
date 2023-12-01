import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';
import { Directions } from './directions.interface';
import { Plateau } from 'src/plateau/plateau';
import { Coordinate } from 'src/plateau/coordinate.interface';

export class North implements Directions {
	currentDirection: CardinalCompassPoints = CardinalCompassPoints.NORTH;

	right(): CardinalCompassPoints {
		return CardinalCompassPoints.EAST;
	}

	left(): CardinalCompassPoints {
		return CardinalCompassPoints.WEST;
	}

	move(coordinate: Coordinate, plateau: Plateau): Coordinate {
		const { x, y } = coordinate;
		const newY = y === plateau.maxSizeY ? plateau.maxSizeY : y + 1;
		return { x, y: newY };
	}
}
