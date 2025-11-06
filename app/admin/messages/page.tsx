export default function AdminMessagesPage() {
  const today = new Date()
  const dateStr = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">{dateStr}</div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>
      <div className="rounded-xl border bg-white p-6 text-gray-700">Messages will go here.</div>
    </div>
  )
}
