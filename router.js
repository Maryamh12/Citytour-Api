import express from "express";
import catController from "./controllers/catController.js";
import userController from "./controllers/userController.js";
import commentController from "./controllers/commentController.js";
import auth from "./middleware/auth.js";
import validate from "./middleware/validate.js";
import storyController from "./controllers/storyController.js"
import { body } from "express-validator";

const router = express.Router();

// Cat routes
// For any routes that need protection, we'll just add our auth middleware into
// the post/patch/delete method! This will automatically run our auth function first
// and then the endpoint handler.
router
  .route("/cats")
  .get(catController.getAll)
  .post(auth, catController.create);
router
  .route("/cats/:id")
  .get(catController.getIndividual)
  .patch(auth, body("_id").not().exists(), validate, catController.update)
  .delete(auth, catController.remove);

router.route("/comment/:catId/:storyId/").post(auth, commentController.create);
// .patch(auth, commentController.update);
router.route("/search/").post(catController.search);

router.route("/story/:catId").post(auth, storyController.create);
router.route("/story/:catId/:storyId/").patch(auth, storyController.update);
router.route("/story/:storyId/like/").post(auth, storyController.liked);
router
  .route("/comment/:catId/:commentId/")
  .patch(
    auth,
    body("text").trim().isLength({ min: 1 }),
    validate,
    commentController.update
  )
  .delete(auth, commentController.remove);

// Authentication routes -> User routes
router
  .route("/register")
  .post(
    body("email").isEmail(),
    body("role").not().exists(),
    body("password").isLength({ min: 8 }),
    validate,
    userController.register
  );
router.route("/login").post(userController.login);

export default router;
