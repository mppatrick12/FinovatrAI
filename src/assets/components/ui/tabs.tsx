import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = ({ value, onValueChange, children }: any) => {
  const [current, setCurrent] = React.useState(value);
  React.useEffect(() => {
    if (onValueChange) onValueChange(current);
  }, [current]);
  return <div>{React.Children.map(children, child => React.cloneElement(child, { current, setCurrent }))}</div>;
};

const TabsList = ({ children }: any) => (
  <div className="flex gap-2 rounded-xl bg-gray-100 p-2">{children}</div>
);

const TabsTrigger = ({ value, current, setCurrent, children }: any) => (
  <button
    className={cn(
      "px-4 py-2 rounded-lg text-sm font-medium",
      value === current ? "bg-white text-blue-600 shadow" : "text-gray-500 hover:text-gray-700"
    )}
    onClick={() => setCurrent(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, current, children }: any) =>
  current === value ? <div>{children}</div> : null;

export { Tabs, TabsList, TabsTrigger, TabsContent };
