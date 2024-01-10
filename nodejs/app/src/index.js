const express = require('express');
const mysql = require('mysql');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

app.get('/', (_req, res) => {
    connection.query(`INSERT INTO person(name) values('${faker.person.fullName()}')`, () => {
        connection.query('SELECT * FROM person', (error, results) => {
            if (error) throw error;

            console.log(results);

            res.send(`
                <h1>Full Cycle Rocks!</h1>
                <ul>${results.map((row) => `<li>${row.name}</li>`).join('\n')}</ul>
            `);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
