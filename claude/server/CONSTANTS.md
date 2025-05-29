# Constants Module

## Genel Bakış
Constants modülü, uygulamanın merkezi konfigürasyon yönetimini sağlar. Environment değişkenleri ve uygulama genelindeki ayarları yönetir.

## Konum
`/src/constant/`

## Ana Dosyalar
- `constant.module.ts` - Global modül tanımı
- `constant.service.ts` - Service implementasyonu
- `constant.type.ts` - TypeScript tip tanımlamaları

## Kullanım

### Import
```typescript
import { ConstantService } from '@/constant/constant.service';
```

### Kullanıldığı Yerler

#### 1. **Main.ts** (`/src/main.ts`)
- App port konfigürasyonu
- CORS ayarları
- Swagger dokümantasyon kurulumu

#### 2. **AppModule** (`/src/app.module.ts`)
- TypeORM veritabanı bağlantı konfigürasyonu
- JWT modül konfigürasyonu

#### 3. **AuthModule** (`/src/auth/auth.module.ts`)
- JWT secret ve expiration ayarları

#### 4. **AuthService** (`/src/auth/auth.service.ts`)
- Kullanıcı doğrulama
- Admin key kontrolü

#### 5. **JwtStrategy** (`/src/auth/strategies/jwt.strategy.ts`)
- JWT secret validation

## Ana Sabitler

### NODE_ENV
- **Tip**: `"development" | "production"`
- **Varsayılan**: `"development"`
- **Kullanım**: Environment durumunu belirler

### DATABASE
```typescript
{
  PORT: 3306,
  HOST: "127.0.0.1",
  USERNAME: "admin",
  PASSWORD: "admin123",
  NAME: "sample-database"
}
```

### APP
```typescript
{
  PORT: 3000,
  HOST: "localhost",
  PATH: "",
  PROTOCOL: "http"
}
```

### Güvenlik
- **ADMIN_KEY**: `"HIGHSECURIRTYADMINKEY"`
- **JWT_KEY**: `"HIGHSECURIRTYJWTKEY"`

### USERS
Varsayılan kullanıcı listesi:
```typescript
[{
  email: "user@mail.com",
  password: "password123!"
}]
```

## Yardımcı Metodlar

### isDevelopment
```typescript
get isDevelopment(): boolean {
  return this.CONSTANTS.NODE_ENV !== 'production';
}
```

### isProduction
```typescript
get isProduction(): boolean {
  return !this.isDevelopment;
}
```

### appUrl
Dinamik URL oluşturur:
```typescript
get appUrl(): string {
  // Development: http://localhost:3000
  // Production: http://localhost
}
```

## Notlar
- Global modül olarak tanımlanmış (@Global() decorator)
- Tüm uygulamada singleton olarak kullanılır
- Type-safe erişim sağlar
- Hard-coded değerler içerir (production'da environment variables kullanılmalı)