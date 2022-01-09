export interface IAttack {
  readonly name: string;
  readonly atkBonus: number;
  readonly damage: string;
}

export const attackUtils = {
  updateAttackBonus,
  updateDamage
}

function updateAttackBonus(attack: IAttack, newMod: number): IAttack {
  return {
    ...attack,
    atkBonus: newMod
  };
}

function updateDamage(attack: IAttack, newDamageAmt: string): IAttack {
  return {
    ...attack,
    damage: newDamageAmt
  }
}
