"use client";

import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { useAuth } from "@/context/AuthContext";

import { StadiumType } from "@/types";
import { toast } from "sonner";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";

const Stadium = () => {
  const { user } = useAuth();
  const [stadium, setStadium] = useState<StadiumType | null>(null);
  const [loading, setLoading] = useState(true);

  // Frontend call
  const fetchMyStadium = async (userId: string) => {
    try {
      const response = await fetch(`/api/my-stadium?userId=${userId}`);

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.error || "Failed to fetch stadium");
        return null;
      }

      const stadium = await response.json();
      return stadium;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong...");
    }
  };

  useEffect(() => {
    const loadStadium = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const stadiumData = await fetchMyStadium(user._id);
        setStadium(stadiumData);
      } catch (error) {
        console.error(error);
        toast.error("Failed To fetch stadium");
      } finally {
        setLoading(false);
      }
    };

    loadStadium();
  }, [user?._id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Spinner />
      </motion.div>
    );
  }

  if (!stadium) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-white text-center">
          <h2 className="text-xl font-bold mb-2">No Stadium Found</h2>
          <p className="mb-4">You haven't registered a stadium yet.</p>
          <Link href={"/dashboard/stadium/form"}>
            <button className="cta">Register Stadium</button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="p-6"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h1 className="text-2xl font-bold text-white mb-4">My Stadium</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {stadium.name}
            </h2>
            <p className="text-white/80">{stadium.location}</p>
          </div>

          <div className="flex gap-4">
            <Link href={`/dashboard/stadium/form`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Edit Stadium
              </button>
            </Link>

            <Link href={"/dashboard/requests"}>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                View Bookings
              </button>
            </Link>
          </div>
        </div>

        {/* Add more stadium details here */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium">Total Bookings</h3>
            <p className="text-2xl font-bold text-green-400">12</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium">This Month</h3>
            <p className="text-2xl font-bold text-blue-400">5</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium">Revenue</h3>
            <p className="text-2xl font-bold text-yellow-400">$450</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stadium;
