import { Component, OnInit } from '@angular/core';
import {ICampaign} from "../../../core/models/campaign.model";
import {Skill} from "../../../core/models/skill.model";
import {SpellLevel} from "../../../core/models/spell-slots.model";
import {MagicSchool} from "../../../core/models/spell.model";
import {UsageLimitType} from "../../../core/models/trait.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements OnInit {
  public campaigns: ICampaign[] = [{
    id: 1,
    name: "Test campaign",
    adventures: [
      {
        name: "Test adventure",
        encounters: [
          {
            combatants: [
              {
                isEnemy: true,
                monster: {
                  ac: 13,
                  class: "Test",
                  name: "Monster 1",
                  abilities: {
                    dexterity: 13
                  },
                  actions: [],
                  armor: 'natural',
                  cr: "1",
                  race: "Human",
                  hitDice: "1d8",
                  hpMax: 6,
                  level: 1,
                  size: "Medium",
                  conditionImmunities: undefined,
                  damageImmunities: undefined,
                  damageResistances: undefined,
                  damageVulnerabilities: undefined,
                  description: 'test',
                  environment: [
                    "test"
                  ],
                  hpCurrent: 6,
                  initiative: 0,
                  languages: 'common',
                  passive: 0,
                  reactions: [],
                  savingThrows: [
                    {
                      modifier: -2,
                      skill: "Dexterity"
                    }
                  ],
                  senses: undefined,
                  skills: [
                    {
                      modifier: 5,
                      skillName: Skill.deception
                    }
                  ],
                  speed: '30',
                  spells: [
                    {
                      name: "Test Spell",
                      components: ['Verbal'],
                      description: "description",
                      castingTime: "action",
                      level: SpellLevel.cantrip,
                      diceRoles: [
                        "1d8"
                      ],
                      duration: '1 hour',
                      isRitual: false,
                      range: 60,
                      school: MagicSchool.no
                    }
                  ],
                  spellSlots: [
                    {
                      slotCount: Number.POSITIVE_INFINITY,
                      level: SpellLevel.cantrip
                    }
                  ],
                  traits: [
                    {
                      name: "traitor",
                      attacks: [],
                      description: "descriptive text",
                      usageLimitType: UsageLimitType.none
                    }
                  ],
                  type: [
                    "Beast"
                  ],
                  legendaryActions: []
                }
              }
            ],
            notes: [],
            treasures: []
          }
        ],
        notes: [],
        treasures: [],
        npcs: [],
        pcs: [
          {
            senses: undefined,
            traits: [],
            spells: [],
            speed: '60',
            skills: [],
            spellSlots: [],
            savingThrows: [
              {
                skill: "Strength",
                modifier:6
              }
            ],
            passive: 0,
            languages: 'common',
            reactions: [],
            initiative: 9,
            description: '',
            ac: 20,
            conditionImmunities: undefined,
            level: 1,
            size: "Gargantuan",
            hpCurrent: 50,
            hpMax: 50,
            damageVulnerabilities: undefined,
            hitDice: '1d20',
            race: "Elf",
            armor: "none",
            actions: [],
            damageResistances: undefined,
            name: "Torwag",
            class: 'Bard',
            damageImmunities: undefined,
            abilities: []
          }
        ]
      }
    ],
    npcs: [],
    pcs: [
      {
        senses: undefined,
        traits: [],
        spells: [],
        speed: '60',
        skills: [],
        spellSlots: [],
        savingThrows: [
          {
            skill: "Strength",
            modifier:6
          }
        ],
        passive: 0,
        languages: 'common',
        reactions: [],
        initiative: 9,
        description: '',
        ac: 20,
        conditionImmunities: undefined,
        level: 1,
        size: "Gargantuan",
        hpCurrent: 50,
        hpMax: 50,
        damageVulnerabilities: undefined,
        hitDice: '1d20',
        race: "Elf",
        armor: "none",
        actions: [],
        damageResistances: undefined,
        name: "Torwag",
        class: 'Bard',
        damageImmunities: undefined,
        abilities: []
      }
    ],
    notes: [],
    treasures: [],
    encounters: []
  }];

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  routeToCampaign(campaign: ICampaign) {
    this.router.navigate(['campaigns', campaign.id])
  }
}
