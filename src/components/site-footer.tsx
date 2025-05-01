import Link from 'next/link';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-baxus-footer py-8 mt-8 text-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-lg font-bold tracking-tight text-white">
                B A <span className="text-primary">X</span> A T H O N
              </span>
            </div>
            <p className="text-sm text-white/80 mb-4 max-w-xs">
              BAXUS and BlueGrass DAO&apos;s BAXATHON tackles spirits industry
              challenges with Solana.
            </p>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-white/70">
                &copy; 2025 SOONA.{' '}
                <Link
                  href="https://maikers.com?utm_source=maikers&utm_medium=footer&utm_campaign=superteamearn_bounty_baxathon"
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Powered by Maikers
                </Link>
              </p>
              <h3 className="font-medium text-sm mb-3 text-white/90">
                Follow BAXUS
              </h3>
              <div className="flex space-x-4">
                <Link
                  href="https://x.com/baxusco?utm_source=maikers&utm_medium=footer&utm_campaign=superteamearn_bounty_baxathon"
                  className="text-white/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7158 9.88256L8.66322 4H4L10.1277 13.0228L4 20.0911H5.38107L10.7294 13.9151L14.994 20.0911H19.6572L13.3169 10.7749H13.3174ZM11.3959 13.0918L10.7494 12.1505L5.81178 5.09406H7.86356L11.7846 10.6909L12.4311 11.6323L17.5798 19.0812H15.528L11.3959 13.0926V13.0918Z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/baxus.co/?utm_source=maikers&utm_medium=footer&utm_campaign=superteamearn_bounty_baxathon"
                  className="text-white/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/baxus.co/?utm_source=maikers&utm_medium=footer&utm_campaign=superteamearn_bounty_baxathon"
                  className="text-white/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/baxusco/?utm_source=maikers&utm_medium=footer&utm_campaign=superteamearn_bounty_baxathon"
                  className="text-white/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm mb-3 text-white/90">
                <Link
                  href="https://earn.superteam.fun/listing/baxathon/"
                  className="text-sm text-white/70 transition-colors hover:text-primary"
                >
                  The $20,000 BAXATHON
                </Link>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://earn.superteam.fun/listing/ai-agent-bob/"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    AI Agent BOB
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://earn.superteam.fun/listing/whiskey-goggles/"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    Whiskey Goggles
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://earn.superteam.fun/listing/the-honey-barrel/"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    The Honey Barrel
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3 text-white/90">
                Policies
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.baxus.co/privacy"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.baxus.co/termsconditions"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
