import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { Coordinate } from '../plateau/coordinate.interface';

export interface FinalState {
	coordinate: Coordinate;
	direction: CardinalCompassPoints;
}
