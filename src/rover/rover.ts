import { directionsFactory } from '../directions-factory';
import { Directions } from '../directions-factory/directions.interface';
import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { Coordinate } from '../plateau/coordinate.interface';
import { Plateau } from '../plateau/plateau';

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

	move(instructions: string): string {
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
					throw new Error('Invalid instruction');
			}
		});
		return this.getPosition();
	}

	getPosition(): string {
		return `${this.currentCoordinate.x} ${this.currentCoordinate.y} ${this.direction.currentDirection}`;
	}
}
