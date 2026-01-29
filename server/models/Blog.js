import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  tags: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    default: ""
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;