const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
});

connection.connect(err => {
    if(err)
        return err;
    console.log('Connected!')
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server Status: running');
});

app.get('/exercises', (req, res) => {
    const SELECT_ALL = 'SELECT * FROM exercise';
    connection.query(SELECT_ALL, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All exercises retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/trainers', (req, res) => {
    const SELECT_ALL = 'SELECT * FROM trainer';
    connection.query(SELECT_ALL, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All trainers received')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/get/trainer', (req, res) => {
    const {c_id} = req.query;
    const SELECT_ONE = `SELECT trainer_id FROM ct_table WHERE client_id=${c_id}`;
    connection.query(SELECT_ONE, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Trainer ID received')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/clients', (req, res) => {
    const SELECT_ALL = 'SELECT * FROM client';
    connection.query(SELECT_ALL, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All clients retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/get/client', (req, res) => {
    const {c_id} = req.query;
    const GET_USER  = `SELECT * FROM client WHERE client_id = ${c_id}`;
    connection.query(GET_USER, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Client retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/get/user/trainer', (req, res) => {
    const {t_id} = req.query;
    const GET_TRAINER  = `SELECT * FROM trainer WHERE trainer_id = ${t_id}`;
    connection.query(GET_TRAINER, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Trainer retrieved')
            return res.json({
                data: results
            })
        }
    });
});


app.get('/generate', (req, res) => {
    const { name } = req.query;
    console.log('Generating workout');

    const NEW_WORKOUT = `INSERT into workout(name) VALUES(\'${name}\')`;

    connection.query(NEW_WORKOUT, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Success')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/add/trainer', (req, res) => {
    const {name, username, password} = req.query;
    const ADD_TRAINER  = `INSERT INTO trainer(name, username, password) VALUES (\'${name}\',\'${username}\',\'${password}\')`;
    connection.query(ADD_TRAINER, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Trainer added')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/add/client', (req, res) => {
    const {name, username, password, birthdate, weightCurr, weightGoal} = req.query;
    const ADD_CLIENT  = `INSERT INTO client(name, username, password, cur_weight, goal_weight) VALUES (\'${name}\',\'${username}\',\'${password}\', ${weightCurr}, ${weightGoal})`;
    connection.query(ADD_CLIENT, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Client added')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/update/current', (req, res) => {
    const {cur_weight, c_id} = req.query;
    const UPDATE_CURR  = `UPDATE client SET cur_weight=${cur_weight} WHERE client_id=${c_id}`;
    connection.query(UPDATE_CURR, (err, results) => {
        if(err){
            console.log(err)
            return res.send(err);
        } else {
            console.log('Client weight updated')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/update/goal', (req, res) => {
    const {goal_weight, c_id} = req.query;
    const UPDATE_GOAL  = `UPDATE client SET goal_weight=${goal_weight} WHERE client_id=${c_id}`;
    connection.query(UPDATE_GOAL, (err, results) => {
        if(err){
            console.log(err)
            return res.send(err);
        }else {
            console.log('Client weight updated')
            return res.json({
                data: results
            })
        }
    });
});


app.get('/workouts', (req, res) => {
    const {t_id} = req.query;
    console.log(t_id);
    const FIND_WORKOUTS  = `SELECT * FROM workout WHERE trainer_id = ${t_id}`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workouts retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/count', (req, res) => {
    const {t_id} = req.query;
    console.log(t_id);
    const FIND_WORKOUTS  = `SELECT COUNT(*) AS count FROM workout WHERE trainer_id = ${t_id}`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout count retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/client', (req, res) => {
    const {c_id} = req.query;
    const FIND_WORKOUTS  = `SELECT * FROM workout WHERE client_id = ${c_id}`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workouts for client retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/client/count', (req, res) => {
    const {c_id} = req.query;
    const FIND_WORKOUTS  = `SELECT COUNT(*) AS count FROM workout WHERE client_id = ${c_id}`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout count for client retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/exercises', (req, res) => {
    const {w_id} = req.query;
    console.log(w_id);
    const FIND_WORKOUTS  = `SELECT exercise.name FROM exercise, we_table WHERE workout_id = ${w_id} AND we_table.exercise_id=exercise.exercise_id`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout exercises retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/allexercises', (req, res) => {
    const {t_id} = req.query;
    console.log(t_id);
    const FIND_WORKOUTS  = `SELECT DISTINCT workout.workout_id, exercise.name FROM workout, exercise, we_table, trainer WHERE workout.trainer_id = ${t_id} AND workout.workout_id = we_table.workout_id AND we_table.exercise_id = exercise.exercise_id`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All exercises retrieved')
            return res.json({
                data: results
            })
        }
    });
});

app.get('/workouts/client/allexercises', (req, res) => {
    const {c_id} = req.query;
    const FIND_WORKOUTS  = `SELECT DISTINCT workout.workout_id, exercise.name FROM workout, exercise, we_table, trainer WHERE workout.client_id = ${c_id} AND workout.workout_id = we_table.workout_id AND we_table.exercise_id = exercise.exercise_id`;
    connection.query(FIND_WORKOUTS, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('All exercises retrieved')
            return res.json({
                data: results
            })
        }
    });
});


app.get('/workouts/create', (req, res) => {
    const {t_id, c_id, name} = req.query;
    const ADD_WORKOUT = `INSERT INTO workout(name, client_id, trainer_id) VALUES(\'${name}\', ${c_id}, ${t_id})`;
    connection.query(ADD_WORKOUT, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout created')
        }
    })

});

app.get('/workouts/get/workout', (req, res) => {
    const GET_WORKOUT = `SELECT workout_id AS last_id FROM workout ORDER BY workout_id DESC LIMIT 1;`;
    connection.query(GET_WORKOUT, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout ID retrieved');
            return res.json({
                data: results
            })
        }
    })
});

app.get('/workouts/get/exercises', (req, res) => {
    const {muscle, total, w_id} = req.query;
    const GET_EX = `CREATE OR REPLACE VIEW temp_exercises AS SELECT exercise_id FROM exercise WHERE exercise.muscle= ${muscle} ORDER BY RAND() LIMIT ${total}`;
    connection.query(GET_EX, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Target exercises retrieved')
        }
    })

    const PUT_EX = `INSERT INTO we_table(workout_id, exercise_id) SELECT ${w_id}, exercise_id FROM temp_exercises`;
    connection.query(PUT_EX, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Target exercises placed')
            return res.json({
                data: results
            })
        }
    })
});

app.get('/workouts/put/exercises', (req, res) => {
    const {w_id} = req.query;
    

});


app.get('/workouts/delete', (req, res) => {
    const {w_id} = req.query;
    console.log(w_id);
    const DELETE  = `DELETE FROM workout WHERE workout_id = ${w_id}`;
    connection.query(DELETE, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Workout deleted')
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log("Server listening on port 4000")
})
