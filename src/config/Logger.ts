interface ILog {
  message: string;
  time: string;
  type: 'info' | 'error' | 'debug';
}

export default class Logger {
  public logs: ILog[] = [];

  public module: string;

  constructor(filename: string) {
    this.module = filename.replace(
      'C:\\Users\\flohu\\OneDrive\\Documents\\Projekte\\FoodForYou\\server\\src\\',
      ''
    );
  }

  get count(): number {
    return this.logs.length;
  }

  public log(message: string, type?: 'info' | 'error' | 'debug'): void {
    const time: string = new Date().toISOString().split('T')[1];
    this.saveLog({ message, time, type: type || 'debug' });
    console.log(
      ` \n ${this.module}: [${type || 'debug'}] [${time}] ${message}`
    );
  }

  private saveLog(data: ILog): void {
    this.logs.push(data);
  }
}
