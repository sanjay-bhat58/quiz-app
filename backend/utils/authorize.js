import jwt from "jsonwebtoken";

const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header

    if (!token) {
      return res.status(401).json({
        status: "UNAUTHORIZED",
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.employeeId = decoded.employeeId; // Attach decoded user data to request object
    req.role = decoded.role; // Attach decoded user data to request object

    next(); // Move to controller
  } catch (error) {
    return res.status(403).json({
      status: "FORBIDDEN",
      message: "Forbidden: Invalid or expired token",
    });
  }
};

export default authorize;
