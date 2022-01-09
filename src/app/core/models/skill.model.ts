export interface ISkill {
  readonly skillName: Skill;
  readonly modifier: number;
}

export enum Skill {
  acrobatics = "Acrobatics",
  animals = "Animal Handling",
  arcana = "Arcana",
  athletics = "Athletics",
  deception = "Deception",
  history = "History",
  insight = "Insight",
  intimidation = "Intimidation",
  investigation = "Investigation",
  medicine = "Medicine",
  nature = "Nature",
  perception = "Perception",
  performance = "Performance",
  persuasion = "persuasion",
  religion = "Religion",
  sleight = "Sleight of Hand",
  stealth = "Stealth",
  survival = "Survival",
}

export const skillUtils = {
  updateSkillModifier
};

function updateSkillModifier(skill: ISkill, newMod: number): ISkill {
  if (newMod % 1 !== 0) {
    throw "Invalid Modifier"
  }
  return {
    ...skill,
    modifier: newMod
  }
}
