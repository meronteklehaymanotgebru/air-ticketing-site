import SettingsCrud from "@/components/admin/SettingsCrud";

export default function AgentCodesPage() {
  return <SettingsCrud title="Agent Codes" entity="agent-codes" hasCodeField={true} />;
}
