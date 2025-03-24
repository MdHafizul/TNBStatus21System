export default function SummaryCards() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-2">Total Accounts</h2>
          <p className="text-3xl font-bold">1245</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-2">Revisited</h2>
          <p className="text-3xl font-bold">876</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-2">Not Revisited</h2>
          <p className="text-3xl font-bold">369</p>
        </div>
      </div>
    );
  }