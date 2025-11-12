# 🚀 Mock API Mode Guide

## Tổng quan

Để giải quyết vấn đề kết nối API Gateway, tôi đã tạo Mock API mode cho phép bạn test toàn bộ giao diện mà không cần API thật.

## 🎯 Hiện tại

**Mock Mode đang BẬT** - Bạn có thể sử dụng app ngay lập tức!

## 📋 Mock Data có sẵn

### 👤 Test Users
```
Admin: admin@blindbox.com / admin123
User:  user@example.com / password123  
```

### 🏷️ Brands
- Pop Mart (China)
- Funko (USA) 
- Good Smile (Japan)
- Banpresto (Japan)
- Kotobukiya (Japan)
- Medicom Toy (Japan)

### 🎁 Blind Boxes (Updated Structure)
- Mystic Creatures Series 1 (Rare) - $29.99
- Labubu Monster Collection (Epic) - $45.99  
- Dragon Ball Legends Ultimate (Legendary) - $89.99
- Pokemon TCG Mystery Box (Epic) - $35.99
- Studio Ghibli Collection (Rare) - $42.99
- Hirono Mini Figure Set (Common) - $19.99
- Kawaii Friends Series (Common) - $24.99
- Vintage Toy Collection (Legendary) - $125.99

**Fields included**: blindBoxID, name, categoryID/Name, brandID/Name, rarity, price, releaseDate, stock

## ✨ Tính năng có thể test

### ✅ Hoạt động hoàn toàn
- ✅ Login/Logout
- ✅ Browse Blind Boxes với filters
- ✅ CRUD Brands (Create/Read/Update/Delete)
- ✅ Filter theo country
- ✅ Filter theo category/rarity
- ✅ Responsive design
- ✅ Animations & effects

## 🔧 Cách chuyển đổi mode

### Để BẬT Mock Mode (hiện tại)
File: `src/api/mockClient.js`
```javascript
const USE_MOCK_API = true
```

### Để TẮT Mock Mode (khi API Gateway ready)
```javascript  
const USE_MOCK_API = false
```

## 🎮 Cách test

1. **Mở app**: http://localhost:5173
2. **Login** với credentials mock
3. **Test Brands**: Thêm/sửa/xóa brands
4. **Test BlindBoxes**: Filter theo category (1-5) hoặc rarity dropdown (Common/Rare/Epic/Legendary)

## 🔍 Visual Indicators

- **Header**: Badge "🚀 MOCK MODE" khi đang dùng mock
- **Login**: Credentials màu xanh + text "MOCK MODE ACTIVE"

## ⚡ Performance

- Mock API có delay 300-500ms giống real API
- Data persist trong session (refresh sẽ reset)
- Network tab sẽ không hiện requests (vì là local mock)

## 🎯 Khi nào chuyển sang Real API

Khi bạn đã:
- ✅ Setup API Gateway trên port 8088
- ✅ MSAccount service (port 8081)
- ✅ MSBrand service (port 8082)  
- ✅ MSBlindBox service (port 8083)

Chỉ cần đổi `USE_MOCK_API = false` và restart dev server!

---

**🚀 Bây giờ bạn có thể test toàn bộ UI mà không cần chờ API!**