import mongoose from 'mongoose';

const RoomSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
		},
		roomType: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'roomType must be a valid ObjectId'],
		},
		price: {
			type: Number,
			required: [true, 'price is required'],
		},
	},
	{
		timestamps: true,
	}
);

export const RoomModel = mongoose.model('rooms', RoomSchema);
