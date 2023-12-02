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

		const plateauMaxCoordinates: Coordinate = InputService.getCoordinatesNumber(
			plateauCoordinatesString[0],
			plateauCoordinatesString[1]
		);

		if (plateauMaxCoordinates.x < 0 || plateauMaxCoordinates.y < 0)
			throw new Error('Plateau coordinates must be positive');

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
	}

	static getCoordinatesNumber(stringX: string, stringY: string): Coordinate {
		const coordinate: Coordinate = {
			x: parseInt(stringX),
			y: parseInt(stringY),
		};

		if (isNaN(coordinate.x) || isNaN(coordinate.y))
			throw new Error('Coordinates must be numbers');

		return coordinate;
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

		const roverInitialPosition: Coordinate = InputService.getCoordinatesNumber(
			roverInitialPositionString[0],
			roverInitialPositionString[1]
		);
		if (!plateau.isCoordinateInsidePlateau(roverInitialPosition)) {
			throw new Error('Rover initial position must be inside the plateau');
		}

		const roverInitialDirection: CardinalCompassPoints =
			InputService.getCardinalCompassPoint(roverInitialPositionString[2]);
		return {
			initialPosition: roverInitialPosition,
			initialDirection: roverInitialDirection,
		};
	}

	static getCardinalCompassPoint(cardinal: string): CardinalCompassPoints {
		switch (cardinal) {
			case 'N':
				return CardinalCompassPoints.NORTH;
			case 'E':
				return CardinalCompassPoints.EAST;
			case 'S':
				return CardinalCompassPoints.SOUTH;
			case 'W':
				return CardinalCompassPoints.WEST;
			default:
				throw new Error(
					'Rover initial direction must be a cardinal compass point'
				);
		}
	}
}
