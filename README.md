Welcome to events-app project.
You can see events and to register for any event in the app.


To run backend:
cd backend ,
npm i,
npm run dev.

To run EventApp:
cd EventApp,
npm i,
npm run start,
npm run android,
(cd ios, pod install, npm run ios).

For deeplink in android run: adb shell am start -W -a android.intent.action.VIEW -d "myapp://event/1" com.eventapp
