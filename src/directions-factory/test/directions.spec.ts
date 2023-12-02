import { CardinalCompassPoints } from 'src/plateau/cardinal-compass-points.enum';
import { directionsFactory } from '..';
import { North } from '../north';
import { South } from '../south';
import { East } from '../east';
import { West } from '../west';
import { Plateau } from 'src/plateau/plateau';

describe('Directions', () => {
	const mockPlateau: Plateau = new Plateau(0, 0, 5, 5);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('directionsFactory', () => {
		it('should return the North direction', () => {
			const direction = directionsFactory(CardinalCompassPoints.NORTH);
			expect(direction).toBeInstanceOf(North);
		});

		it('should return the South direction', () => {
			const direction = directionsFactory(CardinalCompassPoints.SOUTH);
			expect(direction).toBeInstanceOf(South);
		});

		it('should return the East direction', () => {
			const direction = directionsFactory(CardinalCompassPoints.EAST);
			expect(direction).toBeInstanceOf(East);
		});

		it('should return the West direction', () => {
			const direction = directionsFactory(CardinalCompassPoints.WEST);
			expect(direction).toBeInstanceOf(West);
		});
	});

	describe('North', () => {
		const north = new North();

		describe('right', () => {
			it('should return the East direction', () => {
				const direction = north.right();
				expect(direction).toEqual(CardinalCompassPoints.EAST);
			});
		});

		describe('left', () => {
			it('should return the West direction', () => {
				const direction = north.left();
				expect(direction).toEqual(CardinalCompassPoints.WEST);
			});
		});

		describe('move', () => {
			it('should return the next coordinate', () => {
				const coordinate = north.move({ x: 1, y: 1 }, mockPlateau);
				expect(coordinate).toEqual({ x: 1, y: 2 });
			});

			it('should return the same coordinate if the next coordinate is outside the plateau', () => {
				const coordinate = north.move({ x: 1, y: 5 }, mockPlateau);
				expect(coordinate).toEqual({ x: 1, y: 5 });
			});
		});
	});

	describe('South', () => {
		const south = new South();

		describe('right', () => {
			it('should return the West direction', () => {
				const direction = south.right();
				expect(direction).toEqual(CardinalCompassPoints.WEST);
			});
		});

		describe('left', () => {
			it('should return the East direction', () => {
				const direction = south.left();
				expect(direction).toEqual(CardinalCompassPoints.EAST);
			});
		});

		describe('move', () => {
			it('should return the next coordinate', () => {
				const coordinate = south.move({ x: 1, y: 1 }, mockPlateau);
				expect(coordinate).toEqual({ x: 1, y: 0 });
			});

			it('should return the same coordinate if the next coordinate is outside the plateau', () => {
				const coordinate = south.move({ x: 1, y: 0 }, mockPlateau);
				expect(coordinate).toEqual({ x: 1, y: 0 });
			});
		});
	});

	describe('East', () => {
		const east = new East();

		describe('right', () => {
			it('should return the South direction', () => {
				const direction = east.right();
				expect(direction).toEqual(CardinalCompassPoints.SOUTH);
			});
		});

		describe('left', () => {
			it('should return the North direction', () => {
				const direction = east.left();
				expect(direction).toEqual(CardinalCompassPoints.NORTH);
			});
		});

		describe('move', () => {
			it('should return the next coordinate', () => {
				const coordinate = east.move({ x: 1, y: 1 }, mockPlateau);
				expect(coordinate).toEqual({ x: 2, y: 1 });
			});

			it('should return the same coordinate if the next coordinate is outside the plateau', () => {
				const coordinate = east.move({ x: 5, y: 1 }, mockPlateau);
				expect(coordinate).toEqual({ x: 5, y: 1 });
			});
		});
	});

	describe('West', () => {
		const west = new West();

		describe('right', () => {
			it('should return the North direction', () => {
				const direction = west.right();
				expect(direction).toEqual(CardinalCompassPoints.NORTH);
			});
		});

		describe('left', () => {
			it('should return the South direction', () => {
				const direction = west.left();
				expect(direction).toEqual(CardinalCompassPoints.SOUTH);
			});
		});

		describe('move', () => {
			it('should return the next coordinate', () => {
				const coordinate = west.move({ x: 1, y: 1 }, mockPlateau);
				expect(coordinate).toEqual({ x: 0, y: 1 });
			});

			it('should return the same coordinate if the next coordinate is outside the plateau', () => {
				const coordinate = west.move({ x: 0, y: 1 }, mockPlateau);
				expect(coordinate).toEqual({ x: 0, y: 1 });
			});
		});
	});
});
