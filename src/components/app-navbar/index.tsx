"use client";

import { useReducer } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import {
  IconActivity,
  IconChevronDown,
  IconPackage,
  IconScale,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import AuthButton from "./auth-button";
import { ThemeSwitcher } from "./theme-switcher";

export default function AppNavbar() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
  const { status } = useSession();

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Orders",
      href: "/orders",
    },
  ];

  if (status === "authenticated") {
    menuItems.push({
      label: "Profile",
      href: "/profile",
    });
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <IconPackage />
          <p className="font-bold text-inherit">next-start</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) =>
          item.label === "Products" ? (
            <Dropdown key={`${item}-${index}`}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                    endContent={<IconChevronDown />}
                    radius="sm"
                    variant="light"
                  >
                    {item.label}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  description="ACME scales apps to meet user demand, automagically, based on load."
                  startContent={<IconScale />}
                >
                  <Link className="w-full" href={item.href} size="lg">
                    Autoscaling
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="usage_metrics"
                  description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                  startContent={<IconActivity />}
                >
                  Usage Metrics
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={`${item}-${index}`}>
              <Link className="w-full" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarItem>
          )
        )}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <AuthButton minimal={false} />
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarMenu>
        <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem>
        {menuItems.map((item, index) =>
          item.label === "Products" ? (
            <Dropdown key={`${item}-${index}`}>
              <NavbarMenuItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                    endContent={<IconChevronDown />}
                    radius="sm"
                    variant="light"
                  >
                    {item.label}
                  </Button>
                </DropdownTrigger>
              </NavbarMenuItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  description="ACME scales apps to meet user demand, automagically, based on load."
                  startContent={<IconScale />}
                >
                  <Link
                    className="w-full"
                    href={item.href}
                    size="lg"
                    onPress={() => setIsMenuOpen()}
                  >
                    Autoscaling
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="usage_metrics"
                  description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                  startContent={<IconActivity />}
                >
                  Usage Metrics
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen()}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          )
        )}

        <NavbarMenuItem>
          <AuthButton />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
