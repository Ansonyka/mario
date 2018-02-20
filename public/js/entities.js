import Entity from './entity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario(){
	loadMarioSprite()
	.then ( sprite => {
		const mario = new Entity();
		mario.pos.set(64, 180);
		mario.vel.set(2, -10);

		
		mario.update = function updatMario() {
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
		}

		mario.draw = function drawMario(context) {
			sprite.draw('man', context, this.pos.x, this.pos.y);
		}

		return mario;
	});
}