import { Router } from 'express';
import BlogController from '../controllers/BlogController';
import BlogService from '../services/BlogService';
import authenticate from "../middleware/auth.js";
import {validateBlogPost, validateUUID}  from "../middleware/validation.js";

// Initialize router and services
const router = Router();
const blogService = new BlogService();
const blogController = new BlogController(blogService);

// Route to create a new blog post
router.post('/', authenticate, validateBlogPost, blogController.create);

// Route to retrieve a specific blog post by ID
router.get('/:id', authenticate, validateUUID ,blogController.getById);

// Route to list all blog posts with pagination
router.get('/', authenticate, blogController.getAll);

// Route to update a specific blog post by ID
router.put('/:id', authenticate,validateUUID, validateBlogPost, blogController.update);

// Route to delete a specific blog post by ID
router.delete('/:id', authenticate, validateUUID ,blogController.delete);

export default router;
