
# ![FOAM Backend API](https://cloud-qxr7ngwnq-hack-club-bot.vercel.app/0foambackend.png)

Welcome to the backend API for FOAM, the ultimate easy-to-use portfolio creation app! This API provides the necessary endpoints and database interactions to create sleek and professional portfolios quickly, without the hassle of registration or unwanted ads.

## Overview

FOAM is designed to offer an immediate solution to portfolio needs, enabling users to showcase their skills and projects efficiently. This API, built using Node.js, Express, and PostgreSQL, is a crucial part of delivering these functionalities securely and reliably.

## Tech Stack

- **Node.js**: JavaScript runtime for building the server-side of the application.
- **Express**: A minimalist web framework for building RESTful APIs.
- **PostgreSQL**: A powerful, open-source object-relational database for storing portfolio data.
- **Multer**: A middleware for handling `multipart/form-data`, used here for file uploads.
- **AWS S3**: DigitalOcean Space - for storing user profile pictures as CDN resources.
- **HTTPS**: Secure communication using SSL certificates.

## Prerequisites

- **Node.js**: Installed on your machine.
- **PostgreSQL**: Access to a PostgreSQL database.
- **AWS/DigitalOcean**: Credentials for accessing the bucket storage.

## Environment Variables

Create an `.env` file in the root directory and configure the following:

```plaintext
APP_PORT=<your_app_port>
CORS_URL=<your_cors_url>
DB_HOST=<your_db_host>
DB_NAME=<your_db_name>
DB_USER=<your_db_user>
DB_PASS=<your_db_password>
DB_PORT=<your_db_port>
DB_SSL=<path_to_ssl_cert_file>
AWS_ENDPOINT=<aws_endpoint_url>
AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
AWS_ACCESS_KEY=<your_aws_access_key>
AWS_BUCKETNAME=<your_s3_bucket_name>
SSL_PRIVKEY=<path_to_ssl_privkey_file>
SSL_CERT=<path_to_ssl_cert_file>
SSL_CERTBUNDLE=<path_to_ssl_certbundle_file>
```

This configuration ensures that the application communicates securely and correctly with database and storage services.

## Database Schema

Ensure your PostgreSQL database includes the following table structure:

```sql
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    about VARCHAR(255),
    title VARCHAR(255),
    contacts JSONB,
    profpic TEXT,
    project JSONB[]
);
```

## File Uploads

The API utilizes `multer` to handle image uploads, connecting to DigitalOcean spaces for CDN storage. Ensure the bucket permissions and security policies support uploading and accessing these files.

## Key Features

- **Create/Edit Portfolio**: Complete CRUD operations for user's portfolio.
- **Secure Communication**: HTTPS ensures all interactions are encrypted.
- **File Storage**: Integration with AWS/DigitalOcean for profile picture storage and retrieval.
- **JSONB Support**: Flexible data structures using JSONB for contacts and project details in PostgreSQL.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd foam-backend
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
The server should now be running, and you can access the API according to the configured `APP_PORT`.

## Additional Information

For contribution, enhancements, or issues, feel free to contribute to the repository or get in touch with the maintainers.

## Contributing

Your contributions are welcome! Please submit pull requests for any improvements or bug fixes you identify.

### License

This project uses Apache-2.0. Please refer to the license document for more information.