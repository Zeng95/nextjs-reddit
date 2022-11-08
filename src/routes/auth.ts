import { Request, Router } from 'express';

const router = Router();

const register = async (req: Request, _) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  try {
    // TODO: Validate data
    // TODO: Create the user
    // TODO: Return the user
  } catch (error) {
    console.error(error);
  }
};

router.post('/register', register);

export default router;
