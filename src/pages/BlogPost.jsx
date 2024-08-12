import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

const BlogPost = ({ blogPosts, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast()

  const handleDelete = () => {
    deletePost(parseInt(id));
    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully deleted.",
    })
    navigate('/');
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
      <article className="prose lg:prose-xl mx-auto">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <p>{post.content}</p>
      </article>
    </div>
  );
};

export default BlogPost;
