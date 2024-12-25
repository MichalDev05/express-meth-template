const express = require('express');
const authenticateAdmin = require('../modules/users/middleware/authenticateAdmin');
const authenticateUser = require('../modules/users/middleware/authenticateUser');
const router = express.Router();



router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public/html' });
});
router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: 'public/html' });
});



router.get('/table/:model', authenticateAdmin, (req, res) => {
    res.sendFile('table.html', { root: 'public/html' });
});
router.get('/form/:model', authenticateAdmin, (req, res) => {
    res.sendFile('form.html', { root: 'public/html' });
});
router.get('/form/:model/:id', authenticateAdmin, (req, res) => {
    res.sendFile('form.html', { root: 'public/html' });
});


router.get('/form-style.css', authenticateAdmin, (req, res) => {
    res.sendFile('form-style.css', { root: 'public/css' });
});
router.get('/table-style.css', authenticateAdmin, (req, res) => {
    res.sendFile('table-style.css', { root: 'public/css' });
});


router.get('/form-script.js', authenticateAdmin, (req, res) => {
    res.sendFile('form-script.js', { root: 'public/js' });
});
router.get('/table-script.js', authenticateAdmin, (req, res) => {
    res.sendFile('table-script.js', { root: 'public/js' });
});

module.exports = router;