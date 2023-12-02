import { Plateau } from 'src/plateau/plateau';
import { InputService } from '../input-service';
import * as fs from 'fs';
import { Coordinate } from 'src/plateau/coordinate.interface';
import { Rover } from 'src/rover/rover';
import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';

jest.mock('fs');

describe('InputService', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('readFile', () => {
		it('should return an array of file lines if the file has 3 or more lines', () => {
			jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('Line1\nLine2\nLine3');
			const result = InputService.readFile('dummy/path');
			expect(result).toEqual(['Line1', 'Line2', 'Line3']);
		});

		it('should throw an error if the file has less than 3 lines', () => {
			jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('Line1\nLine2');
			expect(() => {
				InputService.readFile('dummy/path');
			}).toThrow('File must have at least 3 lines');
		});
	});

	describe('getPlateau', () => {
		it('should return the plateau coordinates', () => {
			const plateau = InputService.getPlateau('5 5');

			jest
				.spyOn(InputService, 'getCoordinatesNumber')
				.mockReturnValueOnce({ x: 5, y: 5 });

			const expectedPlateau = new Plateau(0, 0, 5, 5);
			expect(plateau).toEqual(expectedPlateau);
		});

		it('should throw an error if the input are not two numbers', () => {
			expect(() => {
				InputService.getPlateau('5');
			}).toThrow(
				'Plateau coordinates must be two numbers separated by a space'
			);
		});

		it('should throw an error if the plateau coordinates are not numbers', () => {
			const expectedError = 'Coordinates must be numbers';
			jest
				.spyOn(InputService, 'getCoordinatesNumber')
				.mockImplementationOnce(() => {
					throw expectedError;
				});

			expect(() => {
				InputService.getPlateau('5 A');
			}).toThrow(expectedError);
		});

		it('should throw an error if the plateau coordinates are negative', () => {
			jest
				.spyOn(InputService, 'getCoordinatesNumber')
				.mockReturnValueOnce({ x: -5, y: -5 });

			expect(() => {
				InputService.getPlateau('-5 -5');
			}).toThrow('Plateau coordinates must be positive');
		});
	});

	describe('getCoordinatesNumber', () => {
		it('should return the coordinates', () => {
			const expectedCoordinates: Coordinate = { x: 5, y: 5 };
			const coordinates = InputService.getCoordinatesNumber('5', '5');
			expect(coordinates).toEqual(expectedCoordinates);
		});

		it('should throw an error if the coordinates are not numbers', () => {
			expect(() => {
				InputService.getCoordinatesNumber('5', 'A');
			}).toThrow('Coordinates must be numbers');
		});
	});

	describe('getRover', () => {
		const plateau = new Plateau(0, 0, 5, 5);
		it('should return the rover', () => {
			jest.spyOn(InputService, 'getRoverInitialPosition').mockReturnValueOnce({
				initialPosition: { x: 1, y: 2 },
				initialDirection: CardinalCompassPoints.NORTH,
			});

			const rover: Rover = InputService.getRover('1 2 N', plateau);

			expect(rover).toBeDefined();
			expect(rover.getPosition()).toEqual('12N');
		});
	});

	describe('getRoverInitialPosition', () => {
		const plateau = new Plateau(0, 0, 5, 5);

		it('should return the rover initial position', () => {
			jest
				.spyOn(InputService, 'getCoordinatesNumber')
				.mockReturnValueOnce({ x: 1, y: 2 });
			jest
				.spyOn(InputService, 'getCardinalCompassPoint')
				.mockReturnValueOnce(CardinalCompassPoints.NORTH);

			const roverInitialPosition = InputService.getRoverInitialPosition(
				'1 2 N',
				plateau
			);
			expect(roverInitialPosition).toEqual({
				initialPosition: { x: 1, y: 2 },
				initialDirection: CardinalCompassPoints.NORTH,
			});
		});

		it('should throw an error if the rover initial position is not two numbers and a cardinal compass point', () => {
			expect(() => {
				InputService.getRoverInitialPosition('1 2', plateau);
			}).toThrow(
				'Rover initial position must be two numbers separated by a space and a cardinal compass point'
			);
		});

		it('should throw an error if the rover initial position is not inside the plateau', () => {
			expect(() => {
				InputService.getRoverInitialPosition('6 2 N', plateau);
			}).toThrow('Rover initial position must be inside the plateau');
		});

		it('should throw an error if the rover initial position is not a cardinal compass point', () => {
			expect(() => {
				InputService.getRoverInitialPosition('1 2 A', plateau);
			}).toThrow('Rover initial direction must be a cardinal compass point');
		});
	});

	describe('getCardinalCompassPoint', () => {
		it('should return the cardinal compass point', () => {
			const cardinalCompassPoint = InputService.getCardinalCompassPoint('N');
			expect(cardinalCompassPoint).toEqual(CardinalCompassPoints.NORTH);
		});

		it('should throw an error if the cardinal compass point is not a valid cardinal compass point', () => {
			expect(() => {
				InputService.getCardinalCompassPoint('A');
			}).toThrow('Rover initial direction must be a cardinal compass point');
		});
	});
});
