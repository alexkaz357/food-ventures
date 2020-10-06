const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addReview, getReviews, deleteReview} = require('./review.controller')
const router = express.Router()

router.get('/', getReviews)
router.post('/', addReview)
router.delete('/:id', deleteReview)

module.exports = router