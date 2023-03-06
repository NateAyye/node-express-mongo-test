# Node JS Tutorial Series Test Backend - Express, Node, Mongo with Mongoose: Async CRUD

Everything for a Backend set with Express.js and Mongo and you can replace 
Mongo with and database of your choosing.

[Big shout out to Dave Gray with his amazing and insightful tutorial Series](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw).

## File Structure

```
  config/ //Configuration Files
    allowedOrigins.js
    roles_list.js
    ...
  controllers/ //Route Controllers: CRUD
    authController.js
    registerController.js
    logoutController.js
    ...
  logs/ //Logging files
    reqLog.txt
    errLog.txt
    ...
  middleware/ //Express Middleware Folder
    errorHandler.js
    logEvents.js
    verifyJWT.js
    verifyRoles.js
    ...
  model/ //Schema's for the database that you are using
    Employee.js
    User.js
    ...
  public/ //Public files that needs to be accessed by the client. (img's, Text, even styleSheets)
    img/ //Any images that could be rendered on the servers views
      BrandImg.png
      ...
    text/ // Any text needed for rendering the views from the server
      data.txt
      ...
    css/ // styleSheet needed for the views
      style.css
      ...
  routes/
    api/ //Handles the routing for the server and which controller function to use
      employees.js
      users.js
      ...
    auth.js
    refresh.js
    register.js
    logout.js
    root.js
    ...
  views/
    subdir/ //Any subdirectory that you want to make just make sure to handle the routing in the server
    404.html
    index.html
  server.js //The main Node/Express Server that brings all of it together.
```
[<img src="https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix-button.svg" width="163px" />](https://glitch.com/edit/#!/import/github/NateAyye/node-express-mongo-test)

**Deploy by clicking the button above**# node-express-mongo-test
