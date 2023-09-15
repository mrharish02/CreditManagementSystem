const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require("express-session");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://credit_management:9mWyPFf8TY9FNh8@cluster0.ar9wxoy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const path = require('path');
const util = require('util');
const mongoConnect = util.promisify(MongoClient.connect);
const staticPath = path.join(__dirname, "/public");
console.log(staticPath);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(staticPath));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

// setting up variables to store data
var courseIndex = 0;
var prev_courseIndex = courseIndex;
var courseSelected = [];
var courseDisplay = [];
var courseChosen = [];
var username = ""
var person_name = ""
var initial_num_of_courses = 0;
var message = ""
var message_password = "Update your password"
var allCourses = []

app.get('/', (req, res) => {
    res.render('index');
})

app.get("/login", function(req, res) {
    console.log(req.body);
    res.render("login");
})

app.get('/changePassword', (req, res) => {
    if (username != "") {
        res.render("change-password", { message_password: "Update your Password" });
    } else {
        res.render("index", { message_login: "username not found" });
    }
})

app.get("/courses", async function(req, res) {
    try {
        if (username !== "") {
            const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Connected to MongoDB server");

            const db = client.db("Credit-Management");
            const dbo = db.collection("Course-Details");

            const result = await dbo.find().toArray();
            allCourses = result;
            courseDisplay = result.slice(courseIndex, courseIndex + 10);

            client.close();
            res.render("courses", { courseDisplay: courseDisplay, courseChosen: courseSelected, name: person_name, message: message });
            console.log("courses got rendered");
        } else {
            console.log("No username found");
            res.render("index", { message_login: "" });
        }
    } catch (err) {
        console.error("Error:", err);
        // Handle the error here, send an error response, or do appropriate error handling.
        res.status(500).send("Internal Server Error");
    }
});


app.post("/login", async function(req, res) {
    console.log("Username filled:", req.body.username);
    console.log("Password filled:", req.body.password);

    const buttonPressed = req.body.submit;

    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB server");

        const db = client.db("Credit-Management");
        const collection = db.collection("Password-Details");

        const result = await collection.findOne({ _id: req.body.username });

        if (result == null) {
            console.log("Credentials Not found");
            res.render("index");
        } else if (req.body.password == result["PASSWORD"]) {
            if (buttonPressed === "login") {
                console.log("Verified");
                console.log(result);

                // Add this line for debugging
                console.log("Fetching selected courses...");

                // Assuming fetchSelectedCourses is an asynchronous function
                await fetchSelectedCourses(req.body.username);

                // Add this line for debugging
                console.log("Selected courses:", courseSelected);

                username = req.body.username;
                console.log(username);
                person_name = result["NAME"];
                res.redirect("/courses");
                console.log("redirecting to courses page");
            } else if (buttonPressed === "change-password") {
                username = req.body.username;
                console.log("redirecting to change password page");
                res.redirect("/changePassword");
            }
        } else {
            console.log("Invalid Details");
            res.render("index", { message_login: "Invalid Details" });
        }

        client.close();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
});

app.post("/changePassword", async function(req, res) {
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const buttonPressed = req.body.submit;

    console.log(req.body);

    if (buttonPressed === "login") {
        res.redirect("/");
    } else if (buttonPressed === "change") {

        if (newPassword === confirmPassword) {
            console.log("Can change");

            try {
                const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
                await client.connect();
                console.log("Connected to MongoDB server");

                const db = client.db("Credit-Management");
                const collection = db.collection("Password-Details");

                const updateResult = await collection.updateOne({ _id: username }, { $set: { PASSWORD: newPassword } });

                if (updateResult.modifiedCount > 0) {
                    message_password = "Password changed!";
                    console.log("password changed succesfully");
                } else {
                    message_password = "Password update failed!";
                    console.log("password change failed");
                }

                client.close();
            } catch (err) {
                console.error("Error updating password:", err);
            }

        } else {
            message_password = "Passwords don't match";
        }

        res.render("change-password", { message_password: message_password });
    }
});

app.post("/logout", function(req, res) {
    console.log("Logging out");
    res.redirect("/");
});

