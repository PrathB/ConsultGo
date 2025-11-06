import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

// Lightweight auth middleware for development/demo.
// Expects an 'x-user-id' header containing the caller's user id.
export function requireUser(req: Request, res: Response, next: NextFunction) {
  const uid = req.header("x-user-id");
  if (!uid) return res.status(401).json({ error: "Missing x-user-id header" });
  req.user = { id: uid };
  next();
}

export default requireUser;
