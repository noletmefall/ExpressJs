const a = 5;
const b = '4';

const c: number = a + Number(b);

const d = true;

const names: string[] = ['asd', 'asd'];

const asd: number[] = [3, 4, 5, 6];

const tup: [number, string] = [2, 'asd'];

let e: any = 3;
e = 'asd';
e = true;

const anyArr: any[] = ['asd', 3, true];

function greet(name: string): string {
	return name + 'hi';
}

names.map((x: string) => x);

function coord(coord: { lat: number; long: number }) {}

let universalId: number | string = 5;
universalId = 'asd';

function printId(id: number | string) {
	if (typeof id == 'string') {
		console.log(id.toUpperCase());
	} else {
		console.log(id);
	}
}

function helloUser(user: string | string[]) {
	if (Array.isArray(user)) {
		console.log(user.join('') + 'Hi');
	} else {
		console.log(user + 'Hi');
	}
}

////////
type coord = { lat: number; long: number };

interface ICoord {
	lat: number;
	long: number;
}

type ID = number | string;

function compute(coord: ICoord) {}

///
type Animal = {
	name: string;
};

type Dog = Animal & {
	tail: boolean;
};

const dog: Dog = {
	name: 'asd',
	tail: true,
};
////

interface Dogi {
	name: string;
}

interface Dogi {
	tail: true;
}

const dogi: Dogi = {
	name: 'asd',
	tail: true,
};
///

const z = 'asdasd';

const x: 'hi' = 'hi';

type direction = 'left' | 'right';

function moveDog(direction: direction): -1 | 0 | 1 {
	switch (direction) {
		case 'left':
			return -1;
		case 'right':
			return 1;
		default:
			return 0;
	}
}

///

interface IConnect {
	host: string;
	port: number;
}

function connect(connect: IConnect | 'default') {}

connect('default');
//

const cone = {
	host: 'asd',
	protocol: 'https' as 'http',
};

const v: any = 5;
const m = v as number;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function con() {}

// connect(cone.host, cone.protocol)

//

type dir = 'left' | 'right';

enum Dir {
	Left,
	Righ,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function move(dir: Dir) {
	switch (dir) {
		case Dir.Left:
			return -1;
		case Dir.Righ:
			return 1;
	}
}

function obj(_obj: { Left: number }) {}

obj(Dir);

const enum Dir2 {
	Up,
	Down,
}

const myDir = Dir2.Up;
