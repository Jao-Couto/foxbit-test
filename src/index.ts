import { Plateau } from './plateau/plateau';
import { InputService } from './input/input-service';
import { Rover } from './rover/rover';

// Read input file
const fileContent = InputService.readFile('src/input.txt');

// Get plateau
const plateau: Plateau = InputService.getPlateau(fileContent[0]);

// Get rovers initial positon and instructions
const roversConfig = fileContent.slice(1);

// For each 2 lines of the input file, create a rover and move it
for (let i = 0; i < roversConfig.length; i += 2) {
	// Create rover
	const rover: Rover = InputService.getRover(roversConfig[i], plateau);

	// Move rover
	const roverFinalPosition: string = rover.move(roversConfig[i + 1]);

	// Print rover final position
	console.log(roverFinalPosition);
}
