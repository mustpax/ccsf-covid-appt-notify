# CCSF Covid Appointment Availability Notifier Script

UCSF operates a great vaccination site at the CCSF campus in southern San Francisco. Once all city residents above the age of 16 became eligible to get the vaccine, I wrote a script to notify me when appointments became available.

Of course, you can also be search for available vaccine appointments via https://myturn.ca.gov/ or https://www.vaccinateca.com/ . This is just the approach that worked for me.

Hope you get vaccinated soon! 💉🎉

## Installation

```sh
brew install watch
yarn install
```

To start watching for appointments:

```sh
yarn start
```

This will run the script every 3 minutes. You'll get a system notification that looks kinda like this when an appointment is found:

![](https://i.stack.imgur.com/REbdS.png)


## Requirements

System notifications require AppleScript so this only works on macOS.

## Use at your own risk

I wrote this script quickly so it's pretty fragile and will likely break
if the CCSF vaccine appointment website changes significantly. I make
no warranties, so use this at your own risk.
