# Credit-Management

Any student of IIT Mandi from UG to PG can login using their rollnumber as username and a password provided by us to manage their credits for the current semester. A list of all the courses which are
being offered in our College will be shown and the Students and they can browse through them to choose the courses they want, with the credit limit being that of 23 credits for a particular Semester.

### TechStack
We have made our Web application using node.js and express.js for the backend and are storing the data on MongoDB Atlas.

-Frontend
EJS, CSS, Javascript

-Backend
Node.js, Express.js, MongoDB Atlas

### Running the Webapp
To run in the Terminal, type the command "nodemon app.js" 
The application will be live on localhost Server 5000.

We have also deployed our application using Heroku. It can be found on the following link : 

https://credit-management-project.herokuapp.com/

### Database
We have used MongoDB for storing our Data. Reason for preferring MongoDB over mySQL is that MongoDB is faster than MySQL due to its ability to handle large amounts of unstructured data when it comes to speed. The name of the database is Credit-management and it has 3 collections:

-Course-Details
This collection has 474 documents. It stores all the courses and their details. 
-Password-Details
This collection has 1.7k documents. It stores the information of all UG and PG students and their Passwords. 
-Student-Course-Info
This collection stores the courses and their details chosen by the Student for a particular Semester.

![Database Schema](https://user-images.githubusercontent.com/75574159/141312153-db330b1d-3b39-4b16-8fdb-b6d1afd4c282.jpeg)

### Login Page
![image](https://user-images.githubusercontent.com/75574159/141312957-d6446352-58ef-4316-bbe5-cd62aeaaa548.png)

-Main login page :
We have added the Roll numbers and Passwords for everyone in our Database in the collection "Password-Details". One can use their Roll number and the initial Password as 12345 to log in.
The user has to Enter their Roll number and password and only if they are correct the user can choose the option to Login or change the password, if they don't match then a message will be displayed at the bottom.

- Password Change Page
There is also an option to change the Password, on choosing that the user is directed to a new page for changing the password where they have to enter and then Re-enter their new password. If the 2 passwords don't match then the message is displayed at the bottom and no updation takes place. If the passwords are correct then on clicking the 'Submit' button, the password for that user gets updated in the 'Password-Details' Collection.

### Credit management Page
![image](https://user-images.githubusercontent.com/75574159/141313066-a4eed76f-9c25-4ae5-a5af-39bf06c5217c.png)

- The user can select the courses they want to Add and then select the green ADD button. Multiple courses can be added at once.
- The user can drop certain courses if they aren't sure if they want to take them by selecting the courses they want to drop from the 'Selected Courses' table and then selecting the red DROP button.
- Once the user is sure about the courses they want to take for the Semester, they can click the Submit button at the bottom. A message about the Successful Updation of courses is displayed at the bottom. 
- Only when the user clicks the 'Submit' button the courses are updated in the MongoDB database, otherwise, the courses won't be updated. This gives the user time to select and finalize the final courses they want to take.
- There is a credit limit of 23 credits for one semester. If the total credits of the Selected courses exceed 23 credits when the user selects Submit button then the courses will not be updated and a message will be displayed about the Credits exceeding the limit.
- There is also a feature of searching for courses based on the Course code. For example, if the user wants to see all the Computer Science courses, they can type 'CS' and click the 'Search' button and the required courses will be displayed in the table.
- The user can navigate the table of courses by using the 'Next' and 'Previous' buttons provided.
- After the user is done managing their credits, they have the option to Logout from their account.

### Future Scope
We feel there are a lot of other features we can add in out Project and we'll surely take it as a future assignment for ourselves. Our plans about adding further features and modifications include :
- Currently the user can manage courses of a single semester only, we can extend that so that the user can see courses for previous semesters and add new courses for their current one. Collecting the database for this will be a limitation while implementing this feature.
- Customize the credit management system according to the Branch of the Student. For different branches there'll be different courses as Dicipline core and Discipline elective and the student needs to complete their credits for the same. For this we'll need information about the branch of Students and also categorize different courses ad DC, DE etc.
