export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-serif text-xl font-bold mb-3">
              Ashanti Naturals
            </h3>
            <p className="text-sm leading-relaxed">
              Premium human hair wigs crafted with care. Experience natural
              beauty with our handpicked collection of luxury wigs.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Shop All
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition-colors">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <p className="text-sm">
              Questions about our wigs? Reach out and we&apos;ll help you find
              the perfect match.
            </p>
          </div>
        </div>
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ashanti Naturals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
