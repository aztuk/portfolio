import { getTranslations } from "next-intl/server";
import {
  EnvelopeIcon,
  FileArrowDownIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";

import { Container } from "@/components/layout/Container";
import { siteContent } from "@/content/site";

export const SiteFooter = async () => {
  const t = await getTranslations("footer");
  const tSite = await getTranslations("site");
  const footerLinks = [
    {
      label: "GitHub",
      href: siteContent.links.github,
      icon: GithubLogoIcon,
      external: true,
    },
    {
      label: "LinkedIn",
      href: siteContent.links.linkedIn,
      icon: LinkedinLogoIcon,
      external: true,
    },
    {
      label: t("resume"),
      href: siteContent.links.resume,
      value: t("resume"),
      icon: FileArrowDownIcon,
      download: true,
    },
    {
      label: t("phone"),
      href: siteContent.phone.href,
      value: siteContent.phone.label,
      icon: PhoneIcon,
    },
    {
      label: t("email"),
      href: `mailto:${siteContent.email}`,
      value: siteContent.email,
      icon: EnvelopeIcon,
    },
  ];

  return (
    <footer className="relative z-10 py-12 lg:py-16">
      <Container className="px-5 lg:px-0">
        <div className="site-glass-surface flex flex-col gap-8 rounded-[34px] p-6 md:flex-row md:items-end md:justify-between md:p-8 lg:p-10">
          <div>
            <p className="type-body-lg-medium text-primary">{siteContent.name}</p>
            <p className="type-body-sm mt-2 text-smooth">
              {tSite("role")}
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-3 md:justify-end"
          >
            {footerLinks.map((link) => {
              const Icon = link.icon;
              const accessibleLabel = link.value
                ? `${link.label}: ${link.value}`
                : link.label;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={accessibleLabel}
                  title={accessibleLabel}
                  className={`inline-flex h-10 items-center justify-center rounded-full border border-line/15 bg-line/[0.05] text-muted transition-colors hover:border-primary/60 hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none ${
                    link.value ? "gap-2 px-3" : "w-10"
                  }`}
                  {...(link.download ? { download: true } : {})}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <Icon size={22} weight="regular" aria-hidden="true" />
                  {link.value ? (
                    <span className="type-body-sm">{link.value}</span>
                  ) : null}
                </a>
              );
            })}
          </nav>
        </div>
      </Container>
    </footer>
  );
};
