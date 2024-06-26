import { getDirByLang } from "@/lib/dir";
import { TFunction } from "i18next";

export default function template({
  t,
  lang,
  url,
}: {
  t: TFunction;
  lang: string;
  url: string;
}) {
  return `<html dir="${getDirByLang(lang)}" lang="${lang}">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Vazirmatn:wght@100..900&display=swap"
      rel="stylesheet"
    />
  </head>

  <body
    style="
      background-color: #ffffff;
      font-family: DM Sans, Vazirmatn, sans-serif;
    "
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        max-width: 360px;
        background-color: #030014;
        border: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 0 5px 10px rgba(20, 50, 70, 0.2);
        margin-top: 20px;
        margin: 0 auto;
        padding: 68px 0 130px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <img
              alt="Cypress logo"
              src="https://utfs.io/f/80a1d46e-4375-4005-a794-34629ac5a322-bxtjyg.png"
              style="
                display: block;
                outline: none;
                border: none;
                text-decoration: none;
                margin: 0 auto;
                width: 35px;
                height: 35px;
              "
            />
            <p
              style="
                font-size: 11px;
                line-height: 16px;
                margin: 16px 8px 8px 8px;
                color: #0a85ea;
                font-weight: 700;
                height: 16px;
                letter-spacing: 0;
                text-transform: uppercase;
                text-align: center;
                font-family: DM Sans, Vazirmatn, sans-serif;
              "
            >
              verify your identity
            </p>
            <h1
              style="
                color: #e2e8f0;
                font-size: 20px;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 0;
                margin-top: 0;
                text-align: center;
                padding: 0 20px;
                font-family: DM Sans, Vazirmatn, sans-serif;
              "
            >
            ${t("verify-request-email:click-button")}
            </h1>
            <div
              style="
                display: flex;
                width: 100%;
                margin: 20px 0;
                justify-content: center;
              "
            >
              <a href="${url}" target="_blank" style="text-decoration: none;margin: 0 auto;">
                <button
                  style="
                    border: 0;
                    outline: 0;
                    width: 10rem;
                    height: 3rem;
                    border-radius: 5px;
                    font-weight: 600;
                    font-size: 18px;
                    font-family: DM Sans, Vazirmatn, sans-serif;
                    color: #f9fafb;
                    background-color: #6e00ff;
                    cursor: pointer;
                  "
                >
                  Sign in
                </button>
              </a>
            </div>
            <div
              style="
                font-size: 15px;
                line-height: 23px;
                color: #94a3b8;
                text-align: center;
                padding: 0 20px;
                font-family: DM Sans, Vazirmatn, sans-serif;
              "
            >
              <span> ${t("verify-request-email:not-expected-first")} </span>
              <span style="margin: 0; color: #94a3b8; letter-spacing: 0">
                <span>
                  <a
                    href="mailto:login@plaid.com"
                    style="
                      color: #94a3b8;
                      text-decoration: underline;
                      font-family: DM Sans, Vazirmatn, sans-serif;
                    "
                    target="_blank"
                    >${process.env.EMAILSENDER_ADDRESS}</a
                  >
                </span>
                ${t("verify-request-email:not-expected-second")}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

    `;
}
