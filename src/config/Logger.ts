/* eslint-disable no-unused-vars */

interface log {
  message: string;
  time: string;
  type: string;
}

export default class Logger {
  public logs: log[] = [];

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

  public log(message: string, type?: string): void {
    const time = new Date().toISOString().split('T')[1];
    this.saveLog({ message, time, type: type || 'debug' });
    console.log(
      ` \n ${this.module}: [${type || 'debug'}] [${time}] ${message}`
    );
  }

  private saveLog(data: log): void {
    this.logs.push(data);
  }
}
