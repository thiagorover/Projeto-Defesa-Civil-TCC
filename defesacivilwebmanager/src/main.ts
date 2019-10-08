import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {User} from "./app/private/users/user";
import {userInfo} from "os";

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
