import { Clock } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="w-20 h-20 bg-brand-900/10 rounded-full flex items-center justify-center text-brand-900 mb-6">
        <Clock className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-brand-900 mb-3">{title}</h1>
      <p className="text-gray-500 max-w-md mx-auto text-lg">
        This module is currently under development and will be available soon!
      </p>
    </div>
  );
}
