import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import Compositor from './compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {createMario} from './entities.js';
import Timer from './timer.js';

import KeyboardState from './keyboardState.js';

/*const input = new KeyboardState();
input.addMapping(32, keyState => {
	console.log(keyState);
});
input.listenTo(window);*/

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

Promise.all([
	createMario(),
	loadBackgroundSprites(),
	loadLevel('1-1')
])
.then(([mario, backgroundSprites, level]) => {
	const comp = new Compositor();

	const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
	comp.layers.push(backgroundLayer);

	const gravity = 2000;
	mario.pos.set(64, 180);
	mario.vel.set(200, -600);

	const SPACE = 32;
	const input = new KeyboardState();
	input.addMapping(SPACE, keyState => {
		if (keyState) {
			console.log(mario);
			mario.jump.start();
		} else {
			mario.jump.stop();
		}
		console.log(keyState);
	});
	input.listenTo(window);

	const spriteLayer = createSpriteLayer(mario);
	comp.layers.push(spriteLayer);

	const timer = new Timer(1/60);

	timer.update = function update(deltaTime){
		mario.update(deltaTime);
		comp.draw(context);
		mario.vel.y += gravity * deltaTime;
	}

	timer.start();
});
