import { Coordinate } from 'src/plateau/coordinate.interface';
import { Plateau } from 'src/plateau/plateau';
import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';

export interface Directions {
	currentDirection: CardinalCompassPoints;
	right(): CardinalCompassPoints;
	left(): CardinalCompassPoints;
	move(coordinate: Coordinate, plateau: Plateau): Coordinate;
}
