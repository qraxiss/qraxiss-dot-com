# Status Module

## Genel Bakış

Status modülü, uygulamada hata yönetimi ve güvenli operasyon yürütme için kapsamlı bir sistem sağlar. Standardize edilmiş response formatları ve error handling mekanizmaları içerir.

## Konum

`/src/status/`

## Ana Dosyalar

- `status.module.ts` - Modül tanımı
- `status.service.ts` - Service implementasyonu (şu anda boş)
- `status.type.ts` - TypeScript tip tanımlamaları
- `errors.ts` - Custom error sınıfları ve registry
- `response.dto.ts` - API response DTO'ları
- `safe-run.ts` - Güvenli operasyon yürütme utility'leri

## Ana Bileşenler

### StatusType Interface

```typescript
interface StatusType<T> {
    success: boolean;
    data: T | null | undefined;
    error: LocalError | Error | null | undefined;
}
```

Tüm operasyonlar için standardize edilmiş response formatı sağlar.

### Custom Error Sınıfları

#### LocalError (Base Class)
```typescript
class LocalError extends Error {
    constructor(public message?: string)
}
```

#### Mevcut Error Türleri
- **NotFoundError** - Kaynak bulunamadığında
- **WrongPassword** - Yanlış şifre durumunda  
- **TestError** - Test amaçlı kullanım

#### ErrorRegistry
Error sınıflarını otomatik olarak kaydeder ve enum oluşturur:
```typescript
const ErrorEnum = ErrorRegistry.getEnum();
```

### SafeRun Utilities

#### safeRun Function
```typescript
async function safeRun<T>(
    promise: Promise<T>,
    resource?: string,
    successMessage?: (result: T) => string
): Promise<StatusType<T>>
```

Promise'leri güvenli şekilde execute eder:
- Hataları yakalar ve loglar
- Execution time ölçer
- Standardize response döner

#### SafeRun Decorator
```typescript
@SafeRun<T>(resource?: string, successMessage?: (result: T) => string)
```

Method'ları otomatik olarak safeRun ile wrap eder.

## Response DTOs

### ErrorDto
```typescript
class ErrorDto {
    message: string;
    name: string;
    stack: string;
}
```

### ResponseDto
```typescript
class ResponseDto {
    success: boolean;
    data: any | null | undefined;
    error: LocalError | null | undefined;
}
```

Swagger dokümantasyonu için API property'leri içerir.

## Kullanıldığı Yerler

### AuthController (`/src/auth/auth.controller.ts`)
- Login ve authentication operasyonlarında
- SafeRun decorator kullanımı

### LogsController (`/src/logs/logs.controller.ts`) 
- Log kayıtlarını güvenli şekilde işleme
- Error handling

### Frontend Invoice List (`/web/app/pages/settings/components/InvoiceTable/invoiceList.ts`)
- Frontend'de status type kullanımı

## Kullanım Örnekleri

### Function ile Kullanım
```typescript
const result = await safeRun(
    someAsyncOperation(),
    'UserService',
    (data) => `User created: ${data.id}`
);

if (result.success) {
    // data kullanılabilir
} else {
    // error handling
}
```

### Decorator ile Kullanım
```typescript
@SafeRun('UserService', (user) => `User updated: ${user.id}`)
async updateUser(id: string): Promise<User> {
    // method implementation
}
```

### Custom Error Fırlatma
```typescript
if (!user) {
    throw new NotFoundError('User not found');
}
```

## Avantajları

- **Tutarlı Error Handling**: Tüm uygulamada aynı format
- **Otomatik Logging**: Performance ve error logları
- **Type Safety**: TypeScript ile güvenli kullanım
- **Swagger Integration**: API dokümantasyonu desteği
- **Decorator Pattern**: Clean code için minimal boilerplate

## Notlar

- Modül şu anda sadece utility'leri export eder
- StatusService boş (gelecek kullanım için hazır)
- Error registry otomatik çalışır
- Frontend ve backend'de aynı tip sistemini kullanır