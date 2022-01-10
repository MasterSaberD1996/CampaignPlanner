import {IAttack} from "./atack.model";

export interface ITrait {
  readonly name: string;
  readonly description: string;
  readonly usageLimitType: UsageLimitType;
  readonly attacks: ReadonlyArray<IAttack>;
}

export enum UsageLimitType {
  none = "None",
  noPerDay = "x/Day",
  r26 = "Recharge 2-6",
  r36 = "Recharge 3-6",
  r46 = "Recharge 4-6",
  r56 = "Recharge 5-6",
  r6 = "Recharge 6",
  rsr = "Recharge on short rest",
  rlr = "Recharge on long rest"
}

export const traitUtils = {
  updateAttacks
};

function updateAttacks(attacks: IAttack[], trait: ITrait): ITrait {
  return {
    ...trait,
    attacks: attacks
  };
}
