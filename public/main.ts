import { platformBrowserDynamic }    from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { UpgradeModule } from '@angular/upgrade/static';
import { downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';
import { NameParser } from './admin/nameParser.service';
import { UnreviewedTalkComponent  } from './home/unreviewedTalk.component';
import { ProfileComponent } from './profile/profile.component';
import { Sessions } from './sessions/sessions.service';
import { DetailPanelComponent } from './common/detailPanel.component';
import { ResultsComponent } from './admin/results.component';

// this is done to make sure that typescript knows about all the rxjs operations
import './rxjsOperations';

declare var angular: angular.IAngularStatic;

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  // upgrades & downgrades
  angular.module('app')
    .factory('nameParser', downgradeInjectable(NameParser))
    .factory('sessions_v2', downgradeInjectable(Sessions))
    .directive('unreviewedTalk', downgradeComponent({
        component: UnreviewedTalkComponent,
        inputs: ['session'],
        outputs: ['voteYes', 'voteNo']
    }))
    .directive('profile', downgradeComponent({
        component: ProfileComponent
    }))
    .directive('detailPanel', downgradeComponent({
      component: DetailPanelComponent,
      inputs: ['initialCollapsed:collapsed', 'title']
    }))
    .directive('results', downgradeComponent({
      component: ResultsComponent,
      inputs: ['sessionsByVoteDesc:allSessions']
    }))

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['app']);
  console.log('hybrid app bootstrapped');
})
