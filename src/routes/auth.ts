import { Request, Response, Router } from 'express';
import { User } from '../entities/User';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  try {
    // TODO: Validate data
    // TODO: Create the user
    const user = new User({ email, username, password });
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
