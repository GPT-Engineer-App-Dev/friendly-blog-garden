import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from '../components/ThemeSwitcher';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"

const HomePage = ({ blogPosts, deletePost }) => {
  const { toast } = useToast()

  const handleDelete = (id) => {
    deletePost(id);
    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully deleted.",
    })
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Personal Blog</h1>
        <div className="flex items-center space-x-4">
          <Link to="/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{post.date}</span>
              <div className="flex items-center space-x-2">
                <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">Read more</Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
