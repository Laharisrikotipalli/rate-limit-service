const express = require("express");
const router = express.Router();
const { checkLimit } = require("../controllers/ratelimit.controller");
/**
 * @swagger
 * /api/v1/ratelimit/check:
 *   post:
 *     summary: Check if request is allowed
 *     tags:
 *       - RateLimit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - path
 *             properties:
 *               clientId:
 *                 type: string
 *               path:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request allowed
 *       429:
 *         description: Too many requests
 */
router.post("/ratelimit/check", checkLimit);

module.exports = router;