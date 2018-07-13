// Simple model for a hand result.
export class HandResult {
    public score: number; // Score between 0 and 300~ representing specific hand strength
    public handName: string; // hand name e.g. straight, high card 
  
    constructor(score: number, handName: string) {
        this.score = score;
        this.handName = handName;
    }
  }