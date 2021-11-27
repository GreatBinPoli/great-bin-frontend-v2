export class Recycling {
  code!: number;
  recycling!: boolean;
}

export class Waste extends Recycling {
  iduser!: number;
  idbag!: number;
  description!: string;
  name!: string;
  Recycling!: Recycling;
}
