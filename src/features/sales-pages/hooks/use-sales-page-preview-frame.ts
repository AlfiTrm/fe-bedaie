"use client";

import { useEffect, useId, useMemo, useState } from "react";

const HEIGHT_MESSAGE_TYPE = "sales-page-preview-height";
const DEFAULT_FRAME_HEIGHT = 1800;

function injectHeightScript(html: string, previewId: string) {
  const heightScript = `
<script>
(() => {
  const previewId = ${JSON.stringify(previewId)};
  const sendHeight = () => {
    const doc = document.documentElement;
    const body = document.body;
    const height = Math.max(
      doc ? doc.scrollHeight : 0,
      body ? body.scrollHeight : 0,
      doc ? doc.offsetHeight : 0,
      body ? body.offsetHeight : 0
    );

    window.parent.postMessage(
      {
        type: ${JSON.stringify(HEIGHT_MESSAGE_TYPE)},
        previewId,
        height,
      },
      "*"
    );
  };

  window.addEventListener("load", sendHeight);
  window.addEventListener("resize", sendHeight);

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.documentElement);
  }

  setTimeout(sendHeight, 80);
  setTimeout(sendHeight, 320);
})();
</script>`;

  if (html.includes("</body>")) {
    return html.replace("</body>", `${heightScript}</body>`);
  }

  return `${html}${heightScript}`;
}

export function useSalesPagePreviewFrame(html: string) {
  const previewId = useId();
  const [frameHeight, setFrameHeight] = useState(DEFAULT_FRAME_HEIGHT);

  const srcDoc = useMemo(
    () => injectHeightScript(html, previewId),
    [html, previewId],
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        !event.data ||
        typeof event.data !== "object" ||
        event.data.type !== HEIGHT_MESSAGE_TYPE ||
        event.data.previewId !== previewId
      ) {
        return;
      }

      const nextHeight = Number(event.data.height);

      if (Number.isFinite(nextHeight) && nextHeight > 0) {
        setFrameHeight(Math.max(nextHeight, DEFAULT_FRAME_HEIGHT));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [previewId]);

  return {
    frameHeight,
    srcDoc,
  };
}