function fetchSelectedCourses(username) {
    console.log(username)
    username = String(username);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Credit-Management");
        dbo.collection("Student-Course-Info").findOne({ _id: username }, function(err, result) {
            if (err) throw "Not Found";
            if (result != null) {
                var courses = result["Selected_Courses"];
                for (var i = 0; i < courses.length; i++)
                    courseSelected.push(courses[i]);
                initial_num_of_courses = courses.length;
            }
            db.close();
        });
    });
}

app.post("/courses", function(req, res) {

    console.log("Add or drop: " + req.body.add_drop);
    console.log("selected to add: " + req.body.selected_to_add);
    console.log("Selected to drop: " + req.body.selected_to_drop);

    // logic for showing next and previous page courses
    if (req.body.change == "prev") {

        courseIndex = courseIndex - 10;

    } else if (req.body.change == "next") {

        courseIndex = courseIndex + 10;

    }

    // logic for searching
    else if (req.body.change == "search") {
        searchInput = req.body.searchInput;
        searchInput = searchInput.toUpperCase();
        prev_courseIndex = courseIndex;
        if (searchInput != "") {


            var indexSearch = allCourses.findIndex(x => x._id.includes(searchInput) === true);
            console.log(indexSearch)
            if (indexSearch != -1) {
                courseIndex = indexSearch;
            }

        } else if (searchInput = "") {
            courseIndex = prev_courseIndex;
        }
    }

    console.log(req.body)

    // logic for adding and dropping courses
    if (req.body.add_drop == "Add") {
        check = req.body.selected_to_add;
        if (check != null) {
            for (var i = 0; i < check.length; i++) {
                var p = true;
                if (courseSelected != null) {
                    for (var j = 0; j < courseSelected.length; j++) {
                        if (courseSelected[j]["_id"] == courseDisplay[Number(check[i])]["_id"]) {
                            p = false;
                            break;
                        }
                    }
                }
                console.log(p);
                if (p == true) {
                    courseSelected.push(courseDisplay[Number(check[i])]);
                }
            }
        }
    } else if (req.body.add_drop == "drop") {
        check = req.body.selected_to_drop;

        if (check != null) {
            if (typeof(check) != 'string') {
                for (var i = 0; i < check.length; i++) {
                    for (var j = 0; j < courseSelected.length; j++) {

                        if (courseSelected[j]._id === check[i]) {

                            courseSelected.splice(j, 1);

                        }
                    }
                }
            } else if (typeof(check) == 'string') {

                for (var j = 0; j < courseSelected.length; j++) {

                    if (courseSelected[j]._id === check) {

                        courseSelected.splice(j, 1);

                    }
                }
            }
        }
    } else if (req.body.submit == "submit") {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Credit-Management");
            var total_credits = Number(0);
            for (var i = 0; i < courseSelected.length; i++) {
                total_credits += Number(courseSelected[i].CREDITS);
            }
            console.log(total_credits);
            if (total_credits <= 23) {
                if (initial_num_of_courses != 0) {
                    var newvalues = { $set: { Selected_Courses: courseSelected } };
                    dbo.collection("Student-Course-Info").updateOne({ _id: username }, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log(res);
                        db.close();
                    });
                    message = "Courses Updated Successfully!";
                } else {
                    var newvalues = [{
                        "_id": username,
                        "Selected_Courses": courseSelected
                    }]
                    var dbo = db.db("Credit-Management");
                    var p = false;
                    dbo.collection("Student-Course-Info").findOne({ _id: username }, function(err, result) {
                        if (err) throw "Not Found";
                        if (result != null) {
                            console.log("Hello");
                            var newvalues = { $set: { Selected_Courses: courseSelected } };
                            dbo.collection("Student-Course-Info").updateOne({ _id: username }, newvalues, function(err, res) {
                                if (err) throw err;
                                console.log(res);
                                db.close();
                            });
                            p = true;
                            message = "Courses Updated Successfully!";
                        }
                    });
                    if (p == false) {
                        dbo.collection("Student-Course-Info").insertMany(newvalues, function(err, res) {
                            if (err) throw err;
                            console.log(res);
                            initial_num_of_courses = courseSelected.length;
                            db.close();
                        });
                        message = "Courses Inserted Successfully!";
                    } else
                        db.close();
                }
            } else
                message = "You can add upto 23 credits only.";

        });
    }
    console.log("Selected Courses: " + courseSelected);
    console.log("------------");
    res.redirect("/courses");

});

// Setting up the port and making it listen to requests
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Server started at: http://localhost:" + String(port) + "/");
});