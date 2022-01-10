import {ITrait} from "./trait.model";
import {IAttack} from "./atack.model";

export interface IAction extends ITrait {
}

export const actionUtils = {
  updateAttacks
};

function updateAttacks(attacks: IAttack[], action: IAction): IAction {
  return {
    ...action,
    attacks: attacks
  };
}
