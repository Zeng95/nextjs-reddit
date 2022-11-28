import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import { User } from '../entities/User';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  try {
    // TODO: Validate data
    let errors: any = {};
    const emailUser = await User.findOne({ where: { email } });
    const usernameUser = await User.findOne({ where: { username } });
    if (emailUser) {
      errors.email = 'Email is already taken';
    }
    if (usernameUser) {
      errors.username = 'Username is already taken';
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: Create the user
    const user = new User({ email, username, password });
    errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await user.save();

    // TODO: Return the user
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

router.post('/register', register);

export default router;
