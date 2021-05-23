const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const bookingRouter = require("./../routes/bookingRoutes");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// // Protect all routes after this middleware
router.use(authController.protect);

router.use("/:tourId/bookings", bookingRouter);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));



//  get all users, createUser is not defined, please use signup
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// get one user , update user can not update password
// delete user is set to false(active)
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
