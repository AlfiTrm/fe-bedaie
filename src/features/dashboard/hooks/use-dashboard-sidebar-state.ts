"use client";

import { useSyncExternalStore } from "react";

import {
  DASHBOARD_SIDEBAR_STORAGE_KEY,
  isDashboardSidebarCollapsedValue,
} from "@/src/features/dashboard/services/dashboard-sidebar-layout";

const DASHBOARD_SIDEBAR_EVENT = "dashboard-sidebar-change";

function getSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return isDashboardSidebarCollapsedValue(
    window.localStorage.getItem(DASHBOARD_SIDEBAR_STORAGE_KEY),
  );
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => {
    callback();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(DASHBOARD_SIDEBAR_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(DASHBOARD_SIDEBAR_EVENT, handleChange);
  };
}

export function useDashboardSidebarState() {
  const isCollapsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = () => {
    const nextValue = !isCollapsed;

    window.localStorage.setItem(
      DASHBOARD_SIDEBAR_STORAGE_KEY,
      String(nextValue),
    );
    window.dispatchEvent(new Event(DASHBOARD_SIDEBAR_EVENT));
  };

  return {
    isCollapsed,
    toggle,
  };
}
