// {
//     // method to sumit form using ajax
//     let createPost =function(){
//         let newPostform=$('#new-post-form');
// newPostform.submit(function(e){
//     e.preventDefault();

//     $.ajax({
//         type:'post',
//         url:'/posts/create',
//         data:newPostform.serialize(),
//         success:function(data){
// let newPost=newPostDom(data.data.post);
// console.log(data);
// $(`#posts-list-container>ul`).prepend(newPost);
// // showNotyNotification('success', 'bitch');
// deletePost($(' .delete-post-button' , newPost));
// flash('success', 'in this');
// newPostform[0].reset();
//         },error :function(err){
//             console.log(err.responseText);
//         }
//     })
// });
//     }
//     //method to create data using DOM

// let newPostDom =function(post){
//     return $(`<li id="post-${post._id}">
//     <p>
//         <small>
//             <a class="delete-post-button" href="/posts/destroy/<%= post._id %>">X</a>
//         </small>

//         ${post.content}
//         <br>
//         <small>
//             ${post.user.name}
//         </small>
//     </p>
//     <div class="post-comments">

//             <form action="/comments/create" method="POST">
//                 <input type="text" name="content" placeholder="Type Here to add comment..." required>
//                 <input type="hidden" name="post" value=" ${post._id}" >
//                 <input type="submit" value="Add Comment">
//             </form>



//         <div class="post-comments-list">
//             <ul id="post-comments-${post._id}">
//             </ul>
//         </div>
//     </div>

// </li>`)
// }

// // method to delete 

// let deletePost = function(deleteLink){
//     $(deleteLink).click(function(e){
// e.preventDefault();

// $.ajax({
//     type:'get',
//     url:$(deleteLink).prop('href'),
//     success:function(data){
// console.log(data);
// $(`#post-${data.data.post_id}`).remove();

//     },error:function(e){

//     }
// })
//     })
// }

//     createPost();
// }

{
    // method to submit the form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    noty('success', 'Post created successfully.');
                    
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                    <p>
                       
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small> 
                       
                            ${post.content}
                        <br>
                        <small id ='username'>
                        ${post.user.name}
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Type Here to Add Comment..." required>
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Add Comment">
                            </form>
                           
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                               
                
                                </ul>
                            </div>
                
                    </div>
                
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function (deleteLink) {

        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    noty('Error', 'Post deleted');
                    $(`#post-${data.data.post_id}`).remove();

                }, error: function (error) {
                    console.log(error.responseText)
                }
            });
        });
    }

    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
        });
    }



    createPost();
    convertPostsToAjax();
}
