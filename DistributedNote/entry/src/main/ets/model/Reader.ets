export default class Reader {
  constructor(public context: string, public lasOff: number, public scoOff: number) {
    this.context = context
    this.lasOff = lasOff
    this.scoOff = scoOff
  }
}