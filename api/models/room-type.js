
import mongoose from 'mongoose';

const RoomTypeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
        },
    },
    {
        timestamps: true,
    }
);

export const RoomTypeModel = mongoose.model('room-type', RoomTypeSchema);
