"use client";

import toast, { type ToastOptions } from "react-hot-toast";

const MAX_VISIBLE_NOTIFICATIONS = 3;
const NOTIFICATION_DURATION_MS = 5_000;
const NOTIFICATION_FADE_DURATION_MS = 500;

let notificationCounter = 0;
let activeNotificationIds: string[] = [];
const cleanupTimers = new Map<string, ReturnType<typeof setTimeout>>();

function removeActiveNotification(id: string) {
  activeNotificationIds = activeNotificationIds.filter((activeId) => activeId !== id);
  const timer = cleanupTimers.get(id);

  if (timer) {
    clearTimeout(timer);
    cleanupTimers.delete(id);
  }
}

function trackNotification(id: string) {
  if (activeNotificationIds.includes(id)) {
    removeActiveNotification(id);
  } else {
    while (activeNotificationIds.length >= MAX_VISIBLE_NOTIFICATIONS) {
      const oldestId = activeNotificationIds.shift();

      if (oldestId) {
        toast.remove(oldestId);
        removeActiveNotification(oldestId);
      }
    }
  }

  activeNotificationIds.push(id);

  cleanupTimers.set(
    id,
    setTimeout(
      () => removeActiveNotification(id),
      NOTIFICATION_DURATION_MS + NOTIFICATION_FADE_DURATION_MS
    )
  );
}

function createOptions(id: string, options?: ToastOptions): ToastOptions {
  return {
    ...options,
    id,
    duration: NOTIFICATION_DURATION_MS,
    removeDelay: NOTIFICATION_FADE_DURATION_MS,
  };
}

function nextNotificationId() {
  notificationCounter += 1;
  return `notification-${notificationCounter}`;
}

export function notify(message: string, options?: ToastOptions) {
  const id = options?.id || nextNotificationId();
  trackNotification(id);
  return toast(message, createOptions(id, options));
}

export function notifySuccess(message: string, options?: ToastOptions) {
  const id = options?.id || nextNotificationId();
  trackNotification(id);
  return toast.success(message, createOptions(id, options));
}

export function notifyError(message: string, options?: ToastOptions) {
  const id = options?.id || nextNotificationId();
  trackNotification(id);
  return toast.error(message, createOptions(id, options));
}
