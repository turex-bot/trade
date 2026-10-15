# TimberFlow Web - Frontend

Frontend aplikasi Sistem Manajemen Trader Kayu Lapis (Plywood) dengan standar enterprise.

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios (planned)

## ✨ Features

### Core Modules
- ✅ Dashboard dengan KPI real-time
- ✅ Master Data Management
  - Supplier (Depo Kayu)
  - Company (Perusahaan Plywood)
  - Wood Specification
  - Price List
- ✅ Transaction Management
  - Order (Multi-item support)
  - Delivery Order
- ✅ Financial Management
  - Payables (Uang Keluar)
  - Receivables (Uang Masuk)
  - Payment Recording
- ✅ Reports & Analytics
- ✅ Audit Log
- ✅ Settings & User Management

### Advanced Features
- ✅ Command Palette (⌘K)
- ✅ Toast Notifications
- ✅ Notification Center
- ✅ Role-Based Access Control
- ✅ JWT Authentication
- ✅ Real-time Updates

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/timberflow-web.git
cd timberflow-web

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# Run development server
npm run dev
```

## 🔧 Configuration

### Environment Variables

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=TimberFlow
VITE_APP_VERSION=1.0.0
```

## 🏗️ Project Structure

```
timberflow-web/
├── public/                    # Static assets
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── assets/               # Images, fonts, etc
│   │   ├── images/
│   │   └── fonts/
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Table.tsx
│   │   ├── forms/           # Form components
│   │   │   ├── SupplierForm.tsx
│   │   │   ├── CompanyForm.tsx
│   │   │   └── OrderForm.tsx
│   │   ├── tables/          # Table components
│   │   │   ├── SupplierTable.tsx
│   │   │   ├── CompanyTable.tsx
│   │   │   └── OrderTable.tsx
│   │   ├── charts/          # Chart components
│   │   │   ├── VolumeChart.tsx
│   │   │   └── ProfitChart.tsx
│   │   ├── Layout.tsx       # Main layout
│   │   ├── Sidebar.tsx      # Sidebar navigation
│   │   ├── Header.tsx       # Top header
│   │   ├── Toast.tsx        # Toast notifications
│   │   ├── CommandPalette.tsx # ⌘K search
│   │   └── NotificationCenter.tsx
│   ├── context/             # State management
│   │   ├── DataContext.tsx  # Main data context
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── ThemeContext.tsx # Theme context
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useData.ts
│   │   └── useLocalStorage.ts
│   ├── pages/               # Page components
│   │   ├── auth/
│   │   │   └── Login.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── master/
│   │   │   ├── Suppliers.tsx
│   │   │   ├── Companies.tsx
│   │   │   ├── WoodSpecs.tsx
│   │   │   └── Prices.tsx
│   │   ├── transactions/
│   │   │   ├── Orders.tsx
│   │   │   └── Deliveries.tsx
│   │   ├── finance/
│   │   │   ├── Payables.tsx
│   │   │   └── Receivables.tsx
│   │   ├── reports/
│   │   │   └── Reports.tsx
│   │   ├── settings/
│   │   │   └── Settings.tsx
│   │   └── audit/
│   │       └── AuditLog.tsx
│   ├── services/            # API services
│   │   ├── api.ts          # Axios instance
│   │   ├── auth.service.ts
│   │   ├── supplier.service.ts
│   │   ├── company.service.ts
│   │   ├── order.service.ts
│   │   └── payment.service.ts
│   ├── types/               # TypeScript types
│   │   ├── index.ts
│   │   ├── supplier.ts
│   │   ├── company.ts
│   │   ├── order.ts
│   │   └── payment.ts
│   ├── utils/               # Utility functions
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── logVolumeFormatter.ts
│   ├── constants/           # Constants
│   │   ├── routes.ts
│   │   ├── roles.ts
│   │   └── config.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .env                    # Environment variables
├── .env.example           # Environment template
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colors
```css
Primary: #15803d (Forest Green)
Secondary: #64748b (Slate)
Success: #16a34a (Green)
Warning: #f59e0b (Amber)
Danger: #dc2626 (Red)
Info: #2563eb (Blue)

Background: #f5f7fa (Soft Gray)
Surface: #fafbfc (Very Light)
Text: #334155 (Soft Dark)
Border: #e5e7eb (Soft Border)
```

### Typography
```css
Font Family: Inter
Headings: 700 (Bold)
Body: 400 (Regular)
Small: 300 (Light)
```

## 📊 Business Logic

### Volume Calculation
```typescript
// Formula: V = (π/4) × d² × L
function calculateVolume(diameterCm: number, lengthCm: number): number {
  const diameterM = diameterCm / 100;
  const lengthM = lengthCm / 100;
  return (Math.PI / 4) * Math.pow(diameterM, 2) * lengthM;
}
```

### Margin Calculation
```typescript
// Trader margin: Rp15.000 per m³
function calculateMargin(volumeM3: number): number {
  return volumeM3 * 15000;
}
```

## 🔐 Authentication

```typescript
// Login
const response = await authService.login(email, password);
localStorage.setItem('token', response.token);

// Protected routes
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 📝 Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:e2e": "cypress run",
  "lint": "eslint src --ext ts,tsx",
  "format": "prettier --write src"
}
```

## 🔗 Related

- Backend API: [timberflow-api](https://github.com/YOUR_USERNAME/timberflow-api)
- Documentation: [Wiki](https://github.com/YOUR_USERNAME/timberflow-web/wiki)

## 📄 License

MIT License

## 🆘 Support

Email: support@timberflow.id

---

**Built with ❤️ for Indonesian Plywood Traders**
