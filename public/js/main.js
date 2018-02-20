import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import Compositor from './compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {createMario} from './entities.js';
import Timer from './timer.js';

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

	const gravity = 0.5;

	const spriteLayer = createSpriteLayer(mario);
	comp.layers.push(spriteLayer);

	const timer = new Timer(1/60);

	timer.update = function update(deltaTime){
		comp.draw(context);
		mario.update();
		mario.vel.y += gravity;
	}

	timer.start();
});
