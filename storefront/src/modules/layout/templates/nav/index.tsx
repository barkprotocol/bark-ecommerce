import { Suspense } from "react";
import Image from 'next/image';
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";

// External image URLs
const logo = 'https://ucarecdn.com/47528138-2792-4ab7-9fe4-962d17686119/barkshoplogo.png';
const heroImage = 'https://ucarecdn.com/0e6bcb9f-f4a7-4745-b3ac-4ae2f8a034c6/barkswaphoodiewhite.png';

export default async function Nav() {
  const regions = await listRegions();

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Background"
          layout="fill" // Use layout="fill" to cover the container
          objectFit="cover" // Similar to object-cover in CSS
        />
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-0 inset-x-0 z-50 bg-white border-b border-ui-border-base shadow-md">
        <header className="h-16 mx-auto flex items-center justify-between">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            {/* Logo */}
            <div className="flex items-center h-full">
              <LocalizedClientLink href="/" className="flex items-center h-full">
                <Image
                  src={logo}
                  alt="BARK Store Logo"
                  height={32} // Adjust height as needed
                  width={32}  // Adjust width as needed
                />
              </LocalizedClientLink>
            </div>

            {/* Store Link */}
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                v1.0
              </LocalizedClientLink>
            </div>

            {/* Additional Links and Cart Button */}
            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                {process.env.FEATURE_SEARCH_ENABLED && (
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base"
                    href="/search"
                    scroll={false}
                    data-testid="nav-search-link"
                  >
                    Search
                  </LocalizedClientLink>
                )}
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
