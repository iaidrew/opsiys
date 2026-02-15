import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold mb-4 block">
              <span className="text-white">Ops</span>
              <span className="text-red-500">iys</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering founders to build systems, not just startups.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/tools" className="hover:text-white transition">Growth Tools</Link></li>
              <li><Link href="/ai" className="hover:text-white transition">AI Tools</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition">Analytics</Link></li>
              <li><Link href="/store" className="hover:text-white transition">Store</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/partners" className="hover:text-white transition">Partners</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
  
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Opsiys. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
  