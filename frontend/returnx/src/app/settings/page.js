'use client';

import { useState } from 'react';
import SettingsSection from '@/components/settings/SettingsSection';
import ToggleSetting from '@/components/settings/ToggleSetting';
import InputSetting from '@/components/settings/InputSetting';
import SelectSetting from '@/components/settings/SelectSetting';
import ApiKeyDisplay from '@/components/settings/ApiKeyDisplay';

export default function SettingsPage() {
  // API Connection Settings
  const [apiUrl, setApiUrl] = useState('https://api.returnx.example.com/v1');
  const [apiKey, setApiKey] = useState('sk_test_51Nh...');
  const [webhookUrl, setWebhookUrl] = useState('https://yourcompany.com/api/webhooks/returnx');
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [returnAlerts, setReturnAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(true);
  
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
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-indigo-500">Settings</h1>
      
      <SettingsSection title="API Connection">
        <InputSetting
          title="API URL"
          description="The base URL for the ReturnX API"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
        
        <ApiKeyDisplay apiKey={apiKey} />
        
        <InputSetting
          title="Webhook URL"
          description="Your endpoint where ReturnX will send events"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
        />
      </SettingsSection>
      
      <SettingsSection title="Notifications">
        <ToggleSetting
          title="Email Notifications"
          description="Receive important notifications via email"
          enabled={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />
        
        <ToggleSetting
          title="Slack Notifications"
          description="Receive important notifications in your Slack workspace"
          enabled={slackNotifications}
          onChange={() => setSlackNotifications(!slackNotifications)}
        />
        
        <ToggleSetting
          title="Return Rate Alerts"
          description="Get notified when return rates exceed thresholds"
          enabled={returnAlerts}
          onChange={() => setReturnAlerts(!returnAlerts)}
        />
        
        <ToggleSetting
          title="Daily Summary Reports"
          description="Receive daily summary reports of returns activity"
          enabled={dailyReports}
          onChange={() => setDailyReports(!dailyReports)}
        />
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
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}