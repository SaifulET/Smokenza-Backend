##Smokenza Backend


## Short Summary

This is the central Node.js/Express API for the Smokenza/Ciger Ecommerce system. It manages authentication, products, brands, blogs, carts, orders, payments, refunds, tax calculation, notifications, employee/admin approval, service pricing, carousel images, and revenue breakdown analytics. The backend is feature-rich and already connected to MongoDB, AWS S3, Ecrypt, TaxJar, email, and Socket.IO, but it needs tightening around security, environment configuration, realtime startup, validation, and production readiness.



## Technology Stack

- API server: `express`
- Database ODM: `mongoose`
- Auth/security: `jsonwebtoken`, `bcrypt`, `cookie-parser`, `helmet`, `cors`
- Uploads: `multer`, `multer-s3`, AWS SDK S3 client
- Payment gateway: Ecrypt Transaction Gateway through `axios`
- Tax: `taxjar`
- Email: `nodemailer`
- Realtime events: `socket.io`
- Jobs/scheduling dependencies: `node-cron`, `node-schedule`
- Validation dependency: `zod`
- Testing dependencies present: `jest`, `supertest`, but no active tests found

## Main Architecture

The backend follows a mostly conventional Express architecture:

- `src/server.js`: Express app setup, middleware, route mounting, MongoDB connection, server startup.
- `src/routes`: HTTP route definitions grouped by domain.
- `src/controllers`: Request/response handlers.
- `src/services`: Business logic and database operations.
- `src/models`: Mongoose schemas.
- `src/middlewares`: Authentication and upload middleware.
- `src/utils`: Token/date/validation helpers.
- `src/socket.js`: Socket.IO initialization and notification emit helpers.


## Key Business Flows

### Customer Authentication

Customers can sign up, sign in, sign out, request OTP, verify OTP, and reset password. Passwords are hashed with bcrypt. JWT cookies are used for auth flows.

### Admin and Employee Access

Admins have a separate auth model and JWT secret. The employee flow creates or updates an `Admin` record by email, sends OTP, verifies OTP, marks approval, sets password, and then lets approved users sign in.

### Product Catalog

Products support image uploads to S3, brand linkage, price/discount metadata, best/new flags, stock flags, categories, subcategories, colors, and description. The product service normalizes names to prevent duplicate products with spacing/case differences.

### Cart and Checkout

The customer app adds products to cart, selects items, marks checkout items, calculates tax, tokenizes payment through Collect.js, sends payment to the backend, and the backend creates an order from selected checkout carts.

### Order Creation

Order creation:

1. Loads selected, checkout-enabled carts for a user.
2. Populates product and brand data.
3. Resolves or creates a user record.
4. Decrements product inventory.
5. Calculates subtotal, tax, discount, shipping, and total.
6. Generates an order ID.
7. Creates the order.
8. Creates a notification.
9. Creates revenue breakdown records by product category.
10. Clears selected state on cart items.

### Payment and Refund

Payments are sent to the Ecrypt endpoint as form-encoded data. If the gateway returns a transaction ID, the backend creates an order. Refunds call Ecrypt again with refund data, and admin order status updates can add a refund breakdown entry.

### Notifications and Analytics

Notifications are stored in MongoDB and have Socket.IO helpers. Dashboard breakdowns aggregate monthly/yearly totals and subtract refund values.

## Strengths

- Broad business coverage for an ecommerce workflow.
- Clear route/controller/service/model separation in many modules.
- Uses Mongoose relations and population for orders, carts, products, brands, and users.
- Supports S3 image upload with file type checks.
- Payment, tax, order confirmation email, refund email, tracking email, and notifications are already wired.
- Frontend-facing endpoints are grouped by domain and are easy to map.
- Product duplicate prevention by normalized name is a useful business rule.


## API Domains

The backend mounts these route groups:

- `/auth`: customer signup, signin, forgot password, OTP, reset password, signout, user list.
- `/admin`: admin signup, signin, forgot password, OTP, reset password, profile, signout.
- `/employee`: employee/admin invite, OTP verification, password setup, approval management.
- `/product`: product CRUD, discounted/new/best products, search/filter, related products.
- `/brand`: brand CRUD.
- `/blog`: blog CRUD.
- `/review`: review CRUD.
- `/cart`: cart creation, cart selection, checkout flags, user cart retrieval, deletion.
- `/discount`: discount code CRUD and lookup by code.
- `/servicePricing`: service pricing create/read/update.
- `/carousel`: carousel image upload, listing, deletion.
- `/order`: order creation, listing, single order, status/tracking updates, user order history.
- `/categoryPayment`: category payment summaries.
- `/profile`: customer profile read/update.
- `/notification`: user/admin notification lists and creation.
- `/dashboard`: monthly/yearly revenue breakdown.
- `/mail`: contact/order/refund/tracking emails.
- `/payment`: sale and refund processing.
- `/tax`: TaxJar tax calculation.

## Data Model Overview

Important Mongoose models:

- `User`: customer identity, email, password, address/profile fields, signin flag, OTP.
- `Admin`: admin/employee identity, approval flag, password, signin flag, OTP.
- `Product`: name, images, price, discount, average rating, inventory count, brand, category, color, description, best/new flags.
- `Brand`: name, image, feature flag.
- `Blog`: name, description, image.
- `Cart`: user, product, quantity, total, selected/ordered/checkout flags.
- `Order`: customer contact/address, order IDs, status, tax, discount, shipping, totals, transaction ID, user, cart references.
- `Review`: user, product, review text, rating.
- `Discount`: code, percentage, description.
- `Payment`: user/order payment record.
- `Notification`: user notification and linked order.
- `Breakdown`: monthly/yearly category revenue/refund record.
- `ServicePricing`, `Carousel`, `CategoryPayment`, `Checkout`, `UserOrderHistory`: supporting commerce/admin models.



