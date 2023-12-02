import { Coordinate } from '../plateau/coordinate.interface';
import { Plateau } from '../plateau/plateau';
import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';

export interface Directions {
	currentDirection: CardinalCompassPoints;
	right(): CardinalCompassPoints;
	left(): CardinalCompassPoints;
	move(coordinate: Coordinate, plateau: Plateau): Coordinate;
}
