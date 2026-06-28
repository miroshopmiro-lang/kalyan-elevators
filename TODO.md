# TODO - Kalyan Elevators Website Updates

- [ ] Add “Our Installations in Motion.” horizontal video+image gallery section (before Contact block, without touching existing Testimonials)
  - [ ] Create `src/components/InstallationsInMotion.jsx`
  - [ ] Use `/public/gallery/*` assets (mp4 first, then images)
  - [ ] Video settings: `preload="none"`, `muted`, `controls`, `playsInline`
  - [ ] Implement horizontal scroll with “peek” effect
  - [ ] Title styling: “Our Installations in Motion.”
- [ ] Update `src/App.jsx`
  - [ ] Import `InstallationsInMotion`
  - [ ] Insert between `<Testimonials />` and `<ContactSection />`
- [ ] Run dev/build to verify UI works
  - [ ] Ensure no TS/ESLint errors
  - [ ] Confirm horizontal gallery scroll + controls behave correctly
