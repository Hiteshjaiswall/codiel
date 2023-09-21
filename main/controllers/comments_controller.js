const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
  Post.findById(req.body.post)
    .then(post => {
      if (post) {
        return Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        });
      } else {
        throw new Error("Post not found");
      }
    })
    .then(comment => {
      post.comments.push(comment);
      return post.save();
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error('Error in creating a comment:', err);
      res.redirect('/');
    });
};


// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });
// }
module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.redirect('back');
    }

    if (comment.user == req.user.id) {
      const postId = comment.post;
      console.log('in this hoe');
      await comment.deleteOne();

      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
}
