import jwt from 'jsonwebtoken'

export const authorizeUser = (user)=>{
    const payload= {
        sub:user._id,
        username:user.username,
    }

    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn  : '1h'})
}


export const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header (e.g., "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token part
  
    if (!token) {
      return res.status(401).json({ message: 'Access token missing' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      // Attach the decoded token to the request (can be used in route handlers)
      req.user = decoded;
      next();
    });
  };