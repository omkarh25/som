OMS is a personal freedom framework, aiming to enable everyone to experience their true potential via performing activites they love

This is an attempt solving the dreaded bermuda triangle of MONEY, TIME and ENERGY, which I call Lakshmi (TrueWealth)

So lets track these important resources via:

1. Expense Tracker : Tracks all expenses with transaction id as primary key (kaas.db)
2. Meeting Tracker : Tracks all meetings with meeting time field as primary key (time.db)
3. Activity Tracker : Tracks all value added based on experience rating with activity id as primary key (shakti.db)


User Story:
1. Sidebar with Model, View, Controller, Settings
2. Model page Component: tanstack table implementation with dropdown for kaas.db, time.db, shakti.db
3. Controller page Component: Button for agentic actions
   a. Send telegram message to Serendipity member
   b. Schedule a meeting with a serendipity member
   c. Record and document to serendipity dms

4. View page Component: 
   a. Calendar view with filters for Expense, Meeting, Activity, (Make this the home page of the app)
   b. Asset View (Will be implemented later)
   c. Knowledge View (Will be implemented later)

Coding Guidelines:
1. Build frontend and backend in NextJS and FastAPI respectively.
2. Read the existing 'Transactions(Past) table in kaas.db sqlite file at the root of the project to read headers and sample data to design db schema for backend api. Create time.db and shakti.db based on the description I have provided.
3. Use /frontend and /backend folders for frontend and backend respectively.
4. Use SOLID principles during every step of development.
5. Make sure to optimize the api design for the backend.
6. Keep the front end app file clean. Try to build shared components with abstraction using shadcn techniques. Specifically keep the app pages short and managable.
7. Create /docs for documentation.
8. Create good README.md file helping user to setup and run the app locally.
9. Implement 3 shortcuts for common tasks like navigation between model, view, controller pages.
10. Use proper naming conventions for variables, functions, components, etc.
11. Use CLI tools for testing and running the app. Avoid browser based tools unless absolutely necessary to complete the task. Eg: Run curl commands to test api endpoints instead of using browser.
12. Add 3 unit test for db connection, 1 api end point testing, 1 browser based UI testing.
13. Dont hardcode any values. Try to keep the app abstract by using config files, yml files, env files.
14. Implement minimum viable product to begin with.


MVP:
Can you go throught the json and build MVP?