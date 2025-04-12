const express = require('express');
const Email = require('../models/Email');

const router = express.Router();

router.post('/createNewEmail', async (req, res) => {
    try {
        const { userid, email } = req.body;
        const newEmail = ({
            userid,
            email
        });

        const savedEmail = await newEmail.save();
        res.status(201).json({ savedEmail });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add new email', details: error.message });
    }
});

router.get('/getEmails', async (req, res) => {
    try {
        const emails = Email.find();
        res.status(200).json(emails);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get all email', details: error.message });
    }
});

module.exports = router;