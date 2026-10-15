# TimberFlow - Frontend

Sistem Manajemen Trader Kayu Lapis (Plywood) - Frontend Application

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API

## ✨ Features

### **Dashboard**
- Real-time KPI cards
- Volume & profit charts
- Recent orders & invoices
- Quick stats

### **Master Data**
- Supplier Management (Depo Kayu)
- Company Management (Perusahaan Plywood)
- Wood Specification Management
- Price List Management

### **Transactions**
- Order Management (Multi-item support)
- Diameter validation
- Auto volume calculation
- Status workflow

### **Finance**
- Payables (Uang Keluar ke Supplier)
- Receivables (Uang Masuk dari Perusahaan)
- Payment recording
- Margin calculation (Rp15.000/m³)
- KPI tracking

### **Reports**
- Transaction reports
- Profitability analysis
- Export to CSV

### **Settings**
- User management
- Notification settings
- Security settings

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

Create `.env` file in root directory:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.tsx       # Main layout with sidebar
│   ├── Toast.tsx        # Toast notifications
│   ├── CommandPalette.tsx # ⌘K search
│   └── ui/              # UI components
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── Suppliers.tsx
│   ├── Companies.tsx
│   ├── WoodSpecs.tsx
│   ├── Prices.tsx
│   ├── Orders.tsx
│   ├── Payables.tsx
│   ├── Receivables.tsx
│   └── Reports.tsx
├── context/             # State management
│   └── DataContext.tsx
├── data/                # Mock data & types
│   ├── mockData.ts
│   └── seedData.ts
├── utils/               # Helper functions
│   └── logVolumeFormatter.ts
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🎨 Design System

### **Colors**
- Primary: Forest Green (#15803d)
- Background: Soft Gray (#f5f7fa)
- Text: Soft Dark (#334155)
- Border: Soft Border (#e5e7eb)

### **Typography**
- Font: Inter
- Sizes: 11px - 24px
- Weights: 400, 500, 600, 700

### **Components**
- Cards with soft shadows
- Rounded corners (8px - 12px)
- Consistent spacing
- Hover effects

## 📊 Business Logic

### **Volume Calculation**
```typescript
// Formula: V = (π/4) × d² × L
// diameter in cm, length in cm, result in m³
volume = (Math.PI / 4) * Math.pow(diameter/100, 2) * (length/100)
```

### **Margin Calculation**
```typescript
// Trader margin: Rp15.000 per m³
margin = volume_m3 * 15000
```

### **Payment Calculation**

**To Supplier:**
```typescript
payable = total_price - margin
```

**From Company:**
```typescript
receivable = total_price  // Company pays full price
```

## 🔐 Authentication

```typescript
// Login
const response = await api.login(email, password);
localStorage.setItem('token', response.data.token);

// Protected routes
const token = localStorage.getItem('token');
headers: { 'Authorization': `Bearer ${token}` }
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run e2e tests (when implemented)
npm run test:e2e
```

## 🚀 Deployment

### **Vercel**
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### **Netlify**
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### **Custom Server**
```bash
npm run build
# Serve dist/ with nginx or any web server
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080/api/v1` |

## 🔗 Related Repositories

- **Backend API**: [trade-api](https://github.com/YOUR_USERNAME/trade-api)

## 📚 Documentation

- [Setup Guide](../SETUP_GUIDE.md)
- [Repository Structure](../REPOSITORY_STRUCTURE.md)
- [Business Logic](../BUSINESS_LOGIC_KPI.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License

## 🆘 Support

For support, email support@timberflow.id

---

**Built with ❤️ for Indonesian Plywood Traders**
