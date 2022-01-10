import {INote} from "./note.model";
import {ITreasure} from "./treasure.model";
import {ICombatant} from "./combatant.model";

export interface IEncounter {
  readonly combatants: ReadonlyArray<ICombatant>;
  readonly notes: ReadonlyArray<INote>;
  readonly treasures: ReadonlyArray<ITreasure>;
}
