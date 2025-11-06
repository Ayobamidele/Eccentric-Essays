export default function AdminSettingsPage() {
  const today = new Date()
  const dateStr = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">{dateStr}</div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="rounded-xl border bg-white">
        <div className="px-6 py-4 border-b font-semibold text-gray-900">Settings</div>
        <div className="p-6 text-gray-700">Settings form will go here.</div>
      </div>
    </div>
  )
}
