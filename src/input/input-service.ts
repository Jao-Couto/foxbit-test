import * as fs from 'fs';
import { CardinalCompassPoints } from '../plateau/cardinal-compass-points.enum';
import { Coordinate } from '../plateau/coordinate.interface';
import { Plateau } from '../plateau/plateau';
import { Rover } from '../rover/rover';

export class InputService {
	static readFile(filePath: string): string[] {
		const file = fs.readFileSync(filePath, 'utf-8');
		const fileLines = file.split('\n');
		if (fileLines.length < 3) {
			throw new Error('File must have at least 3 lines');
		}
		return fileLines;
	}

	static getPlateau(plateauSizeLine: string): Plateau {
		const plateauCoordinatesString = plateauSizeLine.split(' ');
		if (plateauCoordinatesString.length !== 2) {
			throw new Error(
				'Plateau coordinates must be two numbers separated by a space'
			);
		}
		try {
			const plateauMaxCoordinates: Coordinate = {
				x: parseInt(plateauCoordinatesString[0]),
				y: parseInt(plateauCoordinatesString[1]),
			};
			const plateauMinCoordinates: Coordinate = {
				x: 0,
				y: 0,
			};
			return new Plateau(
				plateauMinCoordinates.x,
				plateauMinCoordinates.y,
				plateauMaxCoordinates.x,
				plateauMaxCoordinates.y
			);
		} catch (error) {
			throw new Error('Plateau coordinates must be numbers');
		}
	}

	static getRover(roverInitialPositionLine: string, plateau: Plateau): Rover {
		const roverInitialPosition = InputService.getRoverInitialPosition(
			roverInitialPositionLine,
			plateau
		);
		const inicialCoordinate = {
			x: roverInitialPosition.initialPosition.x,
			y: roverInitialPosition.initialPosition.y,
		};

		return new Rover(
			inicialCoordinate,
			roverInitialPosition.initialDirection,
			plateau
		);
	}

	static getRoverInitialPosition(
		roverInitialPositionLine: string,
		plateau: Plateau
	): {
		initialPosition: Coordinate;
		initialDirection: CardinalCompassPoints;
	} {
		const roverInitialPositionString = roverInitialPositionLine.split(' ');
		if (roverInitialPositionString.length !== 3) {
			throw new Error(
				'Rover initial position must be two numbers separated by a space and a cardinal compass point'
			);
		}
		try {
			const roverInitialPosition: Coordinate = {
				x: parseInt(roverInitialPositionString[0]),
				y: parseInt(roverInitialPositionString[1]),
			};
			if (!plateau.isCoordinateInsidePlateau(roverInitialPosition)) {
				throw new Error('Rover initial position must be inside the plateau');
			}
			const roverInitialDirection: CardinalCompassPoints =
				roverInitialPositionString[2] as CardinalCompassPoints;
			return {
				initialPosition: roverInitialPosition,
				initialDirection: roverInitialDirection,
			};
		} catch (error) {
			throw new Error('Rover initial position must be numbers');
		}
	}
}
