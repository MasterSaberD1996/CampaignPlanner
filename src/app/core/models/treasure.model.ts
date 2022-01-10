export interface ITreasure {
  readonly id: number;
  readonly name: string;
  readonly weight?: number;
  readonly value?: number;
  readonly valueType?: ValueType;
  readonly quantity?: number;
  readonly category?: TreasureCategory;
  readonly isMagical?: boolean;
  readonly description?: string;
}

export enum ValueType {
  CP = "CP",
  SP = "SP",
  EP = "EP",
  GP = "GP",
  PP = "PP"
}

export enum TreasureCategory {
  adGear = "Adventuring Gear",
  lArmor = "Light Armor",
  mArmor = "Medium Armor",
  hArmor = "Heavy Armor",
  shield = "Shield",
  mWeapon = "Melee Weapon",
  rWeapon = "Ranged Weapon",
  ammo = "Ammunition",
  rod = "Rod",
  staff = "Staff",
  wand = "Wand",
  ring = "Ring",
  potion = "Potion",
  scroll = "Scroll",
  wItem = "Wondrous Item",
  wealth = "Wealth"
}
