import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.Route.js";
import ProuductRouter from "./routes/product.Route.js";
import brandRoute from "./routes/brandRoutes.js";
import blogRoute from "./routes/blog.route.js";
import reviewRoute from "./routes/review.Route.js";
import cartRoute from "./routes/cart.Route.js";
import discountRouter from "./routes/discount.Route.js";
import ServicePricingRouter from "./routes/servicePricing.Route.js";
import carouselRouter from "./routes/carousel.route.js";
import orderRouter from "./routes/order.Route.js";
import categoryPaymentRouter from "./routes/categoryPayment.route.js";
import ProfileRoute from "./routes/user.Route.js";
import notificationRoute from "./routes/notification.route.js";
import adminRoutes from "./routes/admin.Route.js";
import BreakdownRouter from "./routes/breakdown.route.js";
import MailRouter from "./routes/mail.route.js";
import paymentRouter from "./routes/payment.route.js";
import taxRouter from "./routes/tax.route.js";
import employeeRoutes from "./routes/employee.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "ciger-backend" });
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/product", ProuductRouter);
app.use("/brand", brandRoute);
app.use("/blog", blogRoute);
app.use("/review", reviewRoute);
app.use("/cart", cartRoute);
app.use("/discount", discountRouter);
app.use("/servicePricing", ServicePricingRouter);
app.use("/carousel", carouselRouter);
app.use("/order", orderRouter);
app.use("/categoryPayment", categoryPaymentRouter);
app.use("/profile", ProfileRoute);
app.use("/notification", notificationRoute);
app.use("/dashboard", BreakdownRouter);
app.use("/mail", MailRouter);
app.use("/payment", paymentRouter);
app.use("/tax", taxRouter);
app.use("/employee", employeeRoutes);

export default app;
