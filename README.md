Cây thư mục:
AuthStarter2
├─ index.js                // entry của RN, đăng ký App
├─ App.tsx                 // khai báo NavigationContainer + Stack + Auth flow
├─ lib/
│  └─ firebaseConfig.ts    // (tùy) cấu hình firebase nếu xài
├─ screens/
│  ├─ Onboarding.tsx       // màn chào đầu tiên -> đi tới Login
│  ├─ Login.tsx            // đăng nhập, gọi firebase / mock -> nếu ok đi AppShell
│  ├─ Signup.tsx           // đăng ký, xong thì cũng đi AppShell
│  ├─ Forgot.tsx           // quên mật khẩu -> quay lại Login
│  ├─ AppShell.tsx         // “khung” sau đăng nhập, chứa bottom nav 5 nút
│  ├─ Home.tsx             // tab 3 (ở giữa) – màn chính
│  ├─ Profile.tsx          // tab 1 – thông tin user / setting
│  ├─ Messages.tsx         // tab 2 – danh sách chat giả
│  └─ Photos.tsx           // tab 4 – danh sách ảnh giả
└─ components/
   └─ BottomBar.tsx        // 5 nút tròn giống reel insta: profile, messages, home, photos, logout
Luồng di chuyển của App:
Onboarding
   ↓
 Login ←→ Signup
   ↓        ↑
  Forgot ---┘
   ↓ (success)
 AppShell
  ├─ Profile
  ├─ Messages
  ├─ Home
  ├─ Photos
  └─ Logout → Onboarding

