// import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {generateText} from "ai";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
})

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async({step}) => {

    await step.sleep("pretend", "5s");

    const {steps} = await step.ai.wrap("gemini-generaete-text", 
        generateText, {
            model: google("gemini-2.5-flash"),
            system: "You are a helpful assistant that helps create workflows based on user requirements",
            prompt: "Create a workflow based on the following user requirements: \n\n{{event.body.requirements}}",
            experimental_telemetry: {
                isEnabled: true,
                recordInputs: true,
                recordOutputs: true
            }
        }
    );

    return steps;
  }
);