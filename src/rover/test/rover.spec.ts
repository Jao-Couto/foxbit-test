import { Plateau } from '../../plateau/plateau';
import { Rover } from '../rover';
import { CardinalCompassPoints } from '../../plateau/cardinal-compass-points.enum';

describe('Rover', () => {
	const mockPlateau = new Plateau(0, 0, 5, 5);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('move', () => {
		it('should return the position 1 3 N', () => {
			const mockRover = new Rover(
				{ x: 1, y: 2 },
				CardinalCompassPoints.NORTH,
				mockPlateau
			);
			const expectedValue = '1 3 N';

			const position = mockRover.move('LMLMLMLMM');
			expect(position).toEqual(expectedValue);
		});

		it('should return the position 5 1 E', () => {
			const mockRover = new Rover(
				{ x: 3, y: 3 },
				CardinalCompassPoints.EAST,
				mockPlateau
			);
			const expectedValue = '5 1 E';

			const position = mockRover.move('MMRMMRMRRM');
			expect(position).toEqual(expectedValue);
		});

		it('should throw an error if the instruction is invalid', () => {
			const mockRover = new Rover(
				{ x: 3, y: 3 },
				CardinalCompassPoints.EAST,
				mockPlateau
			);

			expect(() => mockRover.move('MMRMMRMRRM1')).toThrow(
				'Invalid instruction'
			);
		});
	});
});
