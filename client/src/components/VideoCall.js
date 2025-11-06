import { useEffect, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";

export default function VideoCall({ roomUrl }) {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    const call = DailyIframe.createFrame(ref.current, { showLeaveButton: true });
    call.join({ url: roomUrl });
    return () => call.destroy();
  }, [roomUrl]);
  return <div style={{ width: "100%", height: "80vh" }} ref={ref}></div>;
}
