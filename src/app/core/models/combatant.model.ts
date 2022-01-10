import {ICharacter} from "./character.model";
import {IMonster} from "./monster.model";

export interface ICombatant {
  readonly isEnemy: boolean;
  readonly character?: ICharacter;
  readonly monster?: IMonster;
}
