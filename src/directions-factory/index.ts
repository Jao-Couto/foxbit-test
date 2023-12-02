import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { North } from './north';
import { South } from './south';
import { East } from './east';
import { West } from './west';
import { Directions } from './directions.interface';

export function directionsFactory(
	direction: CardinalCompassPoints
): Directions {
	switch (direction) {
		case CardinalCompassPoints.NORTH:
			return new North();
		case CardinalCompassPoints.SOUTH:
			return new South();
		case CardinalCompassPoints.EAST:
			return new East();
		case CardinalCompassPoints.WEST:
			return new West();
	}
}
