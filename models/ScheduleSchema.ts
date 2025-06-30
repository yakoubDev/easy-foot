import { IContactInfo, ISchedule } from "@/types";
import { model, models, Schema, Types } from "mongoose";

const scheduleSchema = new Schema<ISchedule>({
  stadiumId: {
    type: Schema.Types.ObjectId,
    ref: "Stadium",
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
      message: 'Time slot must be in HH:MM format'
    }
  },
  isAvailable: { type: Boolean, default: true },
  bookedBy: { type: String, default: null },
  bookedAt: { type: Date, default: null },
  contactInfo: {
    name: { type: String, default: null },
    phone: { type: String, default: null }
  },
  notes: { type: String, default: "" },
  status: {
    type: String,
    enum: ['available', 'booked', 'blocked'],
    default: 'available',
  },
}, {
  timestamps: true
});

// Index to prevent duplicate slots
scheduleSchema.index({ stadiumId: 1, dayOfWeek: 1, timeSlot: 1 }, { unique: true });

// Static method to get full weekly schedule
scheduleSchema.statics.getWeeklySchedule = async function (stadiumId: Types.ObjectId) {
  const slots = await this.find({ stadiumId }).sort({ dayOfWeek: 1, timeSlot: 1 });
  const grouped: Record<string, ISchedule[]> = {};

  for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) {
    grouped[day] = slots.filter((slot: any) => slot.dayOfWeek === day);
  }

  return grouped;
};

// Book a slot
scheduleSchema.statics.bookSlot = async function (
  stadiumId: Types.ObjectId,
  dayOfWeek: ISchedule["dayOfWeek"],
  timeSlot: string,
  bookingInfo: {
    bookedBy: string;
    contactInfo: IContactInfo;
    notes?: string;
  }
) {
  const slot = await this.findOneAndUpdate(
    {
      stadiumId,
      dayOfWeek,
      timeSlot,
      status: 'available',
      isAvailable: true,
    },
    {
      status: 'booked',
      isAvailable: false,
      bookedBy: bookingInfo.bookedBy,
      bookedAt: new Date(),
      contactInfo: bookingInfo.contactInfo,
      notes: bookingInfo.notes || ''
    },
    { new: true }
  );

  if (!slot) {
    throw new Error('Slot already booked or unavailable');
  }

  return slot;
};

// Optional: reset bookings weekly
scheduleSchema.statics.resetAllBookings = async function () {
  await this.updateMany(
    { status: 'booked' },
    {
      status: 'available',
      isAvailable: true,
      bookedBy: null,
      bookedAt: null,
      contactInfo: { name: null, phone: null },
      notes: ""
    }
  );
};

const Schedule = models.Schedule || model<ISchedule>("Schedule", scheduleSchema);
export default Schedule;
