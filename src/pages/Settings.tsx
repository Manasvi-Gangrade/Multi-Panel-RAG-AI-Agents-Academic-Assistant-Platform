import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type Role = "student" | "teacher" | "researcher";

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your account information",
    icon: User,
    items: [
      { label: "Edit Profile", description: "Update your name and details" },
      { label: "Change Password", description: "Update your password" },
    ],
  },
  {
    title: "Notifications",
    description: "Configure how you receive updates",
    icon: Bell,
    items: [
      { label: "Email Notifications", description: "Receive email updates", toggle: true },
      { label: "Push Notifications", description: "Browser notifications", toggle: true },
    ],
  },
  {
    title: "Privacy & Security",
    description: "Protect your account",
    icon: Shield,
    items: [
      { label: "Two-Factor Auth", description: "Add extra security", toggle: true },
      { label: "Data Export", description: "Download your data" },
    ],
  },
  {
    title: "Appearance",
    description: "Customize how the app looks",
    icon: Palette,
    items: [
      { label: "Dark Mode", description: "Toggle dark theme", toggle: true, key: "darkMode" },
      { label: "Compact View", description: "Reduce spacing", toggle: true },
    ],
  },
  {
    title: "Language & Region",
    description: "Set your locale preferences",
    icon: Globe,
    items: [
      { label: "Language", description: "English (US)" },
      { label: "Timezone", description: "Auto-detect timezone" },
    ],
  },
  {
    title: "Accessibility",
    description: "Make the app easier to use",
    icon: Volume2,
    items: [
      { label: "Screen Reader", description: "Optimize for screen readers", toggle: true },
      { label: "Reduce Motion", description: "Minimize animations", toggle: true },
    ],
  },
];

export default function Settings() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const role = pathParts[1] as Role;
  const currentRole = ["student", "teacher", "researcher"].includes(role) ? role : "student";
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "Email Notifications": true,
    "Push Notifications": false,
    "Two-Factor Auth": false,
    "Dark Mode": false,
    "Compact View": false,
    "Screen Reader": false,
    "Reduce Motion": false,
  });

  const handleToggle = (label: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const roleColors = {
    student: "text-student",
    teacher: "text-teacher",
    researcher: "text-researcher",
  };

  return (
    <DashboardLayout role={currentRole}>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold">Settings ⚙️</h1>
          <p className="text-muted-foreground">
            Manage your preferences and account settings.
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-primary/10 ${roleColors[currentRole]}`}>
                        <SectionIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          {item.toggle ? (
                            <Switch
                              checked={toggleStates[item.label] || false}
                              onCheckedChange={() => handleToggle(item.label)}
                            />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        {itemIndex < section.items.length - 1 && (
                          <Separator className="my-1" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-between py-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Need Help?</p>
                  <p className="text-sm text-muted-foreground">
                    Contact support or browse our documentation
                  </p>
                </div>
              </div>
              <Button variant="outline">Get Support</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}