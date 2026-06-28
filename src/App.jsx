import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProductsServices from './components/ProductsServices'
import ProductRange from './components/ProductRange'
import Testimonials from './components/Testimonials'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import StickyDock from './components/StickyDock'
import QuoteModal from './components/QuoteModal'

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const openQuote = () => setQuoteOpen(true)
  const closeQuote = () => setQuoteOpen(false)

  return (
    <div className="min-h-screen bg-white text-charcoal overflow-x-hidden">
      <Navbar onQuote={openQuote} />
      <main>
        <Hero onQuote={openQuote} />
        <AboutSection />
        <ProductsServices />
        <ProductRange onQuote={openQuote} />
        <Testimonials />
        <ContactSection onQuote={openQuote} />
      </main>
      <Footer />
      <StickyDock onQuote={openQuote} />
      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </div>
  )
}
