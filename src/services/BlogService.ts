import { AppDataSource } from '../config/db';
import { Blog } from '../models/Blog';
import CacheService from './cacheService';
import Logger  from '../utils/Logger';

// Service class for blog-related business logic and database operations
class BlogService {
  private blogRepository = AppDataSource.getRepository(Blog);
  private cacheService = CacheService;

  async createBlog(data: { title: string; content: string; author: string }): Promise<Blog> {
    const blog = this.blogRepository.create(data);
    await this.blogRepository.save(blog);
    try {
      await this.cacheService.invalidateCachePattern('blogs:*');
    } catch (error) {
      
    }
    return blog;
  }

  async getBlogById(id: string): Promise<Blog | null> {
    const cacheKey = id;
    let blog: Blog | null;
    try {
      blog = await this.cacheService.get<Blog>(cacheKey);
    }catch (error) {
      Logger.error('Failed to fetch data from cache:', error);
      blog = null;
    }
    if(!blog){
      blog = await this.blogRepository.findOneBy({ id });
      // Save to cache in the background
      (async () => {
        try {
          await this.cacheService.set(cacheKey, blog);
        } catch (error) {
          Logger.error('Failed to save cache:', error);
        }
      })();
    }
    return blog;
  }

  async getAllBlogs(page: number = 1, limit: number = 10): Promise<Blog[]> {
    const cacheKey = `blogs:${page}:${limit}`;
    let blogs: Blog[] | null;

    try {
      // Try to fetch data from cache
      blogs = await this.cacheService.get<Blog[]>(cacheKey);
    } catch (error) {
      Logger.error('Failed to fetch data from cache:', error);
      blogs = null;
    }

    if (!blogs) {
      // If no cache, fetch from database and cache the result
      blogs = await this.blogRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'ASC' },
      });
      // Save to cache in the background
      (async () => {
        try {
          await this.cacheService.set(cacheKey, blogs);
        } catch (error) {
          Logger.error('Failed to save cache:', error);
        }
      })();
    }

    return blogs || [];
  }

  async updateBlog(id: string, updateData: Partial<{ title: string; content: string; author: string }>): Promise<Blog | null> {
    const blog = await this.blogRepository.preload({
      id,
      ...updateData,
    });

    if (blog) {
      await this.blogRepository.save(blog);

      // Invalidate the cache
      try {
        await this.cacheService.set(blog.id, blog);
        await this.cacheService.invalidateCachePattern('blogs:*');
      } catch (error) {
        Logger.error('Failed to invalidate cache:', error);
      }
      return blog;
    }

    return null;
  }

  async deleteBlog(id: string): Promise<boolean> {
    const result = await this.blogRepository.delete(id);
    if (result.affected) {
      // Invalidate the cache
      try {
        await this.cacheService.del(id);
        await this.cacheService.invalidateCachePattern('blogs:*');
      } catch (error) {
        Logger.error('Failed to invalidate cache:', error);
      }
      return true;
    }
    return false;
  }
}

export default BlogService;

