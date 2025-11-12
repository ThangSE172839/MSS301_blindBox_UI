# blindBOX - UI Application

A React-based frontend for managing blind box collections with authentication, brand management, and blind box browsing.

## Features

- **Authentication**: Login with JWT token storage
- **Brand Management**: CRUD operations for brands (protected routes)
- **Blind Box Browsing**: View and filter blind boxes by category and rarity
- **Responsive Design**: Modern UI with Google Fonts and styled components

## API Integration

Ứng dụng này kết nối với các microservices thông qua API Gateway tại `http://localhost:8088`:

- **Authentication**: `POST /api/auth/login`
- **Brands**: `/api/brands/**` (GET, POST, PUT, DELETE)
- **Blind Boxes**: `/api/blind-boxes/**` (GET với bộ lọc)

### Cấu hình API Gateway
```
/api/auth/** → MSAccount Service (port 8081)
/api/brands/** → MSBrand Service (port 8082)  
/api/blind-boxes/** → MSBlindBox Service (port 8083)
```

### Direct Access (nếu không dùng Gateway)
- **MSAccount**: http://localhost:8081/api/auth/**
- **MSBrand**: http://localhost:8082/api/brands/**
- **MSBlindBox**: http://localhost:8083/api/blind-boxes/**

## Quick Start

### � Option 2: Direct Services Mode (Current)

**Kết nối trực tiếp với từng microservice:**

1. **Start các services**:
   - MSAccount Service: port 8081
   - MSBrand Service: port 8082  
   - MSBlindBox Service: port 8083

2. **Start UI**:
   ```bash
   npm run dev
   ```

3. **Login** với credentials từ Account Service của bạn

### � Option 3: Mock Mode  

**Không cần services! Test ngay lập tức:**

1. **Bật mock mode** trong `src/api/mockClient.js`:
   ```javascript
   const USE_MOCK_API = true
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Login với mock credentials**:
   ```
   Admin: admin@blindbox.com / admin123
   User:  user@example.com / password123
   ```

## Troubleshooting Login Issues

If login fails, check browser console (F12) for detailed error messages:

1. **Network Error**: API Gateway not running on port 8088
2. **404 Not Found**: Check gateway routes match `/api/accounts/auth/login`
3. **CORS Issues**: Ensure API Gateway allows requests from `http://localhost:5173`
4. **401 Unauthorized**: Invalid credentials

### API Configuration

If your API endpoints differ, update `src/api/client.js`:

```javascript
const API_BASE = 'http://localhost:8088/api'  // Change port/host if needed
```

If auth endpoint path differs, update `src/api/auth.js`:

```javascript
const resp = await client.post('/accounts/auth/login', { email, password })
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/          # API client and auth helpers
├── components/   # Reusable components (Header, ProtectedRoute)
├── pages/        # Route components (Login, Brands, BlindBoxes)
├── App.jsx       # Main app with routing
└── main.jsx      # Entry point
```
