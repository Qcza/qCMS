import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';

export const publicImgsPath = './static/public/images'
export const publicFilesPath = './static/public/files'

platformBrowserDynamic().bootstrapModule(AppModule);
