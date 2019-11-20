var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    pass: '',
    database: 'mydb'
});


// Example of a SELECT query outputting the 'username' of all results 
function selectTest(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM trainer";
        con.query(sql, function (err, result) {
            if (err) throw err;
            for(var i = 0; i < result.length; i++)
                console.log(result[i].username);
        });
    });
}

// Example of an INSERT query, inserting a new client object into the database
function insertTest(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        /* Client columns datatypes are as follows
        {
            name : VARCHAR, 
            username : VARCHAR, 
            password : varchar, 
            usertype : INT, 
            cur_weight : INT,
            goal_weight : INT, 
            height : INT, 
            birthday : DATE (DATE format is YYYY-MM-DD WITH single quotes around it)
        }
        */
        var sql = "INSERT INTO client (name, username, password, usertype, cur_weight, goal_weight, height, birthday) VALUES ('Kleeton', 'kjamm', 'password', 0, 165, 170, 70, '1997-09-17')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Insert Successful");
        });
    });
}

function deleteTest(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        // This function will Insert a new trainer into the database, show that the insert was successful, then delete it

        // Prints current TRAINER table
        var sql = "SELECT * FROM trainer";
        con.query(sql, function (err, result, fields){
            if (err) throw err;
            console.log("\n~~~~~ TRAINER table starting state ~~~~~\n");
            console.log(result);
            console.log("\n~~~~~ Now inserting new testUser ~~~~~\n");
        });

        // Inserts new trainer
        var insertSQL = "INSERT INTO trainer (name, username, password) VALUES ('TU', 'testUser', 'password')";
        con.query(insertSQL, function (err, result) {
            if (err) throw err;
            console.log("Query: " + insertSQL);
            console.log("Insert Success.");
        });

        // Selects all trainers, stores in result (field just prints out information about the different fields
        // in trainer like how large the varchars are and such, kinda useless for us), and prints out results
        //sql = "SELECT * FROM trainer";
        con.query(sql, function (err, result, fields){
            if (err) throw err;
            console.log("\n~~~~~ TRAINER table after INSERT ~~~~~\n");
            console.log(result);
            console.log("\n~~~~~ Now deleting testUser ~~~~~\n");

        });

        // Deletes the trainer that we added based upon it's username
        var deleteSQL = "DELETE FROM trainer WHERE username = 'testUser'";
        con.query(deleteSQL, function (err, result){
            if (err) throw err;
            console.log("Query: " + deleteSQL);
            console.log("Number of records deleted: " + result.affectedRows);
        });

        // Reprints trainer table again to prove testUser is gone
        //sql = "SELECT * FROM trainer";
        con.query(sql, function (err, result, fields){
            if (err) throw err;
            console.log("\n~~~~~ TRAINER table after DELETE ~~~~~\n");
            console.log(result);
        });
    });
}

//selectTest();
//insertTest();
deleteTest();