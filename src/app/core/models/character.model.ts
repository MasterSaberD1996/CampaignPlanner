import {Ability, ISavingThrow} from './saving-throw.model'
import {ISkill} from "./skill.model";
import {ITrait} from "./trait.model";
import {IAction} from "./action.model";
import {IReaction} from "./reaction.model";
import {ISpellSlot} from "./spell-slots.model";
import {ISpell} from "./spell.model";

export interface ICharacter {
  readonly name: string;
  readonly race: string;
  readonly class: string;
  readonly level: number;
  readonly size: Size;
  readonly ac: number;
  readonly armor: string;
  readonly hpMax: number;
  readonly hpCurrent: number;
  readonly hitDice: string;
  readonly speed: string;
  readonly initiative: number;
  readonly abilities: {// @ts-ignore
    [key: Ability]: number};
  readonly savingThrows: ReadonlyArray<ISavingThrow>;
  readonly skills: ReadonlyArray<ISkill>;
  readonly damageVulnerabilities: string;
  readonly damageResistances: string;
  readonly damageImmunities: string;
  readonly conditionImmunities: string;
  readonly senses: string;
  readonly passive: number;
  readonly languages: string;
  readonly traits: ReadonlyArray<ITrait>;
  readonly actions: ReadonlyArray<IAction>
  readonly reactions: ReadonlyArray<IReaction>;
  readonly spellSlots: ReadonlyArray<ISpellSlot>;
  readonly spells: ReadonlyArray<ISpell>;
  readonly description: string;
}

export type Size = "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";
