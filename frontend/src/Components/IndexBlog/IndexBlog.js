import React from 'react';
import { Link } from 'react-router-dom'
import './indexblog.css'



class BlogPost extends React.Component {
    state = {

        blog: []
    }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/v2/blog').then(response => response.json()).then(result => {
           this.setState({blog: result.ResponseData});
           console.log(this.state.blog);
       })
    }
    render() {
        const { blog } = this.state;
        return (

            <section id='indexBlogs'>
                <h1 className='text-center' style={{ fontFamily: 'Noto Sans JP', fontWeight: 'bold', textTransform: 'uppercase' }}>Recent Blogs</h1>
                <div className="card-group">
                    {blog.reverse().slice(0, 3).map((blog) => {
                        return (
                            <div className='row' key={blog.id}>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src={blog.uri} alt="Card cap" />
                                        <div className="card-bodi">
                                            <h5 className="card-title">{blog.title}</h5>
                                            <p className="card-text">{blog.description}</p>
                                            <Link to={`/blog/${blog.id}`} className="btn btn-success" style={{ color: 'white' }}>Read more</Link>
                                            <Link to="/blogs" className="btn btn-primary">More Blogs</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

        )
    }
}

export default BlogPost; 