# 🧾 POS Dashboard Application

Modern Point of Sale (POS) and Admin Dashboard built with:

- ⚡ Next.js 16 (App Router)
- 🎨 TailwindCSS + ShadCN UI
- 🔐 NextAuth (Role-Based Authentication)
- 🗄 MongoDB (Mongoose)
- 🐳 Docker Ready
- 🔁 CI/CD with GitHub Actions

---

## 🚀 Features

### POS System

- Product listing
- Category filtering
- Search functionality
- Cart management
- Real-time total calculation

### Admin Dashboard

- Product CRUD operations
- Image upload support
- Sales statistics
- Role-based access control

---

## 🔐 Authentication

- Admin and Cashier roles
- Only Admin can access dashboard
- POS page is publicly accessible
- Secure password hashing with bcrypt

---

## 🐳 Docker Support

```bash
docker build -t pos-app .
docker run -p 3000:3000 pos-app
```
