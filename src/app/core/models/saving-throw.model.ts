export interface ISavingThrow {
  readonly skill: Ability;
  readonly modifier: number;
}

export enum Ability {
  str = "Strength",
  dex = "Dexterity",
  con = "Constitution",
  int = "Intelligence",
  wis = "Wisdom",
  cha = "Charisma"
}

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
