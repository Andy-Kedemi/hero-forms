export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string,
    public message?: string,
    public searchCount = 0,
  ) {}
}

export type NewHero = Omit<Hero, 'id' | 'searchCount'> & { searchCount?: number };
