# Lively
A platform for creating a pill schedule for newly diagnosed Type 2 Diabetes patients. A live demo of the app can be accessed here: https://final-project-ketchup-clinic.herokuapp.com/

## Installation
```
npm install
```

## Usage
```
npm run build
npm start
```
Navigate to `localhost:3000` in your browser

### Please note that all of error checking has not been implemented, so here are instructions on how to use Lively
1. first create an account with a username and password
2. click onboarding to kick off the process to create a drug regimen
### Rules for Adding Drugs
3. select drugs from the drop and the click add. Make sure to add at least one, we currently do not have error checking to ensure you added at least one drug. If you click next step without adding a drug, you cannot go back.
### Rules for Adding Activites 
4. After adding a drug, you get to an activities page. This is where you add your sleep, eating, and exercise schedule. 
5. Please note we do not have error checking for the Activities page implemented. 
6. For each activity, do not enter an End time that is before the Start Time. 
7. A meal's start time cannot overlap with an exercise time.
8. You can cannot have a meal or exercise before wake up time. 
9. To help remember what you have inputed, when you click Add - your input is shown below. Use this to ensure your added meal won't overlap with an exercise. 
10. once you've added some activites - click save schedule

### Seeing your schedule
10. Once you click save schedule on the activites, you will be presented with text that will tell you when to take the drugs you added. Future version of the app will look much nicer!

(If you click Sign out during any part of the process, you will have to restart)