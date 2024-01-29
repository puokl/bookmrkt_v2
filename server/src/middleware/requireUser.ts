// we have a problem with deserializeUser middleware, user is undefined. we have to validate if user exist for that given request
import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    console.log(
      "RequireUser middleware: it seems like there is no user in res.local.user"
    );
    return res.sendStatus(403);
  }
  console.log("there is a user in requireUser");
  return next();
};

export default requireUser;
