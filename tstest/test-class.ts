class Coord {
  lat: number;
  long: number;

  protected test() {
    if(this.lat >0) {
      
    }
  }

  computeDist(newLat: number, newLong: number): number {
    return 0;

  }

  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }

}

const point = new Coord(1, 1);

class MapLocal extends Coord {
  _name: string;

  get name() {
    return this._name
  }
  set name(s: string) {
    this._name = s + 'asd1'
  }

  override computeDist(newLat: number, newLong: number): number {
    return 1;
  }
  constructor(lat: number, long: number, name: string) {
    super(lat, long);
    
  }
}



interface LoggerServ {
  log: (s: string) => void;

}

class Logger implements LoggerServ {
  public log(s: string) {
    console.log(s);
  }

  private error() {

  }

  private a = '';
}


const l = new Logger();
l.log('d')



class MyClass<T> {
  a: T;
  
}

const n = new MyClass<string>();
n.a


abstract class Base {
  print(s: string) {
    console.log(s);
  }

  abstract error(s: string): void;
}

class BaseExt extends Base {
  error(s: string){
    
  }
}

new BaseExt().print('s')

class Animals {
  name: string;
}

class Dogs {
  name: string;
  tail: boolean;
}

const puppy: Animals = new Dogs();

///

let k = 'Privet!';

if (typeof k == 'string') {

}

let p: typeof k;


type Cord = {
  lat: number;
  long: number;
}

type P = keyof Cord;

let o: P = 'long'



function login(a: string | null): void {
  a?.toLowerCase();
}




