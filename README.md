# Timer Management App
A React Native app for creating, managing, and tracking multiple customizable timers.

## Features
✅ Create and manage timers  
✅ Group timers and apply bulk actions  
✅ Visualize timer progress  
✅ Track timer history  

## Installation & Setup
1. Clone this repository:
   git clone https://github.com/Basavaraj4650/HealthFlex.git
   cd HealthFlex
   
Install dependencies:
npm install

Start the app:
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS (Mac required)

Assumptions
Timers are stored locally using AsyncStorage.
Users can categorize timers into different groups.
Bulk actions apply to selected timers simultaneously.

Tech Stack
React Native – Cross-platform mobile framework.
AsyncStorage – Persistent storage for timers.
React Navigation – Handles app navigation.

Usage
Navigate to the "Timers" screen to create a new timer.
Group timers into categories.
Use bulk actions to start, pause, or reset multiple timers at once.
View progress visualization on the dashboard.
Access the "History" tab to review completed or paused timers.
