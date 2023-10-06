// // const Comment = require('../models/comment');
// // const Post = require('../models/post');

// // module.exports.create = function (req, res) {
// //   Post.findById(req.body.post)
// //     .then(post => {
// //       if (post) {
// //         return Comment.create({
// //           content: req.body.content,
// //           post: req.body.post,
// //           user: req.user._id
// //         });
// //       } else {
// //         throw new Error("Post not found");
// //       }
// //     })
// //     .then(comment => {
// //       post.comments.push(comment);
// //       return post.save();
// //     })
// //     .then(() => {
// //       res.redirect('/');
// //     })
// //     .catch(err => {
// //       console.error('Error in creating a comment:', err);
// //       res.redirect('/');
// //     });
// // };


// // // module.exports.destroy = function(req, res){
// // //     Comment.findById(req.params.id, function(err, comment){
// // //         if (comment.user == req.user.id){

// // //             let postId = comment.post;

// // //             comment.remove();

// // //             Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
// // //                 return res.redirect('back');
// // //             })
// // //         }else{
// // //             return res.redirect('back');
// // //         }
// // //     });
// // // }
// // module.exports.destroy = async function (req, res) {
// //   try {
// //     const comment = await Comment.findById(req.params.id);

// //     if (!comment) {
// //       return res.redirect('back');
// //     }

// //     if (comment.user == req.user.id) {
// //       const postId = comment.post;
// //       console.log('in this hoe');
// //       await comment.deleteOne();

// //       await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

// //       return res.redirect('back');
// //     } else {
// //       return res.redirect('back');
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     return res.redirect('back');
// //   }
// // }
// const Comment = require('../models/comment');
// const Post = require('../models/post');
// const commentsMailer = require('../mailer/comments_mailer');
// module.exports.create = async function(req, res){

//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             post.save();

//             comment = await comment.populate('user', 'name email').execPopulate();
//             commentsMailer.newComment(comment);
//             // if (req.xhr){


//             //     return res.status(200).json({
//             //         data: {
//             //             comment: comment
//             //         },
//             //         message: "Post created!"
//             //     });
//             // }


//             req.flash('success', 'Comment published!');

//             res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }

// }


// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//             // send the comment id which was deleted back to the views
//             // if (req.xhr){
//             //     return res.status(200).json({
//             //         data: {
//             //             comment_id: req.params.id
//             //         },
//             //         message: "Post deleted"
//             //     });
//             // }


//             req.flash('success', 'Comment deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'Unauthorized');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }

// }

const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailer/comments_mailer');
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            console.log(comment)
            //comment = await comment.populate('user', 'name email').execPopulate(); // not working 
           comment= await Comment.populate(comment,"user");
            commentsMailer.newComment(comment);
            req.flash('success', 'Comment published!');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.redirect('back');
        }
        if (comment.user == req.user.id) {
            const postId = comment.post;
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
