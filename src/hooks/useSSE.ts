import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useSSE = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("SSE connecting...");
    const token = sessionStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/dashboard/events`;

    const eventSource = new EventSource(`${url}?token=${token}`);

    eventSource.addEventListener("feedback:created", () => {
      queryClient.invalidateQueries();
    });

    eventSource.addEventListener("feedback:viewed", () => {
      queryClient.invalidateQueries();
    });

    eventSource.addEventListener("error", () => {
      // SSE auto-reconnects on error, no action needed
      console.warn("SSE connection lost, reconnecting...");
    });

    eventSource.addEventListener("connected", () => {
      console.log("SSE connected!");
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
};
