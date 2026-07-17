import { features } from "./home-data";

export default function FeaturesBar() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center">
                <Icon size={16} className="text-[#970747]" />
              </div>

              <div>
                <p className="text-xs font-bold">{title}</p>

                <p className="text-[10px] text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
