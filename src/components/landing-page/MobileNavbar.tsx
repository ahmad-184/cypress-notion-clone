import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/Sheet";
import AppLogo from "../AppLogo";
import { useTranslation } from "react-i18next";
import { getDirByLang } from "@/lib/dir";
import LanguageChanger from "../LanguageChanger";
import ThemeToggle from "../ThemeToggle";

type MobileNavbarProps = {
  openMobileNav: boolean;
  handleOpenMobileNav: () => void;
  navLinks: { text: string; id: string }[];
};

const MobileNavbar = ({
  openMobileNav,
  handleOpenMobileNav,
  navLinks,
}: MobileNavbarProps) => {
  const { t, i18n } = useTranslation();

  const dir = getDirByLang(i18n.language);

  return (
    <div className="block md:hidden">
      <Sheet open={openMobileNav} onOpenChange={handleOpenMobileNav}>
        <SheetTrigger asChild>
          <Menu size={21} className="dark:text-slate-200" />
        </SheetTrigger>
        <SheetContent
          className="max-w-[350px]"
          side={dir === "rtl" ? "right" : "left"}
        >
          <SheetHeader>
            <AppLogo t={t} className="top-4 absolute ltr:left-6 rtl:right-6" />
          </SheetHeader>
          <div className="mt-14 flex flex-col gap-3">
            {navLinks.map((link, i) => (
              <SheetClose asChild>
                <p
                  key={i}
                  onClick={() => {
                    const el = document.getElementById(link.id);
                    if (el?.scrollIntoView) el.scrollIntoView();
                  }}
                  className="text-sm dark:text-slate-200 cursor-pointer w-full transition-all duration-150 dark:hover:text-purple-400 hover:text-primary
                    p-2 px-3 rounded-lg hover:bg-purple-300/15
                    dark:bg-slate-300/10 bg-slate-300/15
                "
                >
                  {link.text}
                </p>
              </SheetClose>
            ))}
          </div>
          <SheetFooter className="mt-6">
            <div className="flex items-center gap-3 w-full">
              <ThemeToggle menu_align={dir === "rtl" ? "end" : "start"} />
              <LanguageChanger menu_align={dir === "rtl" ? "end" : "start"} />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
