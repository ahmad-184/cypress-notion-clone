"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Context as LanguageContext } from "@/contexts/language-context";
import AppLogo from "@/components/AppLogo";
import { cn } from "@/lib/utils";
import { getDirByLang } from "@/lib/dir";
import { useParams } from "next/navigation";

type translateTypes = {
  error_title?: string;
  error_message?: string;
  reset_btn?: string;
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [translation, setTranslation] = useState<translateTypes>({});
  const { lang } = useContext(LanguageContext);
  const { locale = "en" } = useParams();

  const getTranslation = async () => {
    const file = (await import(`@/locales/${lang}/error.json`)).default;
    setTranslation(JSON.parse(JSON.stringify(file)));
  };

  useEffect(() => {
    getTranslation();
  }, [lang]);

  return (
    <html>
      <body>
        <main>
          <div className="w-full h-screen flex items-center justify-center relative px-4 sm:px-4 py-6 bg-gradient-to-bl from-background to-purple-500/20">
            <AppLogo
              className={cn("fixed top-4 md:top-6", {
                "left-4 md:left-12": getDirByLang(locale as string) === "ltr",
                "right-4 md:right-12": getDirByLang(locale as string) === "rtl",
              })}
            />
            <div className="flex flex-col gap-4 text-center justify-center items-center">
              <h1>
                <span className="text-3xl sm:text-5xl font-semibold text-slate-700 dark:text-slate-200">
                  {translation.error_title}🪲🤧
                </span>
                <span className="text-3xl sm:text-5xl font-semibold"></span>
              </h1>
              <p className="">{translation.error_message}</p>
              <Button
                variant="secondary"
                className="bg-slate-200 dark:bg-slate-700"
                onClick={reset}
              >
                {translation.reset_btn}
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
