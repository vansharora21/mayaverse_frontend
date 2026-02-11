# 📁 MAYAVERSE - Complete File Structure & Paths Reference

## All Project Files Organized by Category

### 🎯 Root Configuration Files
```
c:/Users/Aditya/mayaverse_frontend/
├── package.json                           # Dependencies (GSAP, React Router, etc.)
├── vite.config.js                         # Vite build configuration
├── tailwind.config.js                     # Tailwind CSS configuration (if using)
├── postcss.config.js                      # PostCSS configuration
├── index.html                             # HTML entry point
└── README.md                              # Project documentation
```

---

### 🎨 Source Files Structure

#### **Entry Point**
```
src/
├── main.jsx                               # React app entry point
├── App.jsx                                # Root component with providers
├── App.css                                # App-level styles
├── index.css                              # Base styles
```

#### **Global Styles**
```
src/styles/
├── global.css                             # Global CSS (resets, base styles)
└── variables.css                          # CSS custom properties (colors, spacing, etc.)
```

#### **Constants & Configuration**
```
src/constants/
└── config.js
    - APP_NAME = 'MAYAVERSE'
    - APP_TAGLINE
    - ROUTES (all route definitions)
    - EVENT_CATEGORIES
    - MERCH_CATEGORIES
    - DEFAULT_CREDENTIALS
```

#### **Routing System**
```
src/routes/
├── AppRoutes.jsx                          # Main route definitions
│   ├─ Public routes (Home, About, Events, Sponsors, Merchandise)
│   ├─ Auth routes (Login, Signup)
│   ├─ User routes (Profile) - protected
│   └─ Admin routes (Dashboard) - admin protected
├── ProtectedRoute.jsx                     # Guards user routes (requires auth)
└── AdminRoute.jsx                         # Guards admin routes (requires admin role)
```

#### **Layouts** (Page Template Structure)
```
src/layouts/
├── PublicLayout/
│   ├── PublicLayout.jsx
│   │   ├─ <Navbar />
│   │   ├─ <PortalTransition><Outlet /></PortalTransition>
│   │   └─ <Footer />
│   └── PublicLayout.module.css
│
├── UserLayout/
│   ├── UserLayout.jsx
│   │   ├─ <Sidebar /> or <UserNav />
│   │   ├─ <Outlet /> (user pages)
│   │   └─ Optional: <PortalTransition>
│   └── UserLayout.module.css
│
└── AdminLayout/
    ├── AdminLayout.jsx
    │   ├─ <AdminNav />
    │   ├─ <Outlet /> (admin pages)
    │   └─ Optional: <PortalTransition>
    └── AdminLayout.module.css
```

#### **Components** (Reusable UI Elements)
```
src/components/
└── common/
    ├── Navbar/
    │   ├── Navbar.jsx                    # Navigation bar component
    │   └── Navbar.module.css
    │
    ├── Footer/
    │   ├── Footer.jsx                    # Footer component
    │   └── Footer.module.css
    │
    └── AnimationSettings/
        ├── AnimationSettings.jsx         # User preference controls
        └── AnimationSettings.module.css
```

