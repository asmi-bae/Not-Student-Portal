import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalTab from "@/components/tabs/personal-tab"
import GuardianTab from "@/components/tabs/guardian-tab"
import ContactTab from "@/components/tabs/contact-tab"
import EducationTab from "@/components/tabs/education-tab"
import PhotographTab from "@/components/tabs/photograph-tab"
import InsuranceTab from "@/components/tabs/insurance-tab"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-blue-500 rounded-none mb-6">
        <TabsTrigger
          value="personal"
          className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
        >
          PERSONAL
        </TabsTrigger>
        <TabsTrigger
          value="guardian"
          className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
        >
          GUARDIAN
        </TabsTrigger>
        <TabsTrigger
          value="contact"
          className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
        >
          CONTACT / ADDRESS
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
        >
          EDUCATION / TRAINING
        </TabsTrigger>
        <TabsTrigger
          value="photograph"
          className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
        >
          PHOTOGRAPH
        </TabsTrigger>
        <TabsTrigger
          value="insurance"
          className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
        >
          INSURANCE
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalTab />
      </TabsContent>

      <TabsContent value="guardian">
        <GuardianTab />
      </TabsContent>

      <TabsContent value="contact">
        <ContactTab />
      </TabsContent>

      <TabsContent value="education">
        <EducationTab />
      </TabsContent>

      <TabsContent value="photograph">
        <PhotographTab />
      </TabsContent>

      <TabsContent value="insurance">
        <InsuranceTab />
      </TabsContent>
    </Tabs>
  )
}
