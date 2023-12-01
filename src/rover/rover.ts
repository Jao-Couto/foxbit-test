import { directionsFactory } from 'src/directions-factory';
import { Directions } from 'src/directions-factory/directions.interface';
import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';
import { Coordinate } from 'src/plateau/coordinate.interface';
import { Plateau } from 'src/plateau/plateau';
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

	execute(instructions: string): void {
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
	}

	getFinalState(): FinalState {
		return {
			coordinate: this.currentCoordinate,
			direction: this.direction.currentDirection,
		};
	}
}