#### **Pages** (Full Page Components)
```
src/pages/
│
├── public/ (Wrapped in PublicLayout)
│   ├── Home/
│   │   ├── Home.jsx                      # ✅ ANIMATED
│   │   │   - Hero reveal
│   │   │   - Stats counter (animated numbers)
│   │   │   - Feature cards on scroll
│   │   │   - CTA parallax
│   │   └── Home.module.css
│   │
│   ├── About/
│   │   ├── About.jsx                     # ✅ ANIMATED
│   │   │   - Text reveals on scroll
│   │   │   - Floating glyphs
│   │   │   - Value cards entrance
│   │   └── About.module.css
│   │
│   ├── Events/
│   │   ├── Events.jsx                    # ✅ ANIMATED (Trials Arena)
│   │   │   - Arena entrance (3D reveal)
│   │   │   - Card pulses
│   │   │   - Category glow effects
│   │   │   - Filter ripples
│   │   │   - Full event management
│   │   └── Events.module.css
│   │
│   ├── Sponsors/
│   │   ├── Sponsors.jsx                  # ✅ ANIMATED (Pact Chamber)
│   │   │   - Hero entrance
│   │   │   - Sponsor cards by tier
│   │   │   - Ready for pillar animation
│   │   └── Sponsors.module.css
│   │
│   └── Merchandise/
│       ├── Merchandise.jsx               # ✅ ANIMATED (Rift Market)
│       │   - Rift entry (split effect)
│       │   - Lightning flashes
│       │   - Hero reveal through rift
│       │   - Product filtering
│       └── Merchandise.module.css
│
├── user/ (Wrapped in UserLayout, protected)
│   ├── Login/
│   │   ├── Login.jsx                     # User login form
│   │   └── Login.module.css
│   │
│   ├── Signup/
│   │   ├── Signup.jsx                    # User registration form
│   │   └── Signup.module.css
│   │
│   └── UserProfile/
│       ├── UserProfile.jsx               # User dashboard
│       │   - Registered events
│       │   - Orders
│       │   - Profile settings
│       └── UserProfile.module.css
│
└── admin/ (Wrapped in AdminLayout, admin protected)
    ├── AdminLogin/
    │   ├── AdminLogin.jsx                # Admin login form
    │   └── AdminLogin.module.css
    │
    └── AdminDashboard/
        ├── AdminDashboard.jsx            # Admin panel
        │   - Manage events
        │   - Manage sponsors
        │   - Manage merchandise
        │   - User list
        └── AdminDashboard.module.css
```

#### **Authentication System**
```
src/contexts/
└── AuthContext.jsx
    - Provides auth state
    - User object (id, email, role, registeredEvents)
    - Login/logout functions
    - Registration handling

src/hooks/
└── useAuth.js
    - Consume AuthContext
    - Check isAuthenticated()
    - Get current user
    - Check user role (admin, user)
```

#### **Data Services** (API / Mock Data)
```
src/services/
└── mockData.js
    - getEvents() → returns all events
    - getMerchandise() → returns products
    - getSponsors() → returns sponsors
    - getUsers() → returns users (admin)
    - registerForEvent(userId, eventId)
    - All functions return Promises
    - Ready to be replaced with real API calls
```

#### **Utility Functions**
```
src/utils/
└── helpers.js
    - formatDate(date) → formats dates
    - formatCurrency(amount, currency) → formats prices
    - formatTime(time) → formats time strings
    - Other helper functions
```

---

### 🎬 ANIMATION SYSTEM (The Heart of Your Project)

#### **Animation Configuration**
```
src/animations/config/
├── gsap.config.js                        # Alternative GSAP setup (if used)
└── (Can add animation presets here)
```

#### **Animation Hooks** (Use these in components!)
```
src/animations/hooks/
├── useGSAP.js                            # ⭐ MAIN HOOK
│   Usage:
│   useGSAP(() => {
│     gsap.from(ref, { opacity: 0 });
│   }, []);
│
├── usePageTransition.js
│   Usage:
│   const { triggerTransition } = usePageTransition();
│   triggerTransition(() => navigate('/page'));
│
├── useReducedMotion.js
│   Usage:
│   const prefersReducedMotion = useReducedMotion();
│
├── useScrollLock.js
│   Usage:
│   const { lockScroll, unlockScroll } = useScrollLock();
│
└── usePerformance.js
    Usage:
    const { performanceLevel, shouldAnimate } = usePerformance();
```

#### **Animation Effects** (Reusable animation functions)
```
src/animations/effects/
├── portalEffect.js                       # Portal opening animation
│   - portalEntryWithContent()
│   - Smooth transition effect
│
├── textReveal.js                         # Text reveal animations
│   - Fade, slide, or letter-by-letter reveals
│   - Staggered word animations
│
├── glow.js                               # Glow and pulse effects
│   - boxShadow glow animations
│   - Pulsing effects
│   - Category-based glow colors
│
├── lightning.js                          # Lightning flash effects
│   - Random red flashes
│   - Used on Merchandise page
│
├── parallax.js                           # Parallax scroll effects
│   - Depth effect with scroll
│   - Y-axis movement based on scroll
│
└── portal.js                             # Portal visual effects
    - Various portal opening animations
    - Transform and opacity effects
```

