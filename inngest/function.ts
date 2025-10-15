import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetching the video
    await step.sleep("fetching-a-video", "5s");

    // Transcribe the Video
    await step.sleep("transcribing", "5s");

    // Sending Transcribe
    await step.sleep("send-to-ai", "5s");

    await step.run("create-workflow", () => {
        return prisma.workflow.create({
            data: {
                name: "workflow-from-inngest"
            }
        })
    })
  },
);