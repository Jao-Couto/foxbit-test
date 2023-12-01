import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';
import { Coordinate } from 'src/plateau/coordinate.interface';

export interface FinalState {
	coordinate: Coordinate;
	direction: CardinalCompassPoints;
}
