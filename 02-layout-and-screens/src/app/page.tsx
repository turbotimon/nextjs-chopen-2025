import Image from "next/image";

export default function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ToDo App</h1>
      <p className="text-gray-600 text-xl font-light tracking-wide">The best todo app in the world</p>
    </div>
  );
}
