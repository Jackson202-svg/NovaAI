import { randomUUID } from 'node:crypto';
import { env } from '../config/env';

export interface AnalyticsEvent {
  id: string;
  event: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

const analyticsEvents: AnalyticsEvent[] = [];

export const trackAnalyticsEvent = (event: string, payload: Record<string, unknown> = {}): AnalyticsEvent => {
  const record: AnalyticsEvent = {
    id: randomUUID(),
    event,
    payload,
    createdAt: new Date().toISOString(),
  };

  analyticsEvents.push(record);
  return record;
};

export const getAnalyticsEvents = (): AnalyticsEvent[] => analyticsEvents;

export const getEnvironmentSummary = () => ({
  nodeEnv: env.nodeEnv,
  service: env.appName,
  hasOpenAiKey: Boolean(env.openAiApiKey),
});
