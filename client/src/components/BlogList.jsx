import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error al cargar blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Mi Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400">{blog.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-300 line-clamp-3">{blog.description}</p>
            <button className="mt-4 text-blue-500 hover:underline">Leer más...</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;