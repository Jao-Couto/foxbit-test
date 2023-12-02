import { Coordinate } from '../coordinate.interface';
import { Plateau } from '../plateau';

describe('Plateau', () => {
	it('should be true', () => {
		expect(true).toBe(true);
	});

	describe('constructor', () => {
		it('should create a plateau with the given coordinates', () => {
			const minSize = { x: 0, y: 0 };
			const maxSize = { x: 5, y: 5 };

			const plateau = new Plateau(minSize.x, minSize.y, maxSize.x, maxSize.y);

			expect(plateau).toBeDefined();
			expect(plateau.minSizeX).toEqual(minSize.x);
			expect(plateau.minSizeY).toEqual(minSize.y);
			expect(plateau.maxSizeX).toEqual(maxSize.x);
			expect(plateau.maxSizeY).toEqual(maxSize.y);
		});
	});

	describe('isCoordinateInsidePlateau', () => {
		it('should return true if the given coordinates are inside the plateau', () => {
			const plateau = new Plateau(0, 0, 5, 5);
			const coordinates: Coordinate = { x: 1, y: 1 };

			const isCoordinateInsidePlateau =
				plateau.isCoordinateInsidePlateau(coordinates);

			expect(isCoordinateInsidePlateau).toBe(true);
		});

		it('should return false if the given coordinates are not inside the plateau', () => {
			const plateau = new Plateau(0, 0, 5, 5);
			const coordinates = { x: 6, y: 6 };

			const isWithinBounds = plateau.isCoordinateInsidePlateau(coordinates);

			expect(isWithinBounds).toBe(false);
		});
	});
});
