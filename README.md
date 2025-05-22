No this Project has not been added to a web hosting site as most options tend to get greedy and flag websites not in use as malicious. So if you want to tinker around with this, 
feel free to download it and when you open visual studio code you can then create a split terminal. you will want to run several commands to get started.
No nothing goes over the internet to do anything, all data and functionality happens inside the WaterProject project folder and is displayed on your browser.

For the frontend:
(assuming you are in the WaterProjects folder)
cd frontend <-- this will take you to the frontend folder
npm run dev <-- this will start the locally hosted webpage
*Frontend Done*

For the backend:
cd backend <-- move into the backend folder
cd WaterProject <-- move into the backend where the data and files are
dotnet watch run <-- runs the local server (hosted by your machine) so that the frontend can get data and any changes (you) made in the code will automatically be updated and reflected

In order to get to the admin page to rund CRUD operations such as add, delete, update, in the URL at the top of the browser (should say http://localhost:3000/) add "admin" to the end. 
So it should say: "http://localhost:3000/admin" to get to the admin page and modify the database.

Frontend languages and framework: React, Javascript, Bootstrap
Backend languages and framework: C#, .Net, Sqlite
