interface HasLen {
  length: number;
}


function log<T extends HasLen, K>(obj: T, arr: K[]): K[] {
  obj.length
  console.log(obj);
  return arr;
}

interface IUser {
  name: string;
  age?: number;
  bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
  return true;
}

