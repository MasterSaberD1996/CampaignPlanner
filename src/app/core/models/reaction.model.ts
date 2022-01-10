import {IAction} from "./action.model";
import {IAttack} from "./atack.model";

export interface IReaction extends IAction {
}

export const reactionUtils = {
  updateAttacks
};

function updateAttacks(attacks: IAttack[], reaction: IReaction): IReaction {
  return {
    ...reaction,
    attacks: attacks
  };
}

