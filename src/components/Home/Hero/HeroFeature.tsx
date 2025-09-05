import React from "react";

const featureData = [
  {
    icon: "🚚",
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    icon: "↩️",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    icon: "🔒",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    icon: "🎧",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-16">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-1 hover:shadow-2 transition-all duration-300" key={key}>
            <div className="flex-shrink-0 w-12 h-12 bg-blue/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">{item.icon}</span>
            </div>

            <div>
              <h3 className="font-semibold text-base text-dark mb-1">{item.title}</h3>
              <p className="text-sm text-dark-4">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
