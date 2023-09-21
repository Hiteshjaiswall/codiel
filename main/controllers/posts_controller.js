const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });

    if(req.xhr){
      // req.flash('success', 'post created successfully');
      return res.status(200).json({
        data:{
          post :post
        },
        message:'post created'
      })
      
    }
    return res.redirect('back');
  } catch (err) {
    console.error('Error in creating a post:', err);
    return res.redirect('back');
  }
};


module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect('back');
    }

    // .id means converting the object id into a string
    if (post.user == req.user.id) {
      await post.deleteOne();

      await Comment.deleteMany({ post: req.params.id });
       
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:'post deleted successfully'
        });
      }
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};
