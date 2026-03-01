const express = require("express");
const router = express.Router();
const { registerClient } = require("../controllers/client.controller");
/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Register a new API client
 *     tags:
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - apiKey
 *               - maxRequests
 *               - windowSeconds
 *             properties:
 *               clientId:
 *                 type: string
 *               apiKey:
 *                 type: string
 *               maxRequests:
 *                 type: integer
 *               windowSeconds:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Client registered successfully
 *       409:
 *         description: Client already exists
 */
router.post("/clients", registerClient);

module.exports = router;