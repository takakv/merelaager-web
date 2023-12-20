import type { ReactNode } from "react";

interface BannerProps {
  children: ReactNode;
}

export const InfoBanner = ({ children }: BannerProps) => {
  return <div className="u-banner u-banner--info">{children}</div>;
};

export const WarningBanner = ({ children }: BannerProps) => {
  return <div className="u-banner u-banner--warning">{children}</div>;
};
