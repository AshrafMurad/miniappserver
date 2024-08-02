import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response } from "express";
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("please enter your email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character long"),
];
export const signupValidator = [
  body("name").notEmpty().withMessage("name filed is required"),
  ...loginValidator,
];

export const userClicksValidator = [
  body("clicksCount").notEmpty().withMessage("no more clicks"),
];
