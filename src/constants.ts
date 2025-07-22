export interface TestCase {
  width: number;
  height: number;
  length: number;
  mass: number;
  description: string;
}

export const testCases: TestCase[] = [
  {
    width: 90,
    height: 90,
    length: 90,
    mass: 10,
    description: "Standard Package",
  },
  {
    width: 200,
    height: 50,
    length: 50,
    mass: 15,
    description: "Special Package (Bulky)",
  },
  {
    width: 150,
    height: 150,
    length: 150,
    mass: 25,
    description: "Rejected Package (Both Bulky & Heavy)",
  },
];
