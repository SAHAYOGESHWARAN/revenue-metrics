const jwt = require('jsonwebtoken');
const config = require('../config'); 

// Authentication middleware
const auth = (roles = []) => {
    // roles param can be a single role string (e.g., 'admin') or an array of roles (e.g., ['admin', 'user'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // Get token from the authorization header
        const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded; // Attach user info to the request object

            // Check if the user role is authorized
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(400).json({ message: 'Invalid token.', error: error.message });
        }
    };
};

module.exports = auth;