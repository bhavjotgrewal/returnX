'use client';

import { useState } from 'react';
import SettingsSection from '@/components/settings/SettingsSection';
import InputSetting from '@/components/settings/InputSetting';
import ToggleSetting from '@/components/settings/ToggleSetting';
import SelectSetting from '@/components/settings/SelectSetting';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function SettingsPage() {
  // API Connection Settings
  const [apiKey, setApiKey] = useState('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
  const [apiEndpoint, setApiEndpoint] = useState('https://api.returnx.com/v1');
  const [webhookUrl, setWebhookUrl] = useState('https://yourapp.com/webhook');
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('admin@example.com');
  
  // Data Settings
  const [dataRetention, setDataRetention] = useState('90');
  const [anonymizeData, setAnonymizeData] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('15');
  
  const dataRetentionOptions = [
    { value: '30', label: '30 days' },
    { value: '60', label: '60 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '180 days' },
    { value: '365', label: '1 year' },
  ];
  
  const refreshOptions = [
    { value: '5', label: '5 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
  ];
  
  return (
    <>
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 w-full max-w-7xl p-6 overflow-x-hidden mt-16 mb-24"
        style={{ width: '100%', minHeight: '80vh' }}
      >
        <h1 className="text-3xl font-semibold text-google-blue">Settings</h1>
        
        <SettingsSection title="API Connection">
          <InputSetting
            title="API Key"
            description="Your ReturnX API key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          
          <InputSetting
            title="API Endpoint"
            description="The endpoint URL for API requests"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          />
          
          <InputSetting
            title="Webhook URL"
            description="URL to receive webhook notifications"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
        </SettingsSection>
        
        <SettingsSection title="Notification Settings">
          <ToggleSetting
            title="Email Notifications"
            description="Receive email alerts for important events"
            enabled={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
          
          {emailNotifications && (
            <InputSetting
              title="Notification Email"
              description="Email address to receive notifications"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
            />
          )}
          
          <ToggleSetting
            title="Slack Notifications"
            description="Receive notifications in your Slack workspace"
            enabled={slackNotifications}
            onChange={() => setSlackNotifications(!slackNotifications)}
          />
          
          {slackNotifications && (
            <InputSetting
              title="Slack Webhook URL"
              description="Webhook URL for your Slack channel"
              value={slackWebhook}
              onChange={(e) => setSlackWebhook(e.target.value)}
            />
          )}
        </SettingsSection>
        
        <SettingsSection title="Data Settings">
          <SelectSetting
            title="Data Retention Period"
            description="How long to keep historical return data"
            value={dataRetention}
            options={dataRetentionOptions}
            onChange={(e) => setDataRetention(e.target.value)}
          />
          
          <ToggleSetting
            title="Anonymize Customer Data"
            description="Remove personally identifiable information from analytics"
            enabled={anonymizeData}
            onChange={() => setAnonymizeData(!anonymizeData)}
          />
          
          <SelectSetting
            title="Data Refresh Interval"
            description="How often to refresh dashboard data"
            value={refreshInterval}
            options={refreshOptions}
            onChange={(e) => setRefreshInterval(e.target.value)}
          />
        </SettingsSection>
        
        <div className="flex justify-end mt-8 space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="google-button px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </div>
      </motion.div>
    </>
  );
}