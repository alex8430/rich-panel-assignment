import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { signupValidationRules, loginValidationRules, validate } from "../middleware/validation";

const router = Router();
const authController = new AuthController();

// Route to register a new user
router.post('/signup',signupValidationRules(), validate, authController.signup);

// Route to login a user
router.post('/login',loginValidationRules(),validate, authController.login);

export default router;
