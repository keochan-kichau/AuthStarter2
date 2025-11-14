AuthStarter/
│  index.js                 // entry của React Native, đăng ký App
│  App.tsx                  // Khai báo NavigationContainer + RootNavigator
│  firebaseConfig.ts        // cấu hình Firebase
│
├─ navigation/
│    RootNavigator.tsx      // điều hướng: Onboarding → Auth → App Flow
│
├─ components/
│    BottomBar.tsx          // thanh điều hướng 5 nút (style giống reel instagram)
│    NeonButton.tsx         // nút neon + animation khi bấm
│    GlassCard.tsx          // thẻ glass UI
│
├─ screens/
│   ├─ Onboarding/
│   │    Onboarding1.tsx    // màn chào 1
│   │    Onboarding2.tsx    // màn chào 2
│   │    Onboarding3.tsx    // màn chào 3 → đi tới Login
│   │
│   ├─ Auth/
│   │    Login.tsx          // đăng nhập Firebase
│   │    Signup.tsx         // đăng ký Firebase
│   │    Forgot.tsx         // quên mật khẩu → quay lại login
│   │
│   └─ Main/
│        Home.tsx           // màn chính sau đăng nhập, chứa BottomBar
│        Profile.tsx        // tab 1 — thông tin user
│        Buying.tsx         // tab 2 — chọn giữa Shop & Checkout
│        Shop.tsx           // shop → chọn sản phẩm
│        Checkout.tsx       // checkout → nếu ok đi Bills
│        Bills.tsx          // tab 4 — danh sách đơn đã mua
│
└─ android / ios / node_modules (mặc định)
Luồng:
Onboarding 1 -> Onboarding 2 -> Onboarding 3 -> Login -> Home (navigation 5 nút) -> Profile/Buying/Bills/Logout
Login -> Forgot/Signup
Buying -> Shop (Mua sắm)
Buying -> Checkout (Thanh toán) -> Bills
Logout -> Onboarding 1
