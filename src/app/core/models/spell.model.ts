import {SpellLevel} from "./spell-slots.model";

export interface ISpell {
  readonly name: string;
  readonly level: SpellLevel;
  readonly school: MagicSchool;
  readonly isRitual: boolean;
  readonly castingTime: string;
  readonly range: number;
  readonly components: ['Verbal', 'Somatic', 'Material'];
  readonly duration: string;
  readonly description: string;
  readonly diceRoles: ReadonlyArray<string>
}

export enum MagicSchool {
  no = "None",
  abj = "Abjuration",
  con = "Conjuration",
  div = "Divination",
  enc = "Enchantment",
  evo = "Evocation",
  ill = "Illusion",
  nec = "Necromancy",
  tra = "Transmutation"
}
