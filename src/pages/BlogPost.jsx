import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Send } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"

const BlogPost = ({ blogPosts, deletePost, addComment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast()
  const [newComment, setNewComment] = useState('');

  const handleDelete = () => {
    deletePost(parseInt(id));
    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully deleted.",
    })
    navigate('/');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(parseInt(id), newComment);
      setNewComment('');
      toast({
        title: "Comment Added",
        description: "Your comment has been successfully added.",
      })
    }
  };

  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="flex items-center text-blue-500 hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete Post
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
      <article className="prose lg:prose-xl mx-auto mb-8">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <p>{post.content}</p>
      </article>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4 mb-6">
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p>{comment}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>
            <Send className="mr-2 h-4 w-4" /> Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
