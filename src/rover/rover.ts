import { directionsFactory } from '../directions-factory';
import { Directions } from '../directions-factory/directions.interface';
import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { Coordinate } from '../plateau/coordinate.interface';
import { Plateau } from '../plateau/plateau';
import { FinalState } from './final-state.interface';

export class Rover {
	private currentCoordinate: Coordinate;
	private direction: Directions;

	constructor(
		initialCoordinate: Coordinate,
		initialDirection: CardinalCompassPoints,
		private readonly plateau: Plateau
	) {
		this.currentCoordinate = initialCoordinate;
		this.direction = directionsFactory(initialDirection);
	}

	execute(instructions: string): FinalState {
		const instructionsArray = instructions.split('');

		instructionsArray.forEach((instruction) => {
			switch (instruction) {
				case 'L':
					this.direction = directionsFactory(this.direction.left());
					break;
				case 'R':
					this.direction = directionsFactory(this.direction.right());
					break;
				case 'M':
					this.currentCoordinate = this.direction.move(
						this.currentCoordinate,
						this.plateau
					);
					break;
				default:
					console.error('Invalid instruction');
			}
		});
		return this.getFinalState();
	}

	getFinalState(): FinalState {
		return {
			coordinate: this.currentCoordinate,
			direction: this.direction.currentDirection,
		};
	}
}
