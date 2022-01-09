export interface ISpellSlot {
  readonly level: SpellLevel;
  readonly slotCount: number
}

export enum SpellLevel {
  one = 1,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine
}

export const spellSlotsUtils = {
  updateSlotCount
};

function updateSlotCount(slot: ISpellSlot, newCount: number): ISpellSlot {
  if (newCount < 0 || newCount % 1 !== 0) {
    throw new Error("Invalid count");
  }
  return {
    ...slot,
    slotCount: newCount
  }
}
