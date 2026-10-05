/**
 * Tracks a click event whenever a user clicks "Download PDF"
 * Uses sendBeacon or keepalive fetch so download continues uninterrupted.
 */
export function trackCvDownload(source: string = 'cv_page') {
  try {
    const payload = JSON.stringify({
      source,
      referrer: typeof document !== 'undefined' ? document.referrer || window.location.href : '',
    })

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' })
      const sent = navigator.sendBeacon('/api/analytics/cv-download', blob)
      if (sent) return
    }

    if (typeof fetch === 'function') {
      fetch('/api/analytics/cv-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch((err) => {
        console.warn('Analytics tracking ping failed:', err)
      })
    }
  } catch (err) {
    console.warn('Could not record CV download event:', err)
  }
}
