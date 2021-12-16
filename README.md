# The-Gourmet-Tavern

A React Application for a Restaurant and Bar Setup.

    The Project has been setup to install both from one location (Root Directory of the Project)

    But Running the code, we need to run a run things, 
        1. Environmental Variable needs to be created. 
        2. Modules need to be installed for both Frontend and Backend.

#  .env file
    Create a .env file under the root folder with the following key value pair as content
    
    SECRET_TOKEN=yoursecrettoken

    This is used for authentication of the user

#   npm run setup

    Modules for both Frontend and Backend are installed with this command.
    

After the modules get installed - Both the Frontend and Backend need to be run.
The Server and Client will usually run on different ports. 
With the Proxy Setup on the Client Side - the API URL's will be correctly redirected to the required Port.
Both the following Methods are Run form the Outermost package.json File Level.
    
#   npm start
    Run the Client and Server in Development Mode
    Achieved Using package "concurrently" and defined "custom scripts".
    
#   npm run build
    Runs the Server and A Build Version of the Client
    In this method, a build folder for the frontend will be created.
    This will then need to be Served to the Browser. 
    All the required steps for this setup have been declared as part of the Custom Scripts.
    
    The Build will be Served at a Particular Link which should be seen in the Terminal/Output. 

#   Project Features
The Setup will include the following Features

    Customers Features - End User
        1. Registration and Login System
        2. Menu Display - Food and Drinks
        3. About and Contact Pages
        4. Ordering System
        5. Active Cart System

    Administration Features - End User
        1. Same Features as that of a Customer 
        2. CRUD Operations for the Items
            a. Add Items - Food and Drink
            b. Delete Items - Food and Drink
            c. Update Items - Food and Drink

    Technical Features - Working Behind the Scenes
        1. NoSQL Schema Database - MongoDB
        2. Node and Express JS Backend
        3. JWT Authentication for Session Management
        4. Encryted Passwords for Saving in the Database
        5. React Redux Architecture for State Management on the Client Side
        6. React-Router Navigation - Page Navigation 

# Sample Products JSON.
There is a sample Products JSON file that can be added to the MongoDB setup. 

If creating before running the code then, 

    1. The Database name has to be "The-Gourmet-Tavern". 
    2. The collection has to be "products".

If inserting the documents after running the code - 
    Insert the documents, after running the npm start / npm run build and before navigating through the site, to the products collection created in the database.
