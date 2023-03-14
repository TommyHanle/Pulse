const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/api/searchController');

router.get('/', searchController.searchSheet);

module.exports = router;

