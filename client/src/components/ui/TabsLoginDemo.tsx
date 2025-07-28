import { Tabs } from "./vercel-tabs";
import React, { useState } from "react";

const tabs = [
  { id: "user", label: "User" },
  { id: "hr", label: "HR" },
  { id: "doctor", label: "Doctor" },
  { id: "admin", label: "Admin" },
];

export function TabsLoginDemo({ onTabChange }: { onTabChange?: (tabId: string) => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="w-full max-w-xl flex justify-center">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
            onTabChange?.(tabId);
          }}
          className="w-full flex justify-center text-center gap-8 text-2xl font-bold"
        />
      </div>
    </div>
  );
}
