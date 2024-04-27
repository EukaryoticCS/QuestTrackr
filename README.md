![QuestTrackr Logo](https://github.com/EukaryoticCS/QuestTrackr/assets/98478090/850fcf74-cea4-43f8-8407-02d2aa339c74)
<h2 align="center">
  The Video Game Completion Tracker of the Future
</h2>

Have you ever played a video game and wanted to see EVERYTHING it had to offer? Maybe you’re like me, a “Completionist”, and it only feels right to do everything: collect every item, finish every side quest, fight every monster. Super helpful for this process are “Completion Trackers”: fan-made websites, spreadsheets, and/or checklists for specific games made so other players can keep track of everything they have done and eventually “complete” the game. These trackers, however, are spread throughout the internet, are in various stages of completion, are not easily sharable with other gamers, and, maybe most importantly, do not look good or feel good to complete.  
   
My project, known as “QuestTrackr”, aims to centralize these Completion Trackers into a single web app where users can create templates for any game on any platform and upload them to the database for other users to add to their profile and track their individual completion on it. These templates are extremely customizable and visually pleasing. Users can share their profile and brag about the games they have completed, boasting game collections, achievements, and completion percentages.
   
This project is the end result of my Capstone class, in which students are tasked with taking on a large project of their own design and creating it from start to finish with little outside help in ten weeks.

<h2 align="center">
  Features:
</h2>

* User creation and authentication with SuperTokens
  * Sign up with user/pass or use Google or other OAuth
* Massive video game database
  * Powered by IGDB, QuestTrackr has a continually updating database of 250,000+ games -- basically any video game you can think of
  * Searchable with fuzzy searching and infinite scroll, allowing you to very easily find any game
* Highly customizable template creation
  * Create tracking templates for all of your favorite games
  * DrawIO/Canva-style drag-and-drop interface
  * Customizable font sizes, colors, backgrounds, node sizes, and more
  * Toggleable snap to grid feature for precise node positioning
* Ability to track your progress on all the games you're completing
  * Create your own template or find one made by other users for whatever game you're playing
  * Checkboxes, dropdowns, and collected/remaining number boxes for single collectibles, progressive upgrades, and numbered collectibles respectively
