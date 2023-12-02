import { Plateau } from '../../plateau/plateau';
import { Rover } from '../rover';
import { CardinalCompassPoints } from '../../plateau/cardinal-compass-points.enum';

describe('Rover', () => {
	const mockPlateau = new Plateau(0, 0, 5, 5);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('move', () => {
		it('should return the position 13N', () => {
			const mockRover = new Rover(
				{ x: 1, y: 2 },
				CardinalCompassPoints.NORTH,
				mockPlateau
			);
			const expectedValue = '13N';

			const position = mockRover.move('LMLMLMLMM');
			expect(position).toEqual(expectedValue);
		});

		it('should return the position 51E', () => {
			const mockRover = new Rover(
				{ x: 3, y: 3 },
				CardinalCompassPoints.EAST,
				mockPlateau
			);
			const expectedValue = '51E';

			const position = mockRover.move('MMRMMRMRRM');
			expect(position).toEqual(expectedValue);
		});
	});
});
