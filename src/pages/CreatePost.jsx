import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newPost = {
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString().split('T')[0]
      };
      addPost(newPost);
      toast({
        title: "Post Created",
        description: "Your new blog post has been successfully created.",
      })
      navigate('/');
    } else {
      toast({
        title: "Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here"
            required
            className="min-h-[200px]"
          />
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
