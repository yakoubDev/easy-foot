"use client";
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  Phone,
  Building,
  Image,
  User,
} from "lucide-react";
import { StadiumType } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const StadiumForm = () => {
  const { user } = useAuth();
  const ownerId = user?._id;

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState<StadiumType>({
    name: "",
    owner: "",
    ownerName: "",
    phone: "",
    wilaya: "",
    location: "",
    maxPlayers: 0,
    price: 0,
    image: "",
    openingTime: "",
    closingTime: "",
  });

  const getStadium = async () => {
    try {
      const res = await fetch(`/api/my-stadium?userId=${ownerId}`);
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || "Failed to fetch stadium");
        return;
      }

      setIsEditMode(true);
      setFormData((prev) => ({
        ...prev,
        ...result,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  useEffect(() => {
    if (ownerId) {
      getStadium();
    }
  }, []);

  const [errors, setErrors] = useState<Partial<StadiumType>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Algiers",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "MSila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<StadiumType> = {};

    if (!formData.name.trim()) newErrors.name = "Stadium name is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^(0)(5|6|7)[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Algerian phone number";
    }
    if (!formData.wilaya) newErrors.wilaya = "Wilaya is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.maxPlayers <= 0)
      // @ts-ignore
      newErrors.maxPlayers = "Max players must be greater than 0";
    // @ts-ignore
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.openingTime)
      newErrors.openingTime = "Opening time is required";
    if (!formData.closingTime)
      newErrors.closingTime = "Closing time is required";
    else if (formData.openingTime >= formData.closingTime) {
      newErrors.closingTime = "Closing time must be after opening time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        owner: ownerId as string,
      };

      const res = await fetch(`/api/my-stadium?userId=${ownerId}`, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(`${isEditMode ? "Updated" : "Created"} Stadium`);
      window.location.href = "/dashboard/stadium";

      // Optional: Reset form
      setFormData({
        _id: "",
        name: "",
        owner: "",
        ownerName: "",
        phone: "",
        wilaya: "",
        location: "",
        maxPlayers: 0,
        price: 0,
        image: "",
        openingTime: "",
        closingTime: "",
      });
    } catch (error) {
      alert("Error registering stadium. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxPlayers" || name === "price" ? Number(value) : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof StadiumType]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen" style={{}}>
      <div className="px-2 py-8 md:px-6 xl:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-white leading-tight mb-4">
              {isEditMode ? "Edit" : "Register"} Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Stadium
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Join our platform and start accepting bookings for your football
              stadium
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
              {/* Basic Information */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Building className="text-green-400" size={28} />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stadium Name */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Stadium Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                      placeholder="Enter stadium name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.ownerName}
                      </p>
                    )}
                  </div>

                  {/* Owner */}
                  <div>
                    <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                      <User size={16} className="text-green-400" />
                      Owner Name
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                      placeholder="Enter owner name"
                    />
                    {errors.owner && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.ownerName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                      <Phone size={16} className="text-green-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                      placeholder="0555123456"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Wilaya */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Wilaya
                    </label>
                    <select
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    >
                      <option value="">Select Wilaya</option>
                      {wilayas.map((wilaya) => (
                        <option
                          key={wilaya}
                          value={wilaya}
                          className="bg-gray-800"
                        >
                          {wilaya}
                        </option>
                      ))}
                    </select>
                    {errors.wilaya && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.wilaya}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="mt-6">
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-green-400" />
                    Detailed Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="Enter detailed address"
                  />
                  {errors.location && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div className="mt-6">
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <Image size={16} className="text-green-400" />
                    Stadium Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="https://example.com/stadium-image.jpg"
                  />
                  {errors.image && (
                    <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                  )}
                </div>
              </div>

              {/* Stadium Details */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="text-green-400" size={28} />
                  Stadium Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Max Players */}
                  <div>
                    <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                      <Users size={16} className="text-green-400" />
                      Maximum Players
                    </label>
                    <input
                      type="number"
                      name="maxPlayers"
                      value={formData.maxPlayers || ""}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                      placeholder="22"
                    />
                    {errors.maxPlayers && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.maxPlayers}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                      <DollarSign size={16} className="text-green-400" />
                      Price per Hour (DZD)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                      placeholder="2000"
                    />
                    {errors.price && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="text-green-400" size={28} />
                  Operating Hours
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Opening Time */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    />
                    {errors.openingTime && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.openingTime}
                      </p>
                    )}
                  </div>

                  {/* Closing Time */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    />
                    {errors.closingTime && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.closingTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-4 rounded-lg font-semibold text-lg tracking-[1px] transition-all duration-200 hover:scale-[101%] hover:opacity-95 transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    <h1>
                      {isEditMode ? "Update Your" : "Register Your"}{" "}
                      <span>Stadium</span>
                    </h1>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StadiumForm;
