# Rich-Panel-Assignment

This project is a blog application built with Node.js, Express, TypeScript, and PostgreSQL.


## Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:alex8430/rich-panel-assignment.git
    cd rich-panel-assignment
    ```

2. Copy the example environment file and update the environment variables:

    ```sh
    cp .env.example .env

## Running with Docker

3. Build and start the Docker containers:

    ```sh
    docker-compose up --build
    ```

2. The application will be available at `http://localhost:$PORT` (replace `$PORT` with the port number specified in your `.env` file).

## API Endpoints

### Authentication Routes

- **POST /auth/signup**

    Registers a new user.

    **Request Body:**
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```

    **Response:**
    ```json
    {
        "message": "User registered successfully"
    }
    ```

- **POST /auth/login**

    Logs in a user.

    **Request Body:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

    **Response:**
    ```json
    {
        "token": "string"
    }
    ```

### Blog Routes

- **POST /blogs**

    Creates a new blog post.

    **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

    **Request Body:**
    ```json
    {
        "title": "string",
        "content": "string"
    }
    ```

    **Response:**
    ```json
    {
        "message": "Blog post created successfully",
        "blog": {
            "id": "string",
            "title": "string",
            "content": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    }
    ```

- **GET /blogs/:id**

    Retrieves a specific blog post by ID.

    **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

    **Response:**
    ```json
    {
        "id": "string",
        "title": "string",
        "content": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
    ```

- **GET /blogs**

    Lists all blog posts with pagination.

    **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

    **Response:**
    ```json
    [
        {
            "id": "string",
            "title": "string",
            "content": "string",
            "createdAt": "string",
            "updatedAt": "string"
        },
        ...
    ]
    ```

- **PUT /blogs/:id**

    Updates a specific blog post by ID.

    **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

    **Request Body:**
    ```json
    {
        "title": "string",
        "content": "string"
    }
    ```

    **Response:**
    ```json
    {
        "message": "Blog post updated successfully",
        "blog": {
            "id": "string",
            "title": "string",
            "content": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    }
    ```

- **DELETE /blogs/:id**

    Deletes a specific blog post by ID.

    **Request Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

    **Response:**
    ```json
    {
        "message": "Blog post deleted successfully"
    }
    ```

## Import Postman Collection

To import the Postman collection and test the API endpoints:

1. Open Postman.
2. Click on the `Import` button in the top left corner.
3. Select the `Upload Files` tab.
4. Choose the `RichPanel.postman_collection.json` file located in the project directory.
5. Click on the `Import` button to import the collection.

You can now use the imported collection to test the API endpoints.

## Move to Particular YouTube Link

To go through the video demonstration of the current project, its API load testing, and the system design of the URL shortener service, follow the link below:

[Watch the Video Demonstration](https://youtu.be/OCjWgKklYog)

### Suggested Timestamps

- **Source Code (Walk Through):** [0:00](https://youtu.be/OCjWgKklYog?t=0)
- **Postman Collection (Test API):** [2:34](https://youtu.be/OCjWgKklYog?t=154)
- **API Load Testing:** [3:48](https://youtu.be/OCjWgKklYog?t=228)
- **System Design Intro (URL shortener service):** [5:10](https://youtu.be/OCjWgKklYog?t=310)
- **Back of the Envelope Calculations:** [5:48](https://youtu.be/OCjWgKklYog?t=348)
- **High-Level Diagram for (URL shortener service):** [7:15](https://youtu.be/OCjWgKklYog?t=435)
- **Database Choice:** [8:40](https://youtu.be/OCjWgKklYog?t=520)
- **Handle High Traffic like (10000 write/s):** [10:12](https://youtu.be/OCjWgKklYog?t=612)
- **Potential Bottlenecks:** [10:35](https://youtu.be/OCjWgKklYog?t=635)

## Ideas for Further Improvements

If more time were available, the following improvements could be made:

- **Write Unit and Integration Tests:** Implement comprehensive unit and integration tests to ensure the reliability and correctness of the code.
- **Improve Caching Mechanism:** Optimize the caching mechanism to make it more efficient, reducing latency and improving performance.
- **Enhance Security:** Implement additional security measures such as rate limiting, Update and Deletion Of Post By author of the post.
- **Scalability Enhancements:** Further improve the scalability of the service to handle even higher traffic loads.
- **Monitoring and Logging:** Set up advanced monitoring and logging to track the performance and health of the service in real-time.
- **User Interface Improvements:** Enhance the user interface for better usability and user experience.