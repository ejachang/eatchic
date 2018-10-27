const controller = require('./controllers');
const router = require('express').Router();
const { isLoggedIn } = require('./middleware');

router.get('/search/:searchTerm/:searchValue', isLoggedIn, (req, res) => {
  const { searchTerm, searchValue } = req.params;
  res.redirect(`/${searchTerm}/${searchValue}`);
});
router.get('/home', controller.post.getAll);
router.get('/comments', controller.comments.get);
router.post('/comments', isLoggedIn, controller.comments.post);
router.get('/restaurants', controller.restaurants);
router.get('/dishes', controller.dishes);
router.get('/likes', controller.likes.get);
router.get('/reviews', controller.reviews);
router.post('/likes', isLoggedIn, controller.likes.post);
router.get('/posts', isLoggedIn, controller.post.getAll);
router.get('/user/:username', isLoggedIn, controller.post.getByUsername);
router.get('/rating', isLoggedIn, controller.post.getByRating);
router.get('/dish/:dishname', isLoggedIn, controller.post.getByDish);
router.get('/restaurant/:name', isLoggedIn, controller.post.getByRestaurant);
router.post('/submit', controller.post.submit);
router.post('/votes/upvote', isLoggedIn, controller.dishlikes.upVote);
router.post('/votes/downvote', isLoggedIn, controller.dishlikes.downVote);
router.get('/user/profile', isLoggedIn, controller.user.getProfile);

module.exports = router;