#### **Page-Specific Animation Scenes** (Orchestrate all animations for a page)
```
src/animations/scenes/
├── HomeAnimations.js
│   - setupHomeAnimations({ heroTitleRef, statsContainerRef, ... })
│   - Controls all Home page animations
│
├── AboutAnimations.js
│   - setupAboutAnimations(refs)
│   - Text reveals, glyphs, value cards
│
├── EventsAnimations.js
│   - setupEventsAnimations({ cardsContainerRef, ... })
│   - Card pulses, glow effects, filter ripples
│
├── SponsorsAnimations.js
│   - setupSponsorsAnimations(refs)
│   - Sponsor cards, tier reveals
│
├── MerchandiseAnimations.js
│   - setupMerchandiseAnimations(refs)
│   - Rift effect, lightning, portal pulse
│
├── home.scene.js                         # Alternative: scene files
├── about.scene.js
├── events.scene.js
├── sponsors.scene.js
└── merchandise.scene.js
```

#### **Route Transitions** (Portal effects between pages)
```
src/animations/transitions/
├── PortalTransition.jsx                  # ⭐ MAIN TRANSITION COMPONENT
│   - Automatically detects route changes
│   - Wraps page content
│   - Applies portal effect
│   - Used in PublicLayout
│
├── PortalTransition.module.css
│   - .portalOverlay (portal visual)
│   - .content (page content)
│   - Portal animation keyframes
│
├── PageTransition.jsx
│   - Alternative page transition component
│
└── PageTransition.module.css
    - Alternative transition styles
```

#### **Animation Utilities & Helpers**
```
src/animations/utils/
├── gsapConfig.js                         # ⭐ GSAP SETUP
│   - Registers GSAP plugins (ScrollTrigger)
│   - cinematicEase presets
│   - duration presets
│   - Global GSAP defaults
│
├── performanceDetector.js                # Device performance detection
│   - Detects CPU, RAM, device type
│   - Tests FPS
│   - 3-tier system: High, Medium, Low
│   - Adjusts animation complexity
│
├── performance.js                        # Performance monitoring
│   - FPS detection
│   - Memory usage tracking
│   - Logs performance info
│
├── scroll.js                             # Scroll utilities
│   - Scroll helpers
│   - Smooth scroll functions
│
├── scrollUtils.js                        # Advanced scroll utilities
│   - ScrollTrigger helpers
│   - Scroll-locked sections
│
└── cleanup.js                            # GSAP cleanup utilities
    - killAllAnimations()
    - killTimeline()
    - Proper memory cleanup
```

---

### 📦 Static Assets

```
public/
├── assets/
│   ├── animations/                       # Animation assets (SVGs, etc.)
│   ├── icons/                            # Icon SVGs or images
│   ├── images/                           # Background images, photos
│   └── videos/                           # Background videos
```

---

## How Files Connect (Data Flow)

### Route Navigation Flow:
```
User clicks link
     ↓
React Router intercepts
     ↓
AppRoutes.jsx checks which layout
     ↓
PublicLayout / UserLayout / AdminLayout loads
     ↓
PortalTransition detects route change
     ↓
Portal animation plays
     ↓
New page component renders (Home, Events, etc.)
     ↓
useGSAP hook in page triggers
     ↓
Page-specific animations play (HomeAnimations, EventsAnimations, etc.)
```

### Animation Flow:
```
Component mounts
     ↓
useGSAP hook called
     ↓
Check useReducedMotion() & usePerformance()
     ↓
Create refs and attach to DOM
     ↓
GSAP imports gsapConfig
     ↓
Animation code runs (uses cinematicEase & duration presets)
     ↓
ScrollTrigger detects scroll events
     ↓
onEnter/onLeave callbacks trigger animations
     ↓
Component unmounts
     ↓
useGSAP cleanup function kills timelines & ScrollTriggers
     ↓
Memory freed, no leaks
```

