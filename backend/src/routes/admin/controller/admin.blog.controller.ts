import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, ResponseObject, Blog } from '../../../interfaces';
import { BlogDB } from '../../../models/blog';

class AdminBlogController {
    constructor() {

    }

    public static getAllBlogs = async (req: AuthenticatedRequest, res: Response) => {
        let response: ResponseObject<Blog | Blog[]>;
        try {
            const allBlogs = await BlogDB.getAllBlogs();
            response = {
                ResponseData: allBlogs,
                ResponseMessage: 'Blog List Fetched',
            }
        } catch (error) {
            return res.status(500).end();
        }
        return res.send(response);
    }

    public static getBlogByID = async (req: AuthenticatedRequest, res: Response) => {
        const blogID = req.params.id;
        let response: ResponseObject<Blog>;
        try {
            const blog = await BlogDB.getBlogById(blogID);
            response = {
                ResponseData: blog,
                ResponseMessage: 'Blog Details Fetched',
            }
        } catch (error) {
            return res.status(500).end();
        }
        return res.send(response);
    }

    public static insertBlog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const blogTitle = req.body.title;
        const blogDescription = req.body.description;
        const blogContent = req.body.content;
        const createdBy = req.body.createdBy || req.user.id.toString();
        let insertedID: string;
        let response: ResponseObject<any>;
        try {
            insertedID = await BlogDB.insertBlog(blogTitle, blogDescription, blogContent, createdBy);
            response = {
                ResponseData: null,
                ResponseMessage: `Blog created`
            }
        } catch (error) {
            return res.status(500).end();
        }
        return res.send(response);
    }

    public static updateBlog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const blogID = req.params.id;
        const blogTitle = req.body.title;
        const blogDescription = req.body.description;
        const blogContent = req.body.content;
        const updatedBy = req.body.updatedBy || req.user.id.toString();
        let response: ResponseObject<any>;
        try {
            await BlogDB.updateBlog(blogID, blogTitle, blogDescription, blogContent, updatedBy);
            response = {
                ResponseData: null,
                ResponseMessage: 'Blog Updated'
            }
        } catch (error) {
            return res.status(500).end();
        }
        return res.send(response);
    }

    public static deleteBlog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const blogID = req.params.id;
        let response: ResponseObject<any>;
        try {
            await BlogDB.deleteBlog(blogID);
            response = {
                ResponseData: null,
                ResponseMessage: 'Blog Deleted'
            }
        } catch (error) {
            return res.status(500).end();
        }
        return res.send(response);
    }
}

const GetAllBlogs = AdminBlogController.getAllBlogs;
const GetBlogByID = AdminBlogController.getBlogByID;
const InsertBlog = AdminBlogController.insertBlog;
const UpdateBlog = AdminBlogController.updateBlog;
const DeleteBlog = AdminBlogController.deleteBlog;

export {
    GetAllBlogs,
    GetBlogByID,
    InsertBlog,
    UpdateBlog,
    DeleteBlog,
}