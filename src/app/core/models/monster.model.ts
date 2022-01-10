import {ICharacter} from "./character.model";
import {IAction} from "./action.model";

export interface IMonster extends ICharacter {
  readonly legendaryActions: ReadonlyArray<IAction>;
  readonly environment: ReadonlyArray<string>;
  readonly cr: CombatRating;
  readonly type: ReadonlyArray<MonsterType>;
}

export type CombatRating = "0" | "1/8" | "1/4" | "1/2" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30";
export type MonsterType = "Aberration" | "Beast" | "Celestial" | "Construct" | "Dragon" | "Elemental" | "Fey" | "Fiend" | "Giant" | "Humanoid" | "Monstrosity" | "Ooze" | "Plant" | "Undead";
