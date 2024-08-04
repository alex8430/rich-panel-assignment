import { Request, Response } from 'express';
import BlogService from '../services/BlogService';
import Logger from '../utils/Logger';

// Controller class to handle HTTP requests for blog posts
class BlogController {
  private blogService: BlogService;

  constructor(blogService: BlogService) {
    this.blogService = blogService;
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  // Create a new blog post
  async create(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this.blogService.createBlog({...req.body, author: req.user?.email});
      res.status(201).json(blog);
    } catch (error) {
      Logger.error('Error creating blog:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Retrieve a specific blog post by ID
  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const blog = await this.blogService.getBlogById(id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      Logger.error('Error fetching blog:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // List all blog posts with pagination
  async getAll(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    try {
      const blogs = await this.blogService.getAllBlogs(parseInt(page as string, 10), parseInt(limit as string, 10));
      res.json(blogs);
    } catch (error) {
      Logger.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update a specific blog post by ID
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedBlog = await this.blogService.updateBlog(id, updateData);
      if (updatedBlog) {
        res.json(updatedBlog);
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      Logger.error('Error updating blog:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete a specific blog post by ID
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await this.blogService.deleteBlog(id);
      if (result) {
        res.status(204).end(); // No content
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      Logger.error('Error deleting blog:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default BlogController;