### Authentication Flow:
```
User clicks Login
     ↓
AuthContext provides login function
     ↓
User enters credentials
     ↓
mockData.js returns mock user
     ↓
AuthContext updates state
     ↓
ProtectedRoute allows access to /profile
     ↓
useAuth hook provides user data to UserProfile
     ↓
displayUser info, registered events, orders
```

---

## Import Examples

### Using GSAP in a Component:
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/animations/hooks/useGSAP';
import { cinematicEase, duration } from '@/animations/utils/gsapConfig';

export default function MyComponent() {
  const myRef = useRef(null);

  useGSAP(() => {
    gsap.from(myRef.current, {
      opacity: 0,
      y: 30,
      duration: duration.fast,
      ease: cinematicEase.smooth
    });
  }, []);

  return <div ref={myRef}>Animated content</div>;
}
```

### Using Authentication:
```javascript
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <div>Welcome {user.email}</div>;
}
```

### Using Mock Data:
```javascript
import { getEvents } from '@/services/mockData';

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(response => {
      setEvents(response.events);
    });
  }, []);

  return events.map(event => <EventCard key={event.id} event={event} />);
}
```

### Using RouterDom:
```javascript
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/config';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.ABOUT}>About</Link>
      <button onClick={() => navigate(ROUTES.EVENTS)}>Events</button>
    </nav>
  );
}
```

---

## File Modification Guide

### To Add a New Page:
1. Create folder: `src/pages/public/NewPage/`
2. Create `NewPage.jsx` with animation hooks
3. Create `NewPage.module.css` for styles
4. Create `NewPageAnimations.js` in `src/animations/scenes/`
5. Add route in `src/routes/AppRoutes.jsx`
6. Add route constant in `src/constants/config.js`

### To Add a New Animation:
1. Create file in `src/animations/effects/`
2. Export animation function
3. Import in page component
4. Use with `useGSAP` hook

### To Customize Styles:
1. **Global colors:** Edit `src/styles/variables.css`
2. **Page styles:** Edit page's `.module.css` file
3. **Component styles:** Edit component's `.module.css` file

### To Replace Mock Data:
1. Edit `src/services/mockData.js`
2. Replace function bodies with API calls
3. Keep function signatures the same
4. Use same Promise pattern

---

## Development Workflow

```
Edit file
     ↓
Vite hot module reload (automatic)
     ↓
Browser refreshes in dev server
     ↓
Test animations
     ↓
Check console for errors (F12)
     ↓
Adjust and save again
     ↓
Repeat until perfect!
```

---

## Key Takeaways

1. **Every page is animated** - Home, About, Events, Sponsors, Merchandise
2. **Every route transition has visual effect** - Portal transition
3. **No manual cleanup needed** - useGSAP handles it
4. **Accessibility built-in** - prefers-reduced-motion respected
5. **Performance adaptive** - Auto-detects device capabilities
6. **Easy to customize** - Just edit config files
7. **Ready for backend** - Replace mockData with real API calls
8. **Production ready** - Run `npm run build` to deploy

---

## Folder Size Reference
```
src/animations/          ~50 KB  (All animation code)
src/pages/              ~100 KB  (All page components)
src/components/          ~30 KB  (Common components)
src/contexts/            ~10 KB  (Auth context)
src/hooks/              ~5 KB   (Custom hooks)
src/services/           ~20 KB  (Mock data)
src/styles/             ~10 KB  (Global styles)
src/utils/              ~5 KB   (Helper functions)
src/routes/             ~10 KB  (Routing)
src/layouts/            ~15 KB  (Layout components)
src/constants/          ~5 KB   (Configuration)
─────────────────────────────────
Total: ~260 KB          (Organized, production-ready)
```

---

**Your project is beautifully organized and ready to scale! 🚀**
