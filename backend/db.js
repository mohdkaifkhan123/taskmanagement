const mysql = require('mysql');

const connection = mysql.createConnection({
    server: 'DESKTOP-BHSM3FB',
    database: 'todod',
    user: 'DESKTOP-BHSM3FB/admin',
    password: '',
    options: {
      encrypt: true, 
      trustServerCertificate: false 
    }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
