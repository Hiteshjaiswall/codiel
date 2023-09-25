const Post = require('../../../models/post');
const Comment = require('../../../models/comment')
module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: 'list of posts',
        posts: [posts]
    })
}
module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // .id means converting the object id into a string
          if (post.user == req.user.id) {
        await post.deleteOne();
          
        await Comment.deleteMany({ post: req.params.id });

        
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'post deleted successfully'
            });
    }
else{
    return res.json(401, {
        message:'you cannot delete this post'
    });
} }catch (err) {
        console.error(err);
        return res.json(500, {
            message: 'intenal server error'
        });
    }
};