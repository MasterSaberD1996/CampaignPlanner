import {ICharacter} from "./character.model";
import {IEncounter} from "./encounter.model";
import {INote} from "./note.model";
import {ITreasure} from "./treasure.model";

export interface IAdventure {
  readonly name: string;
  readonly pcs: ReadonlyArray<ICharacter>;
  readonly npcs: ReadonlyArray<ICharacter>;
  readonly encounters: ReadonlyArray<IEncounter>;
  readonly notes: ReadonlyArray<INote>;
  readonly treasures: ReadonlyArray<ITreasure>;
}
