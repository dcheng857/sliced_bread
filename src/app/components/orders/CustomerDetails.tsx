import { CustomerInfo } from "@/app/types/customer";

interface CustomerDetailsProps {
  customerInfo: CustomerInfo;
}

export function CustomerDetails({ customerInfo }: CustomerDetailsProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name</p>
          <p className="font-medium">{customerInfo.name}</p>
        </div>
        <div>
          <p className="text-gray-600">City</p>
          <p className="font-medium">{customerInfo.city}</p>
        </div>
        <div>
          <p className="text-gray-600">State/Province</p>
          <p className="font-medium">{customerInfo.state}</p>
        </div>
        <div>
          <p className="text-gray-600">Country</p>
          <p className="font-medium">{customerInfo.country}</p>
        </div>
      </div>
    </div>
  );
}
