import Entity from './entity.js';
import Velocity from './traits/velocity.js';
import Jump from './traits/jump.js';
import {loadMarioSprite} from './sprites.js';

/*class Velocity extends Trait {
	constructor () {
		super('velocity')
	}

	update(entity, deltaTime) {
		entity.pos.x += entity.vel.x * deltaTime;
		entity.pos.y += entity.vel.y * deltaTime;
	}
}*/

export function createMario(){
	return loadMarioSprite()
	.then ( sprite => {
		const mario = new Entity();
		//mario.pos.set(64, 180);
		//mario.vel.set(2, -10);

		
		/*mario.update = function updatMario() {
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
		}*/
		mario.addTrait(new Velocity());
		mario.addTrait(new Jump());

		mario.draw = function drawMario(context) {
			sprite.draw('man', context, this.pos.x, this.pos.y);
		}

		return mario;
	});
}