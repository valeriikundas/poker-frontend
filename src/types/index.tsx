export type IPlayer = {
  name: string;
  username: string;
  position: number;
  stack_size: number;
  cards?: IPocketHand;
};

type ISuit = "diamonds" | "hearts" | "clubs" | "spades";

export type ICard = {
  suit: ISuit;
  value: string;
};

export type IPocketHand = [ICard, ICard];

export type ActionType = "fold" | "check" | "call" | "raise";

export type IRequestAction = {
  type: ActionType;
  size?: number;
  min?: number;
  max?: number;
};
