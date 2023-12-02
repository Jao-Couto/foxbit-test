import { Plateau } from './plateau/plateau';
import { InputService } from './input/input-service';
import { Rover } from './rover/rover';

const fileContent = InputService.readFile('src/input.txt');

const plateau: Plateau = InputService.getPlateau(fileContent[0]);

const roversConfig = fileContent.slice(1);
for (let i = 0; i < roversConfig.length; i += 2) {
	const rover: Rover = InputService.getRover(roversConfig[i], plateau);
	const roverFinalPosition: string = rover.move(roversConfig[i + 1]);
	console.log(roverFinalPosition);
}
