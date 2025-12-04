// hooks/usePrintPdf.ts
'use client'

import { useCallback, useState } from 'react'

export const usePrintPdf = (contentRef: React.RefObject<HTMLElement>) => {
  const [isPrinting, setIsPrinting] = useState<boolean>(false)

  const handlePrint = useCallback(async () => {
    if (!contentRef?.current) {
      console.warn('usePrintPdf: contentRef.current is null')
      return
    }

    setIsPrinting(true)

    try {
      const contentHtml = contentRef.current.outerHTML

      // collect head tags (links + styles), skip scripts
      const headContent = Array.from(document.head.children)
        .filter((n) => n.tagName !== 'SCRIPT')
        .map((n) => n.outerHTML)
        .join('')

      const html = `<!doctype html>
        <html>
          <head>
            ${headContent}
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <style>
              @media print { body { -webkit-print-color-adjust: exact; color-adjust: exact; } }
              body { margin: 20px; font-family: system-ui, -apple-system, sans-serif; }
            </style>
          </head>
          <body>
            ${contentHtml}
          </body>
        </html>`.trim()

      // create invisible iframe
      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = '0'
      iframe.style.left = '-9999px'
      iframe.style.top = '0'
      iframe.setAttribute('aria-hidden', 'true')
      // using srcdoc is generally more reliable than document.write + onload
      iframe.srcdoc = html

      document.body.appendChild(iframe)

      // wait for iframe to load (with timeout)
      await new Promise<void>((resolve, reject) => {
        let settled = false
        const cleanup = () => {
          if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe)
        }

        const onSuccess = () => {
          if (settled) return
          settled = true
          resolve()
        }

        const onFailure = (err?: any) => {
          if (settled) return
          settled = true
          reject(err)
        }

        const timer = window.setTimeout(() => {
          onFailure(new Error('iframe load timeout'))
        }, 3000)

        iframe.onload = () => {
          window.clearTimeout(timer)
          onSuccess()
        }

        // fallback: sometimes iframe.onload doesn't fire for srcdoc — also try checking contentWindow
        setTimeout(() => {
          try {
            if (iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete') {
              window.clearTimeout(timer)
              onSuccess()
            }
          } catch (e) {
            // ignore cross-origin issues (shouldn't happen with srcdoc)
          }
        }, 500)
      }).catch((err) => {
        console.warn('usePrintPdf: iframe did not load reliably, attempting to print anyway', err)
      })

      // trigger print
      try {
        iframe.contentWindow?.focus()
        // calling print; browsers may show print dialog or PDF save options
        iframe.contentWindow?.print()
      } catch (e) {
        console.error('usePrintPdf: print() failed', e)
      } finally {
        // remove iframe after a short delay to allow print dialog to show
        setTimeout(() => {
          if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe)
        }, 700)
      }
    } catch (err) {
      console.error('usePrintPdf: unexpected error', err)
    } finally {
      setIsPrinting(false)
    }
  }, [contentRef])

  return { handlePrint, isPrinting }
}
