import {IAdventure} from "./adventure.model";

export interface ICampaign extends IAdventure {
  readonly adventures: ReadonlyArray<IAdventure>;
}
