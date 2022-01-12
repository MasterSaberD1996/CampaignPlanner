import {IAdventure} from "./adventure.model";

export interface ICampaign extends IAdventure {
  readonly id: number;
  readonly adventures: ReadonlyArray<IAdventure>;
}
