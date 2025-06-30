import { model, models, Schema, Types } from "mongoose";
import Schedule from "./ScheduleSchema";
import { StadiumType } from "@/types";


const stadiumSchema = new Schema<StadiumType>({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  ownerName: {type: String, required: true},
  phone: { type: String, required: true },
  wilaya: { type: String, required: true },
  location: { type: String, required: true },
  maxPlayers: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  openingTime: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
      message: 'Opening time must be in HH:MM format'
    }
  },
  closingTime: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
      message: 'Closing time must be in HH:MM format'
    }
  },
}, {
  timestamps: true
});

// Static to generate weekly slots
stadiumSchema.statics.generateWeeklySlots = async function (stadiumId: Types.ObjectId): Promise<void> {
  const stadium = await this.findById(stadiumId);
  if (!stadium) throw new Error('Stadium not found');

  const openHour = parseInt(stadium.openingTime.split(':')[0]);
  const closeHour = parseInt(stadium.closingTime.split(':')[0]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  for (const day of days) {
    for (let hour = openHour; hour < closeHour; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;

      await Schedule.findOneAndUpdate(
        { stadiumId, dayOfWeek: day, timeSlot },
        { stadiumId, dayOfWeek: day, timeSlot },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }
  }
};

const Stadium = models.Stadium || model<StadiumType>("Stadium", stadiumSchema);
export default Stadium;
