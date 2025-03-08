// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* For Clients */}
          <div className="mb-8">
            <h3 className="font-Akatab-ExtraBold text-lg mb-4">For Clients</h3>
            <ul className="space-y-3">
              {['How to hire', 'Talent Marketplace', 'Project Catalog', 'Hire an agency', 
                'Enterprise', 'Business Plus', 'Any Hire', 'Contract-to-hire', 
                'Direct Contracts', 'Hire worldwide', 'Hire in the USA'].map((item) => (
                <li key={item} className="text-gray-300 hover:text-[#71A894] cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* For Talent */}
          <div className="mb-8">
            <h3 className="font-Akatab-ExtraBold text-lg mb-4">For Talent</h3>
            <ul className="space-y-3">
              {['How to find work', 'Direct Contracts', 'Find freelance jobs worldwide',
                'Find freelance jobs in the USA', 'Win work with ads', 
                'Exclusive resources with Freelancer Plus'].map((item) => (
                <li key={item} className="text-gray-300 hover:text-[#71A894] cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="mb-8">
            <h3 className="font-Akatab-ExtraBold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Help & support', 'Success stories', 'Upwork reviews', 'Resources',
                'Blog', 'Affiliate programme', 'Free Business Tools'].map((item) => (
                <li key={item} className="text-gray-300 hover:text-[#71A894] cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="mb-8">
            <h3 className="font-Akatab-ExtraBold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {['About us', 'Leadership', 'Investor relations', 'Careers', 
                'Our impact', 'Press', 'Contact us', 'Partners', 
                'Trust, safety & security', 'Modern slavery statement'].map((item) => (
                <li key={item} className="text-gray-300 hover:text-[#71A894] cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div className="mb-8">
            <h3 className="font-Akatab-ExtraBold text-lg mb-4">Follow us</h3>
            <div className="space-y-3">
              <p className="text-gray-300 hover:text-[#71A894] cursor-pointer text-sm">Mobile app</p>
              {/* Add social media icons here if needed */}
            </div>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 FreeLanceNeo® Global Inc.
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {['Terms of Service', 'Privacy Policy', 'CA Notice at Collection', 
                'Cookie Settings', 'Accessibility'].map((item) => (
                <span key={item} className="text-gray-300 hover:text-[#71A894] cursor-pointer text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;