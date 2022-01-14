import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {DatabaseService} from "../../../core/services/database.service";
import {switchMap} from "rxjs";
import {ICampaign} from "../../../core/models/campaign.model";
import {routeOnSuccess} from "../../../core/operators/routeOnSuccess";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit {
  // @ts-ignore
  public form: FormGroup;

  constructor(
    private readonly reCaptchaV3Service: ReCaptchaV3Service,
    private readonly databaseService: DatabaseService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl()
    });
  }

  public createCampaign(): void {
    if (!this.form.valid) {
      return;
    }
    let id = 0;
    const value = this.form.value;
    this.reCaptchaV3Service.execute('createCampaign')
      .pipe(
        switchMap(() => {
          return this.databaseService.loadedData$
        }),
        switchMap((campaigns) => {
          const campaign: ICampaign = {
            name: value.name,
            id: campaigns.length + 1,
            adventures: [],
            encounters: [],
            pcs: [],
            treasures: [],
            notes: [],
            npcs: []
          }
          id = campaigns.length + 1
          return this.databaseService.saveCampaign(campaign)
        }),
        routeOnSuccess(this.router, 'campaigns', id.toString())
      ).subscribe();
  }
}
