export type IPlayer = {
  name: string;
  username: string;
  position: number;
  stack_size: number;
  cards?: IPocketHand;
};

export type ICard = [string, string]; //suit,value

export type IPocketHand = [ICard, ICard];
