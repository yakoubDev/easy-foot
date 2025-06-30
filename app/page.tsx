import React from "react";
import { FaStar, FaCrown, FaBolt } from "react-icons/fa";
import * as motion from 'framer-motion/client';
import Link from "next/link";

const Home = () => {
  const plans = [
    {
      title: "Basic",
      price: "$29",
      duration: "Month",
      icon: FaStar,
      titleColor: "text-blue-400",
      features: [
        "List up to 3 stadiums",
        "Basic booking management",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      title: "Premium",
      price: "$299",
      duration: "Year",
      save: "15%",
      icon: FaBolt,
      titleColor: "text-purple-400",
      features: [
        "List up to 10 stadiums",
        "Advanced booking tools",
        "Priority support",
        "Analytics dashboard",
      ],
    },
    {
      title: "Gold",
      price: "$999",
      duration: "Forever",
      save: "65%",
      icon: FaCrown,
      titleColor: "text-yellow-400",
      features: [
        "Unlimited stadiums",
        "All premium features",
        "24/7 support",
        "Custom integrations",
      ],
    },
  ];

  return (
    <motion.div className="flex flex-col gap-6 md:gap-8 items-center justify-center min-h-screen px-4 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}>
      {/* Hero Section */}
      <div className="text-center space-y-4 md:space-y-6">
        <h1 className="text-hero text-gradient leading-40">Easy Foot</h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[-0.01em] text-white opacity-90">
          Best Stadium Manager
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-lg mx-auto">
          Discover and book street football stadiums near you
        </p>
      </div>

      {/* CTA Button */}
      <Link href={"/stadiums"} >
        <button className="cta">
          Find Match
        </button>
      </Link>

      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 w-full text-center">
        <div className="bg-white/5 rounded-lg px-4 md:px-6 py-2 md:py-4 backdrop-blur-sm border border-white/10 text-xl md:text-4xl ">
          <h3 className=" text-green-400">24+</h3>
          <p className="text-sm md:text-base text-white/70">Stadiums</p>
        </div>
        <div className="bg-white/5 rounded-lg px-4 md:px-6 py-2 md:py-4 backdrop-blur-sm border border-white/10 text-xl md:text-4xl ">
          <h3 className=" text-green-400">156+</h3>
          <p className="text-sm md:text-base text-white/70">Matches</p>
        </div>
        <div className="bg-white/5 rounded-lg px-4 md:px-6 py-2 md:py-4 backdrop-blur-sm border border-white/10 text-xl md:text-4xl ">
          <h3 className=" text-green-400">89%</h3>
          <p className="text-sm md:text-base text-white/70">Booked</p>
        </div>
      </div>

      {/* Subscription Plans */}
      <h1 className="h2 text-center w-full mt-12 text-gradient">
        Stadium Plans
      </h1>
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-green-400/50 hover:-translate-y-3 transition-all duration-300 relative group  "
            >
              {plan.save && (
                <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save {plan.save}
                </div>
              )}

              <div className="text-left md:text-center mb-4">
                <div className="flex items-center justify-start md:justify-center gap-2 mb-2">
                  <IconComponent
                    className={`w-6 h-6 ${plan.titleColor} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3 className={`text-2xl font-bold ${plan.titleColor}`}>
                    {plan.title}
                  </h3>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {plan.price}{" "}
                  <span className="text-white/60 text-sm">
                    / {plan.duration}
                  </span>
                </div>
                <p className="text-sm text-white/60"></p>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-2 rounded-lg font-semibold text-lg tracking-[1px] transition-colors duration-200 hover:scale-105 transform cursor-pointer w-full mt-4">
                Choose Plan
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Home;
