export interface ISavingThrow {
  readonly skill: Ability;
  readonly modifier: number;
}

export type Ability = "Strength" | "Dexterity" | "Constitution" | "Intelligence" | "Wisdom" | "Charisma";
export const savingThrowUtils = {
  updateModifier
}

function updateModifier(savingThrow: ISavingThrow, newMod: number): ISavingThrow {
  if (newMod % 1 !== 0) {
    throw "Invalid Modifier"
  }
  return {
    ...savingThrow,
    modifier: newMod
  }
}
