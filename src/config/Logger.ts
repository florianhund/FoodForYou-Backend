import { ILog } from '../api/v1/interfaces';

export default class Logger {
  private _logs: ILog[] = [];

  public module: string;

  constructor(filename: string) {
    this.module = filename.replace(
      'C:\\Users\\flohu\\OneDrive\\Documents\\Projekte\\FoodForYou\\',
      ''
    );
  }

  get count(): number {
    return this._logs.length;
  }

  get logs(): ILog[] {
    return this._logs;
  }

  public log(message: any, type?: 'info' | 'error' | 'debug'): void {
    const time = new Date().toISOString().split('T')[1];
    this.saveLog({ message, time, type: type || 'debug' });
    process.stdout.write(` \n ${this.module}: [${type || 'debug'}] [${time}] `);
    console.log(message);
  }

  private saveLog(data: ILog): void {
    this._logs.push(data);
  }
}
