"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { PlatformLink } from "@/components/ui/PlatformLink";
import { PLATFORM_LINKS } from "@/lib/constants";
import { formatLocalTime } from "@/lib/utils";

export function TopBar() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const syncTime = () => {
      setTime(formatLocalTime());
    };

    syncTime();

    const timer = setInterval(syncTime, 60_000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header data-topbar className="fixed inset-x-0 top-0 z-40 px-4 pt-4 opacity-0 sm:px-8 sm:pt-6">
      <div className="surface-panel mx-auto flex h-12 max-w-360 items-center justify-between border border-(--border) px-4">
        <p className="hidden text-(length:--text-ui-sm) tracking-[0.08em] text-muted sm:block">
          {time}
        </p>

        <div className="inline-flex items-center gap-2 text-(length:--text-ui-sm) tracking-[0.12em] text-foreground">
          <Radio size={14} className="text-accent" aria-hidden="true" />
          <span>LISTENING</span>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <PlatformLink href={PLATFORM_LINKS.spotify} label="Spotify" compact />
          <PlatformLink href={PLATFORM_LINKS.youtube} label="YouTube" compact />
        </div>

        <div className="sm:hidden">
          <PlatformLink href={PLATFORM_LINKS.spotify} label="Spotify" compact />
        </div>
      </div>
    </header>
  );
}
